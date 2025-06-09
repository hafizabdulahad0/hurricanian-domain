import { useState } from 'react';
import ServicePage from '@/components/ServicePage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';
const Transfer = () => {
  const [domain, setDomain] = useState('');
  return <ServicePage title="Transfer Your Domain" description="Move your existing domain to our platform for better service and management." ctaTitle="Ready to Transfer?" ctaDescription="Our support team is here to help you every step of the way." ctaButtonText="Start Transfer" ctaButtonLink="/domain-search">
      <div className="max-w-3xl mx-auto">
        <div className="p-8 rounded-lg shadow-sm border border-gray-100 mb-12 bg-inherit">
          <h2 className="text-2xl font-bold mb-6">Enter your domain name</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="yourdomain.com" className="flex-1" />
            <Button className="bg-domainBlue hover:bg-domainBlue-dark">
              Check Transferability
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Before starting the transfer process, please ensure:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Your domain is unlocked at your current registrar</li>
              <li>You have the authorization/EPP code from your current registrar</li>
              <li>Your domain was registered or transferred more than 60 days ago</li>
              <li>Your contact information is up to date</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-start">
              <div className="bg-domainBlue text-white p-3 rounded-full">
                <ArrowRight className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg mb-2">Easy 5-Step Process</h3>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Enter your domain above</li>
                  <li>2. Confirm eligibility and pricing</li>
                  <li>3. Complete purchase</li>
                  <li>4. Provide authorization code</li>
                  <li>5. Approve transfer email</li>
                </ol>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start">
              <div className="bg-domainGreen text-white p-3 rounded-full">
                <Check className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg mb-2">Benefits of Transferring</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Competitive pricing and renewal rates</li>
                  <li>• Free 1-year extension on transfer</li>
                  <li>• User-friendly dashboard</li>
                  <li>• Premium 24/7 support</li>
                  <li>• Advanced security features</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="p-8 rounded-lg bg-inherit">
          <h2 className="text-2xl font-bold mb-6">Bulk Domain Transfers</h2>
          <p className="text-gray-600 mb-4">
            Need to transfer multiple domains? Our bulk transfer service makes it easy to move
            all your domains at once, saving you time and effort.
          </p>
          <Button className="bg-domainBlue hover:bg-domainBlue-dark">
            Contact Bulk Transfer Team
          </Button>
        </div>
      </div>
    </ServicePage>;
};
export default Transfer;