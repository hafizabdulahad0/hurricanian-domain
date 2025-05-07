
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, ShoppingCart } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DomainSearch = () => {
  const [domain, setDomain] = useState('');
  const [extensionChecks, setExtensionChecks] = useState({
    '.com': true,
    '.net': true,
    '.org': true,
    '.io': true
  });
  const [isSearching, setIsSearching] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Check if API is configured
  useEffect(() => {
    const checkApiConfiguration = async () => {
      try {
        const { data, error } = await supabase
          .from('api_configurations')
          .select('provider, integration_status')
          .eq('integration_status', 'active')
          .in('provider', ['godaddy', 'namecheap', 'resellerclub']);
          
        if (error) throw error;
        setApiConfigured(data && data.length > 0);
      } catch (error) {
        console.error('Error checking API configuration:', error);
      }
    };
    
    checkApiConfiguration();
  }, []);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Get selected extensions
    const selectedExtensions = Object.entries(extensionChecks)
      .filter(([_, isChecked]) => isChecked)
      .map(([ext]) => ext);
      
    try {
      // In a real implementation, this would call the domain registrar API
      // via a server-side endpoint to check availability
      
      // For now, we'll simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate results
      const results = selectedExtensions.map(ext => ({
        domain: domain + ext,
        available: Math.random() > 0.3, // 70% chance of availability
        price: ext === '.io' ? 39.99 : ext === '.org' ? 12.99 : ext === '.net' ? 11.99 : 9.99
      }));
      
      // Show results
      toast({
        title: "Search completed",
        description: `Found ${results.filter(r => r.available).length} available domains.`,
      });
      
      // Redirect to search results page with the results
      window.location.href = `/domain-search?query=${domain}&results=${JSON.stringify(results)}`;
      
    } catch (error) {
      console.error('Error searching domains:', error);
      toast({
        title: "Search failed",
        description: "An error occurred while searching for domains.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleExtensionToggle = (ext: string) => {
    setExtensionChecks(prev => ({
      ...prev,
      [ext]: !prev[ext]
    }));
  };
  
  const addDomainToCart = (domain: string, price: number) => {
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
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {!apiConfigured && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is a demonstration using sample data. The actual domain availability may differ.
          </AlertDescription>
        </Alert>
      )}
    
      <form onSubmit={handleSearch} className="relative">
        <div className="flex">
          <Input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Find your perfect domain name"
            className="rounded-r-none py-6 text-lg border-r-0 pr-4"
            required
          />
          <Button 
            type="submit" 
            className="rounded-l-none bg-purpleTheme-primary hover:bg-purpleTheme-secondary px-4 h-auto"
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Searching</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Search className="mr-1 h-4 w-4" />
                <span className="text-sm">Search</span>
              </div>
            )}
          </Button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.keys(extensionChecks).map((ext) => (
            <div key={ext} className="flex items-center space-x-2">
              <Checkbox 
                id={`ext-${ext}`}
                checked={extensionChecks[ext as keyof typeof extensionChecks]}
                onCheckedChange={() => handleExtensionToggle(ext)}
              />
              <label
                htmlFor={`ext-${ext}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {ext}
              </label>
            </div>
          ))}
          <div className="text-sm text-purpleTheme-primary hover:underline cursor-pointer">
            + More options
          </div>
        </div>
      </form>
    </div>
  );
};

export default DomainSearch;
