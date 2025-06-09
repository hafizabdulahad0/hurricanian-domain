
import { useState } from 'react';
import ServicePage from '@/components/ServicePage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileSearch, DollarSign } from 'lucide-react';

const Appraise = () => {
  const [domain, setDomain] = useState('');
  const [appraised, setAppraised] = useState(false);
  
  const handleAppraise = (e: React.FormEvent) => {
    e.preventDefault();
    setAppraised(true);
  };
  
  return (
    <ServicePage
      title="Domain Appraisal"
      description="Get an estimated value for any domain name based on market factors and domain characteristics."
      ctaTitle="Have a Valuable Domain?"
      ctaDescription="Use our broker service to get the best possible price for your premium domain."
      ctaButtonText="Learn About Broker Service"
      ctaButtonLink="/broker"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 mb-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6">Domain Appraisal Tool</h2>
          
          <form onSubmit={handleAppraise}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter a domain name (e.g., example.com)"
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 button-hover">
                <FileSearch className="mr-2 h-4 w-4" />
                <span>Appraise</span>
              </Button>
            </div>
          </form>
          
          {appraised && (
            <div className="mt-8 p-6 border rounded-lg bg-gray-50 animate-fade-in">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
                <h3 className="ml-2 text-xl font-semibold">Appraisal Results for {domain}</h3>
              </div>
              
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold text-primary mb-2">$4,500 - $6,800</div>
                <p className="text-gray-600">Estimated Market Value</p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Domain Characteristics</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Length: 7 characters (Good)</li>
                    <li>• Extension: .com (Excellent)</li>
                    <li>• Contains keywords: Yes</li>
                    <li>• Pronounceability: Excellent</li>
                    <li>• Memorability: Very Good</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Market Factors</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Commercial Potential: High</li>
                    <li>• Industry Relevance: Technology</li>
                    <li>• Search Volume: Moderate</li>
                    <li>• Comparable Sales: $5,200 average</li>
                    <li>• Brandability: Very Good</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-gray-700">
                  This appraisal is an estimate based on our algorithm and market data. Actual domain value may vary based on buyer interest and market conditions.
                </p>
              </div>
            </div>
          )}
        </Card>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">How We Calculate Domain Value</h2>
          <p className="text-gray-600 mb-4">
            Our domain appraisal algorithm considers multiple factors to determine the estimated market value of a domain name:
          </p>
          <ul className="list-disc ml-5 space-y-2 text-gray-600 mb-6">
            <li>Domain length and extension</li>
            <li>Keyword value and search volume</li>
            <li>Comparable domain sales</li>
            <li>Commercial potential</li>
            <li>Brandability and memorability</li>
            <li>Industry relevance</li>
          </ul>
          <p className="text-gray-600">
            For a more detailed and personalized appraisal, consider using our professional domain appraisal service with expert human evaluation.
          </p>
        </div>
      </div>
    </ServicePage>
  );
};

export default Appraise;
