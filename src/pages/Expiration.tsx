
import ServicePage from '@/components/ServicePage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, AlertTriangle, CheckCircle, X } from 'lucide-react';

const Expiration = () => {
  return (
    <ServicePage
      title="Domain Expiration Protection"
      description="Never lose your domain with automatic renewal protection and extended grace periods."
      ctaTitle="Protect Your Domains Now"
      ctaDescription="Don't risk losing your valuable domains. Add expiration protection today."
      ctaButtonText="Add Expiration Protection"
      ctaButtonLink="/domain-search"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why You Need Expiration Protection</h2>
            <p className="text-gray-600 mb-4">
              Domain names can expire if not renewed on time, potentially leading to loss of your 
              online identity, website downtime, and damage to your brand. Our Domain Expiration Protection 
              service ensures your domains are automatically renewed, even if there are payment issues or 
              you forget to renew manually.
            </p>
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Key Benefits:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Automatic domain renewal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Extended grace period (up to 30 additional days)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Multiple renewal attempt system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority renewal status</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Early expiration notifications</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Card className="p-6 overflow-hidden">
            <div className="bg-domainGray -mx-6 -mt-6 px-6 py-4 border-b mb-6">
              <h3 className="text-xl font-bold">Expiration Timeline Comparison</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                  Without Expiration Protection
                </h4>
                <div className="bg-gray-100 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Expiration Day:</span>
                      <span className="text-gray-600">Domain becomes inactive</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Days 1-30:</span>
                      <span className="text-gray-600">Standard grace period with renewal fee</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Days 31-60:</span>
                      <span className="text-gray-600">Redemption period with high fees ($80+)</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">After Day 60:</span>
                      <span className="text-red-500 font-medium">Domain available to public</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  With Expiration Protection
                </h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Pre-Expiration:</span>
                      <span className="text-gray-600">Multiple renewal attempts</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Expiration Day:</span>
                      <span className="text-gray-600">Domain remains active</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Extended Period:</span>
                      <span className="text-gray-600">Additional 30 days grace period</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium text-gray-700 w-32">Renewal Fee:</span>
                      <span className="text-green-500 font-medium">Standard renewal rate (no extra fees)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Expiration Protection Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Standard Protection</h3>
                  <p className="text-gray-600">For individual domains</p>
                </div>
                <div className="bg-amber-100 text-amber-600 py-1 px-3 rounded-full text-sm font-medium">
                  Popular
                </div>
              </div>
              
              <p className="text-3xl font-bold text-domainBlue mb-4">$2.99<span className="text-base font-normal text-gray-500">/domain/yr</span></p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Automatic renewal attempts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">15-day extended grace period</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Standard renewal rates</span>
                </li>
              </ul>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Add to Cart
              </Button>
            </Card>
            
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Portfolio Protection</h3>
                  <p className="text-gray-600">For multiple domains</p>
                </div>
                <div className="bg-blue-100 text-domainBlue py-1 px-3 rounded-full text-sm font-medium">
                  Best Value
                </div>
              </div>
              
              <p className="text-3xl font-bold text-domainBlue mb-4">$1.99<span className="text-base font-normal text-gray-500">/domain/yr</span></p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Multiple automatic renewal attempts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">30-day extended grace period</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email and SMS notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority renewal status</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Discounted renewal rates</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mb-4">
                Minimum 5 domains required. Price shown per domain.
              </p>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Add to Cart
              </Button>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-red-50 p-8 rounded-lg">
          <div className="flex items-start">
            <div className="bg-red-100 text-red-500 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold mb-2">The Cost of Domain Expiration</h2>
              <p className="text-gray-700 mb-4">
                Letting a domain expire can lead to serious consequences beyond just losing the domain:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Website and email downtime, leading to lost business</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Damage to SEO rankings and online visibility</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Competitors or domain squatters may register your domain</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">High redemption fees ($80-$200) to recover expired domains</span>
                </li>
              </ul>
              <Button className="bg-domainBlue hover:bg-domainBlue-dark">
                Protect Your Domains
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default Expiration;
