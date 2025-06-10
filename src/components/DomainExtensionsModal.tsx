
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DomainExtension {
  ext: string;
  price: string;
  category: string;
  description: string;
  popular?: boolean;
}

interface DomainExtensionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExtensions: Record<string, boolean>;
  onExtensionToggle: (ext: string) => void;
  category?: string;
}

const allExtensions: DomainExtension[] = [
  // Popular extensions
  { ext: '.com', price: '$9.99/yr', category: 'Popular', description: 'Most popular and trusted extension', popular: true },
  { ext: '.net', price: '$11.99/yr', category: 'Popular', description: 'Great for networks and tech companies', popular: true },
  { ext: '.org', price: '$12.99/yr', category: 'Popular', description: 'Perfect for organizations and nonprofits', popular: true },
  { ext: '.io', price: '$39.99/yr', category: 'Technology', description: 'Favorite among tech startups', popular: true },
  
  // Business extensions
  { ext: '.biz', price: '$14.99/yr', category: 'Business', description: 'For business websites' },
  { ext: '.company', price: '$19.99/yr', category: 'Business', description: 'Corporate identity' },
  { ext: '.inc', price: '$24.99/yr', category: 'Business', description: 'Incorporated businesses' },
  { ext: '.llc', price: '$29.99/yr', category: 'Business', description: 'Limited liability companies' },
  { ext: '.ltd', price: '$24.99/yr', category: 'Business', description: 'Limited companies' },
  { ext: '.consulting', price: '$34.99/yr', category: 'Business', description: 'Consulting services' },
  { ext: '.solutions', price: '$24.99/yr', category: 'Business', description: 'Solution providers' },
  
  // Technology extensions
  { ext: '.tech', price: '$34.99/yr', category: 'Technology', description: 'Technology companies' },
  { ext: '.app', price: '$14.99/yr', category: 'Technology', description: 'Mobile and web applications' },
  { ext: '.dev', price: '$15.99/yr', category: 'Technology', description: 'Developers and programmers' },
  { ext: '.ai', price: '$79.99/yr', category: 'Technology', description: 'Artificial intelligence' },
  { ext: '.cloud', price: '$19.99/yr', category: 'Technology', description: 'Cloud services' },
  { ext: '.digital', price: '$24.99/yr', category: 'Technology', description: 'Digital businesses' },
  { ext: '.code', price: '$29.99/yr', category: 'Technology', description: 'Coding and development' },
  { ext: '.software', price: '$34.99/yr', category: 'Technology', description: 'Software companies' },
  { ext: '.network', price: '$19.99/yr', category: 'Technology', description: 'Network services' },
  
  // E-commerce extensions
  { ext: '.shop', price: '$19.99/yr', category: 'E-commerce', description: 'Online shopping' },
  { ext: '.store', price: '$19.99/yr', category: 'E-commerce', description: 'Retail stores' },
  { ext: '.market', price: '$24.99/yr', category: 'E-commerce', description: 'Marketplaces' },
  { ext: '.buy', price: '$29.99/yr', category: 'E-commerce', description: 'Purchase-focused sites' },
  { ext: '.sale', price: '$24.99/yr', category: 'E-commerce', description: 'Sales and promotions' },
  { ext: '.deals', price: '$29.99/yr', category: 'E-commerce', description: 'Deal websites' },
  { ext: '.shopping', price: '$34.99/yr', category: 'E-commerce', description: 'Shopping platforms' },
  
  // Creative extensions
  { ext: '.design', price: '$29.99/yr', category: 'Creative', description: 'Design professionals' },
  { ext: '.photography', price: '$24.99/yr', category: 'Creative', description: 'Photographers' },
  { ext: '.art', price: '$19.99/yr', category: 'Creative', description: 'Artists and galleries' },
  { ext: '.studio', price: '$24.99/yr', category: 'Creative', description: 'Creative studios' },
  { ext: '.media', price: '$34.99/yr', category: 'Creative', description: 'Media companies' },
  { ext: '.blog', price: '$19.99/yr', category: 'Creative', description: 'Blogs and content' },
  { ext: '.gallery', price: '$24.99/yr', category: 'Creative', description: 'Art galleries' },
  
  // Geographic extensions
  { ext: '.nyc', price: '$24.99/yr', category: 'Geographic', description: 'New York City' },
  { ext: '.london', price: '$34.99/yr', category: 'Geographic', description: 'London, UK' },
  { ext: '.tokyo', price: '$39.99/yr', category: 'Geographic', description: 'Tokyo, Japan' },
  { ext: '.paris', price: '$44.99/yr', category: 'Geographic', description: 'Paris, France' },
  { ext: '.berlin', price: '$39.99/yr', category: 'Geographic', description: 'Berlin, Germany' },
  { ext: '.miami', price: '$29.99/yr', category: 'Geographic', description: 'Miami, Florida' },
  { ext: '.california', price: '$34.99/yr', category: 'Geographic', description: 'California state' },
  { ext: '.vegas', price: '$49.99/yr', category: 'Geographic', description: 'Las Vegas' },
  
  // Specialized extensions
  { ext: '.health', price: '$79.99/yr', category: 'Specialized', description: 'Healthcare services' },
  { ext: '.legal', price: '$49.99/yr', category: 'Specialized', description: 'Legal services' },
  { ext: '.finance', price: '$54.99/yr', category: 'Specialized', description: 'Financial services' },
  { ext: '.education', price: '$24.99/yr', category: 'Specialized', description: 'Educational institutions' },
  { ext: '.academy', price: '$34.99/yr', category: 'Specialized', description: 'Training academies' },
  { ext: '.fitness', price: '$29.99/yr', category: 'Specialized', description: 'Fitness and wellness' },
  { ext: '.yoga', price: '$34.99/yr', category: 'Specialized', description: 'Yoga studios' },
  { ext: '.club', price: '$19.99/yr', category: 'Specialized', description: 'Clubs and communities' },
];

