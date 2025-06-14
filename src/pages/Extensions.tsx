import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServicePage from '@/components/ServicePage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileUp, Search, ArrowLeft } from 'lucide-react';
import DomainExtensionsModal from '@/components/DomainExtensionsModal';

const Extensions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAllExtensions, setShowAllExtensions] = useState(false);
  const [selectedExtensions, setSelectedExtensions] = useState<Record<string, boolean>>({});
  const category = searchParams.get('category');
  
  const handleExtensionToggle = (ext: string) => {
    setSelectedExtensions(prev => ({
      ...prev,
      [ext]: !prev[ext]
    }));
  };

  const handleCategoryView = (categoryName: string) => {
    setSearchParams({ category: categoryName });
    setShowAllExtensions(true);
  };

  const handleBackToCategories = () => {
    setSearchParams({});
    setShowAllExtensions(false);
  };

  // If we're viewing a specific category, show the detailed modal
  if (category) {
    return (
      <ServicePage 
        title={`${category} Domain Extensions`} 
        description={`Explore ${category.toLowerCase()} domain extensions to find the perfect fit for your website.`}
        ctaTitle="Ready to Secure Your Domain?" 
        ctaDescription="Find and register your domain with the perfect extension now." 
        ctaButtonText="Search Domains" 
        ctaButtonLink="/domain-search"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={handleBackToCategories}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </div>
          
          <DomainExtensionsModal
            isOpen={true}
            onClose={handleBackToCategories}
            selectedExtensions={selectedExtensions}
            onExtensionToggle={handleExtensionToggle}
            category={category}
          />
        </div>
      </ServicePage>
    );
  }

  return (
    <ServicePage 
      title="New Domain Extensions" 
      description="Discover the latest domain extensions to find the perfect fit for your website." 
      ctaTitle="Ready to Secure Your Domain?" 
      ctaDescription="Find and register your domain with the perfect extension now." 
      ctaButtonText="Search Domains" 
      ctaButtonLink="/domain-search"
    >
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-lg shadow-sm border border-gray-100 mb-12 bg-inherit">
          <h2 className="text-2xl font-bold mb-6">Find Your Perfect Extension</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="text" placeholder="Search for domain extensions" className="flex-1" />
            <Button 
              className="bg-primary hover:bg-primary/80"
              onClick={() => setShowAllExtensions(true)}
            >
              <Search className="mr-2 h-4 w-4 text-primary" />
              <span>Search All Extensions</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular New Extensions</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { ext: '.app', price: '$14.99/yr', desc: 'For applications' },
              { ext: '.tech', price: '$34.99/yr', desc: 'For tech companies' },
              { ext: '.store', price: '$19.99/yr', desc: 'For e-commerce' },
              { ext: '.io', price: '$39.99/yr', desc: 'For tech startups' },
              { ext: '.ai', price: '$79.99/yr', desc: 'For AI companies' },
              { ext: '.dev', price: '$15.99/yr', desc: 'For developers' },
              { ext: '.design', price: '$29.99/yr', desc: 'For designers' },
              { ext: '.cloud', price: '$19.99/yr', desc: 'For cloud services' },
              { ext: '.digital', price: '$24.99/yr', desc: 'For digital brands' },
              { ext: '.shop', price: '$19.99/yr', desc: 'For retail' },
              { ext: '.blog', price: '$19.99/yr', desc: 'For blogs' },
              { ext: '.agency', price: '$19.99/yr', desc: 'For agencies' }
            ].map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <p className="text-xl font-bold mb-1 text-inherit">{item.ext}</p>
                <p className="text-primary font-medium">{item.price}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Extension Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business</h3>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>.com, .co, .biz, .company</li>
                <li>.inc, .llc, .ltd, .limited</li>
                <li>.consulting, .solutions</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleCategoryView('Business')}
              >
                View All
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technology</h3>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>.tech, .app, .dev, .io</li>
                <li>.ai, .cloud, .code</li>
                <li>.digital, .network, .software</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleCategoryView('Technology')}
              >
                View All
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Creative</h3>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>.design, .photography</li>
                <li>.art, .studio, .media</li>
                <li>.blog, .gallery</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleCategoryView('Creative')}
              >
                View All
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>.shop, .store, .market</li>
                <li>.buy, .sale, .deals</li>
                <li>.shopping, .ecommerce</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleCategoryView('E-commerce')}
              >
                View All
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Geo & Regional</h3>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>.nyc, .london, .tokyo</li>
                <li>.paris, .berlin, .miami</li>
                <li>.california, .vegas</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleCategoryView('Geographic')}
              >
                View All
              </Button>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Specialized</h3>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>.health, .legal, .finance</li>
                <li>.education, .academy</li>
                <li>.fitness, .yoga, .club</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleCategoryView('Specialized')}
              >
                View All
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-8 rounded-lg bg-inherit">
          <h2 className="text-2xl font-bold mb-4">Why Choose a New Domain Extension?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="font-semibold">Better Domain Availability</p>
                    <p className="text-gray-600 text-sm">Find shorter, more memorable domains that aren't already taken.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="font-semibold">Industry Relevance</p>
                    <p className="text-gray-600 text-sm">Choose extensions that instantly communicate your business type.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="font-semibold">Stand Out from Competition</p>
                    <p className="text-gray-600 text-sm">Be unique with modern, innovative domain extensions.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 shrink-0 mt-0.5">4</div>
                  <div>
                    <p className="font-semibold">Improved Branding</p>
                    <p className="text-gray-600 text-sm">Create a complete brand message with your domain name.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 shrink-0 mt-0.5">5</div>
                  <div>
                    <p className="font-semibold">Geo-Targeting</p>
                    <p className="text-gray-600 text-sm">Use location-based extensions to target specific regions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 shrink-0 mt-0.5">6</div>
                  <div>
                    <p className="font-semibold">Future-Proofing</p>
                    <p className="text-gray-600 text-sm">Join the modern web with contemporary domain extensions.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DomainExtensionsModal
        isOpen={showAllExtensions}
        onClose={() => setShowAllExtensions(false)}
        selectedExtensions={selectedExtensions}
        onExtensionToggle={handleExtensionToggle}
      />
    </ServicePage>
  );
};

export default Extensions;
