
import ServicePage from '@/components/ServicePage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const Premium = () => {
  return (
    <ServicePage
      title="Premium Domains"
      description="Explore our curated collection of high-quality premium domain names."
      ctaTitle="Interested in a Premium Domain?"
      ctaDescription="Our domain experts can help you find the perfect premium domain for your business."
      ctaButtonText="Contact Domain Expert"
      ctaButtonLink="/contact"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Premium Domains</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our premium domains are carefully selected for their brandability, memorability, and commercial value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { name: 'digitalflow.com', price: '$12,500', category: 'Technology' },
            { name: 'investpro.com', price: '$8,900', category: 'Finance' },
            { name: 'healthhub.org', price: '$6,700', category: 'Healthcare' },
            { name: 'learnfast.com', price: '$9,300', category: 'Education' },
            { name: 'cryptotrade.io', price: '$14,800', category: 'Cryptocurrency' },
            { name: 'fitnessguru.com', price: '$7,500', category: 'Fitness' },
            { name: 'travelworld.com', price: '$18,200', category: 'Travel' },
            { name: 'ecostore.org', price: '$5,900', category: 'Environment' },
            { name: 'luxurylife.com', price: '$22,000', category: 'Lifestyle' },
          ].map((domain, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{domain.name}</h3>
                  <p className="text-gray-500 text-sm">{domain.category}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-domainBlue">{domain.price}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                    Make Offer
                  </Button>
                  <Button size="sm" className="bg-domainBlue hover:bg-domainBlue-dark">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Domain Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              'Technology', 
              'Finance', 
              'Healthcare', 
              'Education', 
              'E-commerce',
              'Travel',
              'Real Estate',
              'Entertainment',
              'Sports',
              'Automotive'
            ].map((category, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900">{category}</h3>
                <p className="text-sm text-gray-500">Domains</p>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-12 bg-domainGray p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose Premium Domains?</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Instantly establish credibility and professionalism</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">More memorable and easier to market</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Higher potential for organic traffic</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Long-term investment value</span>
                </li>
                <li className="flex items-start">
                  <Star className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Competitive advantage in your industry</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3">
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Browse All Premium Domains
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default Premium;
