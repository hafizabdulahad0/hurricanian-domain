
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface AuctionRequest {
  action: 'list' | 'create' | 'bid' | 'end';
  domainName?: string;
  startingBid?: number;
  reservePrice?: number;
  durationDays?: number;
  bidAmount?: number;
  auctionId?: string;
  description?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client (admin)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }
    
    // Extract and verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }
    
    // Extract auction request from the request body
    const auctionRequest: AuctionRequest = await req.json();
    
    let response;
    
    switch(auctionRequest.action) {
      case 'list': 
        // List all active auctions - without using join relationships
        const { data: auctions, error: auctionsError } = await supabaseAdmin
          .from('domain_auctions')
          .select('*')
          .eq('status', 'active')
          .order('end_date', { ascending: true });
          
        if (auctionsError) {
          throw auctionsError;
        }
        
        // Now fetch seller usernames separately
        const sellerIds = auctions.map(auction => auction.seller_id);
        const bidderIds = auctions.filter(a => a.current_bidder).map(a => a.current_bidder);
        const uniqueUserIds = [...new Set([...sellerIds, ...bidderIds.filter(id => id)])];
        
        let usernameMap = {};
        if (uniqueUserIds.length > 0) {
          const { data: profiles, error: profilesError } = await supabaseAdmin
            .from('profiles')
            .select('id, username')
            .in('id', uniqueUserIds);
            
          if (!profilesError && profiles) {
            usernameMap = profiles.reduce((acc, profile) => {
              acc[profile.id] = profile.username;
              return acc;
            }, {});
          }
        }
        
        // Add seller and bidder username to each auction
        const auctionsWithUsernames = auctions.map(auction => ({
          ...auction,
          seller: { username: usernameMap[auction.seller_id] || 'Anonymous' },
          current_bidder_username: auction.current_bidder ? usernameMap[auction.current_bidder] || 'Anonymous' : null
        }));
        
        response = { success: true, auctions: auctionsWithUsernames };
        break;
        
      case 'create':
        if (!auctionRequest.domainName || !auctionRequest.startingBid || !auctionRequest.durationDays) {
          return new Response(
            JSON.stringify({ error: 'Missing required auction parameters' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Calculate end date
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + auctionRequest.durationDays);
        
        // Create a new auction
        const { data: newAuction, error: createError } = await supabaseAdmin
          .from('domain_auctions')
          .insert([
            {
              domain_name: auctionRequest.domainName,
              starting_bid: auctionRequest.startingBid,
              current_bid: auctionRequest.startingBid,
              reserve_price: auctionRequest.reservePrice || null,
              seller_id: user.id,
              description: auctionRequest.description || null,
              end_date: endDate.toISOString(),
              status: 'active'
            }
          ])
          .select()
          .single();
          
        if (createError) {
          throw createError;
        }
        
        response = { success: true, auction: newAuction };
        break;
        
      case 'bid':
        if (!auctionRequest.auctionId || !auctionRequest.bidAmount) {
          return new Response(
            JSON.stringify({ error: 'Missing required bid parameters' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Get the auction details
        const { data: auction, error: auctionError } = await supabaseAdmin
          .from('domain_auctions')
          .select('*')
          .eq('id', auctionRequest.auctionId)
          .single();
          
        if (auctionError) {
          throw auctionError;
        }
        
        // Check if auction is still active
        if (auction.status !== 'active') {
          return new Response(
            JSON.stringify({ error: 'Auction is not active' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Check if bid amount is higher than current bid
        if (auctionRequest.bidAmount <= auction.current_bid) {
          return new Response(
            JSON.stringify({ error: 'Bid amount must be higher than current bid' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Check if bidder is not the seller
        if (user.id === auction.seller_id) {
          return new Response(
            JSON.stringify({ error: 'Sellers cannot bid on their own auctions' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Update the auction with new bid
        const { data: updatedAuction, error: updateError } = await supabaseAdmin
          .from('domain_auctions')
          .update({
            current_bid: auctionRequest.bidAmount,
            current_bidder: user.id,
            bids_count: auction.bids_count + 1
          })
          .eq('id', auctionRequest.auctionId)
          .select()
          .single();
          
        if (updateError) {
          throw updateError;
        }
        
        // Add bid to the bids table
        const { error: bidError } = await supabaseAdmin
          .from('auction_bids')
          .insert([
            {
              auction_id: auctionRequest.auctionId,
              bidder_id: user.id,
              bid_amount: auctionRequest.bidAmount
            }
          ]);
          
        if (bidError) {
          throw bidError;
        }
        
        response = { success: true, auction: updatedAuction };
        break;
        
      case 'end':
        if (!auctionRequest.auctionId) {
          return new Response(
            JSON.stringify({ error: 'Missing auction ID' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
          );
        }
        
        // Get the auction details
        const { data: auctionToEnd, error: getError } = await supabaseAdmin
          .from('domain_auctions')
          .select('*')
          .eq('id', auctionRequest.auctionId)
          .single();
          
        if (getError) {
          throw getError;
        }
        
        // Check if the user is the seller
        if (user.id !== auctionToEnd.seller_id) {
          return new Response(
            JSON.stringify({ error: 'Only the seller can end the auction' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
          );
        }
        
        // Update the auction status
        const { data: endedAuction, error: endError } = await supabaseAdmin
          .from('domain_auctions')
          .update({
            status: 'ended',
            winner_id: auctionToEnd.current_bidder,
            final_bid: auctionToEnd.current_bid
          })
          .eq('id', auctionRequest.auctionId)
          .select()
          .single();
          
        if (endError) {
          throw endError;
        }
        
        response = { success: true, auction: endedAuction };
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
    
    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing auction request:', error.message);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error: ' + error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
})
