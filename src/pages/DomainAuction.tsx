
import { useState, useEffect } from 'react';
import ServicePage from '@/components/ServicePage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Gavel, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
}

const DomainAuction = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [bidAmount, setBidAmount] = useState<Record<string, string>>({});
  const [submittingBid, setSubmittingBid] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    fetchAuctions();
  }, []);
  
  const fetchAuctions = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch auction data from Supabase
      // Simulating auction data for now
      const sampleAuctions: Auction[] = [
        {
          id: '1',
          domain_name: 'techhub.com',
          starting_bid: 5000,
          current_bid: 7500,
          bids_count: 12,
          seller_id: 'user1',
          end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
          status: 'active',
          seller: { username: 'domainmaster' }
        },
        {
          id: '2',
          domain_name: 'digitalflow.io',
          starting_bid: 2000,
          current_bid: 2500,
          bids_count: 5,
          seller_id: 'user2',
          end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          status: 'active',
          seller: { username: 'techseller' }
        },
        {
          id: '3',
          domain_name: 'investpro.com',
          starting_bid: 3500,
          current_bid: 4200,
          bids_count: 8,
          seller_id: 'user3',
          end_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          status: 'active',
          seller: { username: 'domaintrader' }
        },
        {
          id: '4',
          domain_name: 'cloudstore.net',
          starting_bid: 1500,
          current_bid: 1800,
          bids_count: 3,
          seller_id: 'user4',
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          status: 'active',
          seller: { username: 'cloudmaster' }
        }
      ];
      
      setAuctions(sampleAuctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load auctions. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleBidSubmit = async (auctionId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = `/auth?redirect=/domain-auction`;
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
      // In a real implementation, this would call the domain auction API
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    } catch (error) {
      console.error('Error placing bid:', error);
      toast({
        title: 'Error',
        description: 'Failed to place bid. Please try again.',
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
      window.location.href = `/auth?redirect=/domain-auction`;
      return;
    }
    
    window.location.href = '/create-auction';
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
        
        <Button className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary" onClick={handleCreateAuction}>
          <Gavel className="mr-2 h-4 w-4" />
          Create Auction
        </Button>
      </div>
      
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
          <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Auction Information</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All auctions run for 7 days by default. When you win an auction, you'll be guided through the domain transfer process.
              A non-refundable 5% buyer's premium is added to the final bid amount. All sales are final.
            </p>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default DomainAuction;
