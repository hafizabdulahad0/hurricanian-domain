
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ServicePage from '@/components/ServicePage';
import DomainSearchComponent from '@/components/DomainSearch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Search, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DomainResult {
  domain: string;
  available: boolean;
  price: number;
}

const DomainSearch = () => {
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  useEffect(() => {
    // Parse query parameters
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const results = params.get('results');
    
    if (query) {
      setSearchQuery(query);
    }
    
    if (results) {
      try {
        const parsedResults = JSON.parse(decodeURIComponent(results));
        setSearchResults(parsedResults);
        setError(null);
      } catch (error) {
        console.error('Error parsing search results:', error);
        setError('Could not load search results. Please try searching again.');
      }
    } else if (query) {
      // If we have a query but no results, that's an error state
      setError('No search results found. Please try again with different criteria.');
    }
  }, [location.search]);
  
  const handleAddToCart = (domain: string, price: number) => {
    addItem({
      id: `domain-${domain}-${Date.now()}`,
      type: 'domain',
      name: domain,
      price: price,
      period: 12, // 12 months (1 year)
      details: {
        registrationType: 'new'
      }
    });
    
    // Show success message with link to cart
    toast({
      title: "Added to cart",
      description: (
        <div className="flex flex-col">
          <span>{domain} has been added to your cart.</span>
          <a href="/cart" className="text-purpleTheme-primary hover:underline mt-1">View Cart</a>
        </div>
      ),
      duration: 5000,
    });
  };
  
  const handleSave = (domain: string) => {
    // In a real implementation, this would save the domain to the user's saved domains
    toast({
      title: "Domain saved",
      description: `${domain} has been saved to your favorites.`,
    });
  };
  
  return (
    <ServicePage
      title="Find Your Perfect Domain Name"
      description="Search for available domain names and secure your online identity."
      ctaTitle="Ready to Establish Your Online Presence?"
      ctaDescription="Start with the perfect domain name that represents your brand."
    >
      <div className="max-w-3xl mx-auto mb-12">
        <DomainSearchComponent />
      </div>
      
      {error && (
        <Alert className="max-w-3xl mx-auto mb-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {searchResults.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Search Results for "{searchQuery}"
          </h2>
          
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold">{result.domain}</h3>
                    <div className="mt-1">
                      {result.available ? (
                        <Badge className="bg-purpleTheme-primary">Available</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">Not Available</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    {result.available && (
                      <p className="text-xl font-bold text-purpleTheme-primary mb-3 md:mb-0">
                        ${result.price}/yr
                      </p>
                    )}
                    
                    {result.available ? (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center"
                          onClick={() => handleSave(result.domain)}
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          <span>Save</span>
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary flex items-center"
                          onClick={() => handleAddToCart(result.domain, result.price)}
                        >
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          <span>Add to Cart</span>
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        Check Alternatives
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Didn't find what you were looking for? Try our AI Domain Generator
            </p>
            <Button className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary" asChild>
              <a href="/domain-ai">Try AI Domain Generator</a>
            </Button>
          </div>
        </div>
      )}
    </ServicePage>
  );
};

export default DomainSearch;
