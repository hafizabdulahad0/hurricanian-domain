
import ServicePage from '@/components/ServicePage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldCheck, EyeOff, Eye, CheckCircle, X } from 'lucide-react';

const Privacy = () => {
  return (
    <ServicePage
      title="Domain Privacy Protection"
      description="Keep your personal information private and protected from spammers, hackers, and identity thieves."
      ctaTitle="Protect Your Privacy Today"
      ctaDescription="Add domain privacy to your domains for complete protection."
      ctaButtonText="Add Privacy Protection"
      ctaButtonLink="/domain-search"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is Domain Privacy?</h2>
            <p className="text-gray-600 mb-4">
              When you register a domain, your personal information (name, address, phone number, email) becomes 
              publicly available in the WHOIS database. Domain Privacy Protection replaces your personal information 
              with our privacy service's information, keeping your details private.
            </p>
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Benefits of Domain Privacy:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Protection from identity theft</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Reduced spam and unwanted solicitations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Prevention of domain hijacking attempts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Protection from competitors analyzing your domains</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Peace of mind knowing your information is secure</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-domainGray border-b">
              <h3 className="text-xl font-bold mb-2">Without vs. With Privacy Protection</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div></div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center bg-red-100 rounded-full w-10 h-10 mb-2">
                    <Eye className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="font-semibold text-gray-900">Without Privacy</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center bg-green-100 rounded-full w-10 h-10 mb-2">
                    <EyeOff className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="font-semibold text-gray-900">With Privacy</p>
                </div>
              </div>
              
              {[
                { info: 'Name', without: 'John Smith', with: 'Privacy Protected' },
                { info: 'Address', without: '123 Main St', with: 'Privacy Protected' },
                { info: 'Phone', without: '(555) 123-4567', with: 'Privacy Protected' },
                { info: 'Email', without: 'john@example.com', with: 'Privacy Protected' }
              ].map((item, index) => (
                <div key={index} className={`grid grid-cols-3 gap-4 py-3 ${index !== 3 ? 'border-b' : ''}`}>
                  <div className="font-medium text-gray-700">{item.info}</div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <X className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-gray-600">{item.without}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-gray-600">{item.with}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Domain Privacy Protection Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Basic Privacy</h3>
              <p className="text-3xl font-bold text-domainBlue mb-4">$2.99<span className="text-base font-normal text-gray-500">/yr</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personal information masking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email forwarding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic spam filtering</span>
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
              <h3 className="text-xl font-bold mb-2">Premium Privacy</h3>
              <p className="text-3xl font-bold text-domainBlue mb-4">$4.99<span className="text-base font-normal text-gray-500">/yr</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personal information masking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email forwarding with spam protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Domain hijack alerts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Identity monitoring</span>
                </li>
              </ul>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Add to Cart
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Privacy Bundle</h3>
              <p className="text-3xl font-bold text-domainBlue mb-4">$9.99<span className="text-base font-normal text-gray-500">/yr</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Premium Privacy Protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Domain theft protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Enhanced security monitoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Domain expiration protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
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
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold mb-2">Protect All Your Domains</h2>
              <p className="text-gray-600 mb-4">
                Add privacy protection to all your domains with our bulk privacy service. 
                Get discounted rates when you protect multiple domains.
              </p>
              <Button className="bg-domainBlue hover:bg-domainBlue-dark">
                Protect Multiple Domains
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default Privacy;
