
import ServicePage from '@/components/ServicePage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, CheckCircle, AlertTriangle } from 'lucide-react';

const FreeDomains = () => {
  return (
    <ServicePage
      title="Free Domains"
      description="Start your online journey with a free domain name."
      ctaTitle="Need More Features?"
      ctaDescription="Upgrade to a premium domain with additional features and benefits."
      ctaButtonText="Explore Premium Options"
      ctaButtonLink="/premium"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <div className="flex items-start">
            <div className="bg-domainBlue text-white p-3 rounded-full">
              <Gift className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold mb-2">How to Get Your Free Domain</h2>
              <p className="text-gray-600 mb-4">
                We offer free domain names with our web hosting packages. Choose from 
                select domain extensions when you sign up for a hosting plan.
              </p>
              <Button className="bg-domainBlue hover:bg-domainBlue-dark">
                View Hosting Plans
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Included Free Domain Extensions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                '.xyz', '.site', '.online', '.tech', '.space', 
                '.store', '.website', '.fun', '.uno', '.host', 
                '.pw', '.press'
              ].map((ext, index) => (
                <div key={index} className="border rounded-lg p-3 text-center">
                  <p className="font-semibold text-gray-900">{ext}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Card className="p-6">
            <h3 className="font-bold text-xl mb-4">Free Domain Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700">1-year registration included with hosting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700">DNS management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700">Email forwarding</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700">Domain transfer support</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700">Domain privacy protection not included</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                <span className="text-gray-700">Standard renewal rates apply after 1st year</span>
              </li>
            </ul>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Hosting Plans with Free Domains</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">Perfect for personal websites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$2.99<span className="text-base font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 Free Domain</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 Website</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">10 GB SSD Storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unmetered Bandwidth</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free SSL Certificate</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Select Plan
              </Button>
            </Card>
            
            <Card className="p-6 border-domainBlue ring-2 ring-domainBlue relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-domainBlue text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Plus</h3>
              <p className="text-gray-600 mb-4">Great for small businesses</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$4.99<span className="text-base font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 Free Domain</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited Websites</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">25 GB SSD Storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unmetered Bandwidth</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free SSL Certificate</span>
                </li>
              </ul>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Select Plan
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-gray-600 mb-4">For professional websites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$7.99<span className="text-base font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">1 Free Domain</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited Websites</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">100 GB SSD Storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unmetered Bandwidth</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free SSL Certificate</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Free Domain Privacy</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Select Plan
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default FreeDomains;
