
import ServicePage from '@/components/ServicePage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';

const SiteLock = () => {
  return (
    <ServicePage
      title="SiteLock Security"
      description="Protect your website from malware, hackers, and cyber attacks with comprehensive security scanning and monitoring."
      ctaTitle="Don't Wait Until It's Too Late"
      ctaDescription="Secure your website with SiteLock protection before hackers find vulnerabilities."
      ctaButtonText="Protect My Website"
      ctaButtonLink="/domain-search"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Your Website Needs SiteLock</h2>
            <p className="text-gray-600 mb-4">
              Websites are constantly under attack from hackers, malware, and other cyber threats. 
              A security breach can damage your reputation, lose customer trust, and even get your 
              site blacklisted by search engines. SiteLock provides comprehensive security to protect 
              your website and business from these threats.
            </p>
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">SiteLock Benefits:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Daily malware scanning and removal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Vulnerability detection and patching</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Web Application Firewall (WAF) protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">DDoS attack prevention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 security monitoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">SiteLock trust seal for customer confidence</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg">
            <div className="flex items-start mb-6">
              <div className="bg-red-100 text-red-500 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold mb-2">Website Security Facts</h3>
                <p className="text-gray-700">
                  The threat to websites is greater than ever before.
                </p>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded shadow-sm">
                <div className="text-xl font-bold text-red-500 mb-1">30,000+</div>
                <p className="text-gray-700">Websites are hacked every day</p>
              </li>
              <li className="bg-white p-4 rounded shadow-sm">
                <div className="text-xl font-bold text-red-500 mb-1">56%</div>
                <p className="text-gray-700">Of all CMS applications have vulnerabilities</p>
              </li>
              <li className="bg-white p-4 rounded shadow-sm">
                <div className="text-xl font-bold text-red-500 mb-1">61%</div>
                <p className="text-gray-700">Of breaches target small to medium businesses</p>
              </li>
              <li className="bg-white p-4 rounded shadow-sm">
                <div className="text-xl font-bold text-red-500 mb-1">$3.92M</div>
                <p className="text-gray-700">Average cost of a data breach</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">SiteLock Security Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Basic Security</h3>
              <p className="text-gray-600 mb-4">Essential protection for small websites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$3.99<span className="text-base font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Daily malware scanning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Vulnerability detection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">SiteLock security seal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Blacklist monitoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email alerts</span>
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
              <h3 className="text-xl font-bold mb-2">Premium Security</h3>
              <p className="text-gray-600 mb-4">Advanced protection for business sites</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$9.99<span className="text-base font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Daily malware scanning & removal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced vulnerability detection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Web Application Firewall</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">SQL Injection protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Cross-site scripting protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Premium SiteLock security seal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 security monitoring</span>
                </li>
              </ul>
              <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                Add to Cart
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
              <p className="text-gray-600 mb-4">Maximum protection for e-commerce</p>
              <p className="text-3xl font-bold text-domainBlue mb-4">$24.99<span className="text-base font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">All Premium Security features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced DDoS protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Database scanning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Content Delivery Network (CDN)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Automatic malware removal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">PCI compliance scanning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority emergency support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-domainGreen mr-2 shrink-0 mt-0.5" />
                  <span className="text-gray-700">$1M cyber insurance</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">
                Add to Cart
              </Button>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-domainGray p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">How SiteLock Works</h2>
              <p className="text-gray-600 mb-4">
                SiteLock uses a combination of automated scanning, monitoring, and active protection to keep your website secure:
              </p>
              <ol className="space-y-2 list-decimal pl-5">
                <li className="text-gray-700">
                  <span className="font-semibold">Scan:</span> Regular scans check for malware, vulnerabilities, and suspicious code
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Detect:</span> Identifies security issues before they can be exploited
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Protect:</span> Firewall blocks malicious traffic before it reaches your site
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Fix:</span> Automatically removes malware and patches vulnerabilities
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Monitor:</span> Continuous monitoring for new threats and attacks
                </li>
              </ol>
            </div>
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <ShieldCheck className="h-16 w-16 text-domainBlue mx-auto mb-4" />
                <div className="font-bold text-gray-800 mb-1">SiteLock Trust Seal</div>
                <p className="text-sm text-gray-600 mb-4">
                  Show visitors your site is protected
                </p>
                <Button className="w-full bg-domainBlue hover:bg-domainBlue-dark">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicePage>
  );
};

export default SiteLock;
