
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const DomainSearch = () => {
  const [domain, setDomain] = useState('');
  const [extensions, setExtensions] = useState<string[]>(['.com', '.net', '.org', '.io']);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
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
            className="rounded-l-none bg-domainBlue hover:bg-domainBlue-dark px-6 py-6 h-auto"
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
          {extensions.map((ext) => (
            <div key={ext} className="flex items-center">
              <input
                type="checkbox"
                id={`ext-${ext}`}
                className="h-4 w-4 text-domainBlue border-gray-300 rounded focus:ring-domainBlue"
                checked={extensions.includes(ext)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setExtensions([...extensions, ext]);
                  } else {
                    setExtensions(extensions.filter((item) => item !== ext));
                  }
                }}
              />
              <label htmlFor={`ext-${ext}`} className="ml-2 text-sm text-gray-600">
                {ext}
              </label>
            </div>
          ))}
          <div className="text-sm text-domainBlue hover:underline cursor-pointer">
            + More options
          </div>
        </div>
      </form>
    </div>
  );
};

export default DomainSearch;
