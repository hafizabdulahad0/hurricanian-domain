
import ServicePage from '@/components/ServicePage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, CheckCircle } from 'lucide-react';

const Broker = () => {
  return (
    <ServicePage
      title="Domain Broker Service"
      description="We'll negotiate the purchase of premium domains on your behalf."
      ctaTitle="Ready to Acquire Your Dream Domain?"
      ctaDescription="Our professional brokers are here to help you get the perfect domain for your business."
      ctaButtonText="Contact a Broker"
      ctaButtonLink="/contact"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Use Our Domain Broker Service?</h2>
            <p className="text-gray-600 mb-4">
              Already know the perfect domain name for your business, but it's already registered? Our professional domain brokers will help you acquire it through expert negotiation and domain acquisition strategies.
            </p>
            <ul className="space-y-2">
              {[
                "Experienced negotiators with industry knowledge",
                "Access to hard-to-reach domain owners",
                "Confidential acquisition process",
                "Secure escrow services for safe transactions",
                "Competitive rates with success-based fees",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                <Briefcase className="h-8 w-8 text-domainBlue" />
              </div>
              <h3 className="text-xl font-bold">How It Works</h3>
            </div>
            
            <ol className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-domainBlue text-white flex items-center justify-center mr-3">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Submit Your Request</h4>
                  <p className="text-gray-600 text-sm">Tell us which domain you want to acquire</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-domainBlue text-white flex items-center justify-center mr-3">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Consultation</h4>
                  <p className="text-gray-600 text-sm">Our broker discusses strategy and sets expectations</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-domainBlue text-white flex items-center justify-center mr-3">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Owner Contact & Negotiation</h4>
                  <p className="text-gray-600 text-sm">We reach out to the owner and negotiate terms</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-domainBlue text-white flex items-center justify-center mr-3">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Secure Transaction</h4>
                  <p className="text-gray-600 text-sm">We handle the payment and domain transfer safely</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-6">
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Start Acquisition Process
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Our Broker Service Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <p className="text-gray-600 mb-4">For domains valued under $10,000</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$199</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic negotiation service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email owner outreach</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secure escrow service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">15% success fee</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Select Standard
              </Button>
            </Card>
            
            <Card className="p-6 border-domainBlue ring-2 ring-domainBlue relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-domainBlue text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 mb-4">For domains valued $10,000-$50,000</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$499</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced negotiation strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Phone and email outreach</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Market value assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secure escrow service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">12% success fee</span>
                </li>
              </ul>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Select Premium
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For domains valued over $50,000</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$999</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Elite broker assignment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">All contact methods</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Full acquisition strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Legal consultation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">10% success fee</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Select Enterprise
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default Broker;
