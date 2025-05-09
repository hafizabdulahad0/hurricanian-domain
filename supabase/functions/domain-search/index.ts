
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';

// Domain search edge function
Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { domain, extensions } = await req.json();
    
    // Check if domain and extensions are provided
    if (!domain) {
      return new Response(
        JSON.stringify({ error: 'Domain name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!extensions || !Array.isArray(extensions) || extensions.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one extension is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing domain search for: ${domain} with extensions: ${extensions.join(', ')}`);

    // Generate domain availability results
    const results = extensions.map((ext: string) => {
      // Deterministic availability based on domain name and extension
      // This ensures consistent results for the same domain+extension combination
      const combined = domain + ext;
      const hash = Array.from(combined).reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const available = hash % 10 > 3; // 60% chance of availability
      
      // Price determination based on extension and domain length
      let basePrice = 9.99;
      if (ext === '.io') basePrice = 39.99;
      else if (ext === '.org') basePrice = 12.99;
      else if (ext === '.net') basePrice = 11.99;
      
      // Adjust price based on domain length (shorter domains cost more)
      const lengthFactor = Math.max(0.8, Math.min(1.5, 10 / domain.length));
      const price = Math.round((basePrice * lengthFactor) * 100) / 100;
      
      return {
        domain: domain + ext,
        available,
        price: available ? price : null
      };
    });
    
    // For authenticated users, store search history in database
    try {
      // Get Supabase admin client from environment
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      const authHeader = req.headers.get('authorization');
      
      if (supabaseUrl && supabaseKey && authHeader) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Extract JWT token
        const token = authHeader.replace('Bearer ', '');
        
        // Verify the JWT and get user ID
        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        
        if (!userError && userData?.user) {
          // Store search history for each extension
          for (const ext of extensions) {
            await supabase.from('domain_searches').insert({
              domain_name: domain,
              extension: ext,
              available: results.find(r => r.domain === domain + ext)?.available,
              user_id: userData.user.id
            });
          }
        }
      }
    } catch (dbError) {
      // Don't fail the request if history logging fails
      console.error('Error storing domain search history:', dbError);
    }
    
    // Return results
    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in domain-search function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
