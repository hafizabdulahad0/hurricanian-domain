
import ServicePage from '@/components/ServicePage';
import DomainSearchComponent from '@/components/DomainSearch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

const DomainSearch = () => {
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
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-8">Sample Domain Search Results</h2>
        
        <div className="space-y-4">
          {[
            { domain: 'example.com', available: true, price: '$9.99/yr' },
            { domain: 'example.net', available: true, price: '$11.99/yr' },
            { domain: 'example.org', available: true, price: '$12.99/yr' },
            { domain: 'example.io', available: true, price: '$39.99/yr' },
            { domain: 'example.co', available: false, price: 'Not Available' },
          ].map((domain, index) => (
            <Card key={index} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold">{domain.domain}</h3>
                  <div className="mt-1">
                    {domain.available ? (
                      <Badge className="bg-purpleTheme-primary">Available</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Not Available</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <p className="text-xl font-bold text-purpleTheme-primary mb-3 md:mb-0">
                    {domain.price}
                  </p>
                  
                  {domain.available ? (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Heart className="mr-1 h-4 w-4" />
                        <span>Save</span>
                      </Button>
                      <Button size="sm" className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary flex items-center">
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
    </ServicePage>
  );
};

export default DomainSearch;
