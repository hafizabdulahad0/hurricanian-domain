
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const DomainSearch = () => {
  const [domain, setDomain] = useState('');
  const [extensionChecks, setExtensionChecks] = useState({
    '.com': true,
    '.net': true,
    '.org': true,
    '.io': true
  });
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };
  
  const handleExtensionToggle = (ext: string) => {
    setExtensionChecks(prev => ({
      ...prev,
      [ext]: !prev[ext]
    }));
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
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
            className="rounded-l-none bg-purpleTheme-primary hover:bg-purpleTheme-secondary px-4 py-2 h-auto"
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Searching</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                <span>Search</span>
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
