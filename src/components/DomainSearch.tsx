
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, AlertCircle, Loader } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import DomainExtensionsModal from './DomainExtensionsModal';

const DomainSearch = () => {
  const [domain, setDomain] = useState('');
  const [extensionChecks, setExtensionChecks] = useState({
    '.com': true,
    '.net': true,
    '.org': true,
    '.io': true
  });
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExtensionsModal, setShowExtensionsModal] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError(null);
    
    if (!domain) {
      setError('Please enter a domain name');
      setIsSearching(false);
      return;
    }
    
    // Clean domain name (remove www, http, etc.)
    const cleanDomain = domain.trim().toLowerCase()
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '')
      .split('.')[0];
    
    // Get selected extensions
    const selectedExtensions = Object.entries(extensionChecks)
      .filter(([_, isChecked]) => isChecked)
      .map(([ext]) => ext);
      
    if (selectedExtensions.length === 0) {
      setError('Please select at least one extension');
      setIsSearching(false);
      return;
    }
      
    try {
      console.log(`Searching for domain: ${cleanDomain} with extensions:`, selectedExtensions);
      
      // Call the domain-search edge function
      const { data, error: apiError } = await supabase.functions.invoke('domain-search', {
        body: {
          domain: cleanDomain,
          extensions: selectedExtensions
        }
      });
      
      if (apiError) {
        console.error('API Error:', apiError);
        throw new Error(apiError.message || 'Failed to search domains');
      }
      
      if (!data || !data.results) {
        throw new Error('Invalid response from search API');
      }
      
      console.log('Search results:', data.results);
      
      // Show success message
      const availableCount = data.results.filter((r: any) => r.available).length;
      toast({
        title: "Search completed",
        description: `Found ${availableCount} available domains out of ${data.results.length} searched.`,
      });
      
      // Navigate to search results page with the results
      navigate(`/domain-search?query=${encodeURIComponent(cleanDomain)}&results=${encodeURIComponent(JSON.stringify(data.results))}`);
      
    } catch (error: any) {
      console.error('Error searching domains:', error);
      const errorMessage = error.message || "Failed to fetch domains. Please try again later.";
      setError(errorMessage);
      toast({
        title: "Search failed",
        description: errorMessage,
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

  const handleMoreOptionsClick = () => {
    setShowExtensionsModal(true);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {error && (
        <Alert className="mb-4 bg-red-50 border-red-200 animate-slide-up">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            {error}
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
            className="rounded-r-none py-6 text-lg border-r-0 pr-4 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover-glow transition-all duration-300"
            required
          />
          <Button 
            type="submit" 
            className="rounded-l-none bg-primary hover:bg-accent px-4 h-auto button-hover"
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="flex items-center">
                <Loader className="animate-spin rounded-full h-5 w-5 mr-2" />
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
            <div key={ext} className="flex items-center space-x-2 hover-lift">
              <Checkbox 
                id={`ext-${ext}`}
                checked={extensionChecks[ext as keyof typeof extensionChecks]}
                onCheckedChange={() => handleExtensionToggle(ext)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor={`ext-${ext}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {ext}
              </label>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMoreOptionsClick}
            className="text-sm text-primary hover:text-accent cursor-pointer hover-fade transition-colors duration-300 p-0 h-auto"
          >
            + More options
          </Button>
        </div>
      </form>

      <DomainExtensionsModal
        isOpen={showExtensionsModal}
        onClose={() => setShowExtensionsModal(false)}
        selectedExtensions={extensionChecks}
        onExtensionToggle={handleExtensionToggle}
      />
    </div>
  );
};

export default DomainSearch;
