
import { useState } from 'react';
import ServicePage from '@/components/ServicePage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Search } from 'lucide-react';

const Whois = () => {
  const [domain, setDomain] = useState('');
  const [searched, setSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };
  
  return (
    <ServicePage
      title="WHOIS Lookup"
      description="Check domain ownership information and registration details."
      ctaTitle="Want to Keep Your Information Private?"
      ctaDescription="Protect your personal information with our Domain Privacy service."
      ctaButtonText="Learn About Domain Privacy"
      ctaButtonLink="/privacy"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">WHOIS Lookup Tool</h2>
          
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter a domain name (e.g., example.com)"
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-domainBlue hover:bg-domainBlue-dark">
                <Search className="mr-2 h-4 w-4" />
                <span>Lookup</span>
              </Button>
            </div>
          </form>
          
          {searched && (
            <div className="mt-8 p-6 border rounded-lg bg-gray-50">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-domainBlue" />
                <h3 className="ml-2 text-xl font-semibold">WHOIS Information for {domain}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Domain Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-gray-500">Domain Name:</span>
                      <span className="ml-2">{domain}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Registry Domain ID:</span>
                      <span className="ml-2">D123456789-COM</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Creation Date:</span>
                      <span className="ml-2">2020-06-15</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Updated Date:</span>
                      <span className="ml-2">2023-05-22</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Expiration Date:</span>
                      <span className="ml-2">2025-06-15</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Domain Status:</span>
                      <span className="ml-2">clientTransferProhibited</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Registrar Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-gray-500">Registrar:</span>
                      <span className="ml-2">Example Registrar, LLC</span>
                    </div>
                    <div>
                      <span className="text-gray-500">IANA ID:</span>
                      <span className="ml-2">123456</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Abuse Contact Email:</span>
                      <span className="ml-2">abuse@example-registrar.com</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Abuse Contact Phone:</span>
                      <span className="ml-2">+1.5555555555</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Registrant Information</h4>
                  <p className="text-gray-600 mt-2">
                    *** Registrant information is protected by Domain Privacy Service ***
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700">Name Servers</h4>
                  <div className="mt-2">
                    <div><span className="text-gray-500">NS1:</span> <span className="ml-2">ns1.examplehost.com</span></div>
                    <div><span className="text-gray-500">NS2:</span> <span className="ml-2">ns2.examplehost.com</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">What is WHOIS?</h2>
          <p className="text-gray-600 mb-4">
            WHOIS is a query and response protocol that is widely used for querying databases that store the registered users or assignees of an Internet resource, such as a domain name, an IP address block, or an autonomous system.
          </p>
          <p className="text-gray-600 mb-4">
            The WHOIS lookup provides information such as the domain registrar, registration dates, expiration date, contact information for the registrant, administrative and technical contacts, and nameservers.
          </p>
          <p className="text-gray-600">
            Many domain registrants choose to keep their information private by using domain privacy protection services.
          </p>
        </div>
      </div>
    </ServicePage>
  );
};

export default Whois;
