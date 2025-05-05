
import ServicePage from '@/components/ServicePage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldCheck, Lock, CheckCircle, X } from 'lucide-react';

const SSL = () => {
  return (
    <ServicePage
      title="SSL Certificates"
      description="Secure your website with industry-standard encryption and build visitor trust."
      ctaTitle="Ready to Secure Your Website?"
      ctaDescription="Add an SSL certificate to your domain and show visitors that you take security seriously."
      ctaButtonText="Get SSL Protection"
      ctaButtonLink="/domain-search"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why You Need SSL</h2>
            <p className="text-gray-600 mb-4">
              SSL (Secure Sockets Layer) certificates encrypt data between your website and visitors, 
              protecting sensitive information from hackers and building customer trust. Modern browsers 
              warn users about websites without SSL, potentially driving away visitors.
            </p>
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Key Benefits:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Data encryption and protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Increased customer trust with padlock icon</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">SEO ranking boost (Google favors secure sites)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">PCI compliance for processing payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Protection from phishing attempts</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Card className="p-6 overflow-hidden">
            <div className="bg-domainGray -mx-6 -mt-6 px-6 py-4 border-b mb-6">
              <h3 className="text-xl font-bold">With vs. Without SSL</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  With SSL Certificate
                </h4>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-100 text-green-600 rounded p-1 mr-2">
                      <Lock className="h-4 w-4" />
                    </div>
                    <span className="text-gray-800 font-medium">https://www.yourdomain.com</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Secure padlock icon in browser</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Data encryption protection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">SEO ranking advantage</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Visitors feel safe and trust your site</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                  Without SSL Certificate
                </h4>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-red-100 text-red-600 rounded p-1 mr-2">
                      <X className="h-4 w-4" />
                    </div>
                    <span className="text-gray-800 font-medium">http://www.yourdomain.com</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">"Not Secure" warning in browser</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Data vulnerable to interception</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Lower search engine rankings</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Visitors may leave due to security concerns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">SSL Certificate Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Standard SSL</h3>
              <p className="text-gray-600 mb-4">Perfect for blogs and small websites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$9.99<span className="text-base font-normal text-gray-500">/yr</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Domain validation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secures single domain</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Standard 128/256-bit encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Browser padlock</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">1-year validity</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Add to Cart
              </Button>
            </Card>
            
            <Card className="p-6 border-domainBlue ring-2 ring-domainBlue relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-domainBlue text-white px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Business SSL</h3>
              <p className="text-gray-600 mb-4">Ideal for business websites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$49.99<span className="text-base font-normal text-gray-500">/yr</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Organization validation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secures www + non-www</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Strong 256-bit encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Browser padlock + company name</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">$10,000 warranty</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">1-year validity</span>
                </li>
              </ul>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Add to Cart
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Premium EV SSL</h3>
              <p className="text-gray-600 mb-4">For e-commerce and financial sites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$149.99<span className="text-base font-normal text-gray-500">/yr</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Extended validation (highest)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secures www + non-www + subdomains</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Military-grade encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Green address bar (highest trust)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">$1,000,000 warranty</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">2-year validity</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Add to Cart
              </Button>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-domainGray p-8 rounded-lg">
          <div className="flex items-start">
            <div className="bg-domainBlue text-white p-3 rounded-full">
              <Lock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold mb-2">Free SSL Installation</h2>
              <p className="text-gray-600 mb-4">
                Not sure how to install your SSL certificate? Our experts will install and 
                configure it for you at no additional cost when you purchase any SSL certificate.
              </p>
              <Button className="bg-domainBlue hover:bg-domainBlue-dark">
                Get Expert Installation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default SSL;
