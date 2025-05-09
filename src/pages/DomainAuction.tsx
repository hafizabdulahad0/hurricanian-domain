
import { useState, useEffect } from 'react';
import ServicePage from '@/components/ServicePage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Gavel, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Auction {
  id: string;
  domain_name: string;
  starting_bid: number;
  current_bid: number;
  bids_count: number;
  seller_id: string;
  end_date: string;
  status: string;
  seller?: {
    username: string;
  };
  description?: string;
}

const DomainAuction = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [bidAmount, setBidAmount] = useState<Record<string, string>>({});
  const [submittingBid, setSubmittingBid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAuctions();
  }, [activeTab]);
  
  const fetchAuctions = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    
    try {
      // Fetch auctions from the Supabase edge function
      const { data, error } = await supabase.functions.invoke('domain-auction', {
        body: { action: 'list' }
      });
      
      if (error) {
        console.error('Error fetching auctions:', error);
        setError('Failed to fetch auctions. Please try again later.');
        throw error;
      }
      
      if (data && data.auctions && data.auctions.length > 0) {
        // Filter auctions based on active tab
        let filteredAuctions = data.auctions;
        
        if (activeTab === 'ending') {
          const now = new Date();
          const twoDaysFromNow = new Date();
          twoDaysFromNow.setDate(now.getDate() + 2);
          
          filteredAuctions = data.auctions.filter((auction: Auction) => 
            new Date(auction.end_date) <= twoDaysFromNow && new Date(auction.end_date) > now
          );
        } else if (activeTab === 'premium') {
          filteredAuctions = data.auctions.filter((auction: Auction) => auction.current_bid >= 1000);
        }
        
        console.log('Fetched auctions:', filteredAuctions);
        setAuctions(filteredAuctions);
      } else {
        console.log('No auctions found');
        setAuctions([]);
      }
    } catch (error: any) {
      console.error('Error fetching auctions:', error);
      setError('Failed to fetch auctions. Please try again later.');
      setAuctions([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBidSubmit = async (auctionId: string) => {
    if (!user) {
      // Redirect to login
      navigate(`/auth?redirect=/domain-auction`);
      return;
    }
    
    if (!bidAmount[auctionId]) {
      toast({
        title: 'Error',
        description: 'Please enter a bid amount.',
        variant: 'destructive'
      });
      return;
    }
    
    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) return;
    
    const amount = parseFloat(bidAmount[auctionId]);
    if (isNaN(amount) || amount <= auction.current_bid) {
      toast({
        title: 'Error',
        description: `Your bid must be higher than the current bid ($${auction.current_bid}).`,
        variant: 'destructive'
      });
      return;
    }
    
    setSubmittingBid(auctionId);
    try {
      // Call the edge function to place a bid
      const { data, error } = await supabase.functions.invoke('domain-auction', {
        body: {
          action: 'bid',
          auctionId: auctionId,
          bidAmount: amount
        }
      });
      
      if (error) throw error;
      
      // Update the auction in the UI
      setAuctions(prevAuctions => 
        prevAuctions.map(a => 
          a.id === auctionId 
            ? {...a, current_bid: amount, bids_count: a.bids_count + 1} 
            : a
        )
      );
      
      // Clear the bid amount
      setBidAmount({...bidAmount, [auctionId]: ''});
      
      toast({
        title: 'Bid placed successfully',
        description: `Your bid of $${amount} for ${auction.domain_name} has been placed.`,
      });
    } catch (error: any) {
      console.error('Error placing bid:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to place bid. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmittingBid(null);
    }
  };
  
  const formatTimeLeft = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const now = new Date();
    const diffMs = endDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Ended';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };
  
  const handleCreateAuction = () => {
    if (!user) {
      // Redirect to login
      navigate(`/auth?redirect=/create-auction`);
      return;
    }
    
    navigate('/create-auction');
  };
  
  const handleRefresh = () => {
    fetchAuctions();
  };
  
  return (
    <ServicePage
      title="Domain Auction"
      description="Bid on premium domain names or list your own domains for auction."
      ctaTitle="Have a Premium Domain to Sell?"
      ctaDescription="List your domain in our auction and reach thousands of potential buyers."
      ctaButtonText="List a Domain for Auction"
      ctaButtonLink="/create-auction"
    >
      <div className="mb-8 flex justify-between items-center">
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active Auctions</TabsTrigger>
            <TabsTrigger value="ending">Ending Soon</TabsTrigger>
            <TabsTrigger value="premium">Premium Domains</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          <Button className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary" onClick={handleCreateAuction}>
            <Gavel className="mr-2 h-4 w-4" />
            Create Auction
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-destructive/15 text-destructive border border-destructive/30 rounded-md p-4 mb-6">
          <p className="font-medium">{error}</p>
          <p className="text-sm mt-1">Try refreshing the page or come back later.</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purpleTheme-primary"></div>
        </div>
      ) : auctions.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No auctions found</h3>
          <p className="text-muted-foreground mb-6">There are currently no active auctions.</p>
          <Button className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary" onClick={handleCreateAuction}>
            Create an Auction
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <Card key={auction.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{auction.domain_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Listed by {auction.seller?.username || 'Anonymous'}</p>
                  </div>
                  <Badge className="bg-purpleTheme-primary">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatTimeLeft(auction.end_date)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-2xl font-bold text-purpleTheme-primary">${auction.current_bid.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Starting Bid: ${auction.starting_bid.toLocaleString()}</span>
                    <span>{auction.bids_count} {auction.bids_count === 1 ? 'bid' : 'bids'}</span>
                  </div>
                  {auction.description && (
                    <p className="text-sm text-muted-foreground">{auction.description}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder={`Bid more than $${auction.current_bid}`}
                      value={bidAmount[auction.id] || ''}
                      onChange={(e) => setBidAmount({...bidAmount, [auction.id]: e.target.value})}
                      className="flex-grow"
                    />
                    <Button 
                      className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary shrink-0"
                      disabled={!!submittingBid}
                      onClick={() => handleBidSubmit(auction.id)}
                    >
                      {submittingBid === auction.id ? (
                        <span>Placing Bid...</span>
                      ) : (
                        <span>Place Bid</span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a bid higher than the current bid
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-12 p-4 border rounded-lg bg-muted/20">
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Auction Information</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All auctions run for the selected duration. When you win an auction, you'll be guided through the domain transfer process.
              A non-refundable 5% buyer's premium is added to the final bid amount. All sales are final.
            </p>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default DomainAuction;