const DomainExtensionsModal = ({ 
  isOpen, 
  onClose, 
  selectedExtensions, 
  onExtensionToggle,
  category 
}: DomainExtensionsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const { toast } = useToast();

  const categories = ['All', 'Popular', 'Business', 'Technology', 'E-commerce', 'Creative', 'Geographic', 'Specialized'];
  
  const filteredExtensions = allExtensions.filter(ext => {
    const matchesSearch = ext.ext.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ext.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ext.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectAll = () => {
    const currentCategoryExtensions = filteredExtensions.map(ext => ext.ext);
    currentCategoryExtensions.forEach(ext => {
      if (!selectedExtensions[ext]) {
        onExtensionToggle(ext);
      }
    });
    
    toast({
      title: "Extensions selected",
      description: `Selected ${currentCategoryExtensions.length} extensions from ${selectedCategory}`,
    });
  };

  const selectedCount = Object.values(selectedExtensions).filter(Boolean).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Domain Extensions</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search extensions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={filteredExtensions.length === 0}
              >
                Select All ({filteredExtensions.length})
              </Button>
              {selectedCount > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedCount} selected
                </Badge>
              )}
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Extensions grid */}
          <div className="overflow-y-auto max-h-96">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredExtensions.map((extension) => (
                <div
                  key={extension.ext}
                  className={`border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedExtensions[extension.ext] ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => onExtensionToggle(extension.ext)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedExtensions[extension.ext] || false}
                        onChange={() => onExtensionToggle(extension.ext)}
                      />
                      <div>
                        <p className="font-semibold text-sm">{extension.ext}</p>
                        {extension.popular && (
                          <Badge className="text-xs bg-primary">Popular</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-primary font-medium text-sm">{extension.price}</p>
                  </div>
                  <p className="text-muted-foreground text-xs">{extension.description}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {extension.category}
                  </Badge>
                </div>
              ))}
            </div>
            
            {filteredExtensions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No extensions found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DomainExtensionsModal;
