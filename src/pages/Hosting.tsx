
import ServicePage from '@/components/ServicePage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Server, Database, Cloud, HardDrive } from 'lucide-react';

const Hosting = () => {
  const hostingPlans = [
    {
      name: 'Shared Hosting',
      price: '$3.99',
      period: '/month',
      description: 'Perfect for small websites and blogs',
      features: [
        '10 GB SSD Storage',
        '1 Website',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        '99.9% Uptime Guarantee',
        '24/7 Support'
      ],
      icon: Server,
      popular: false
    },
    {
      name: 'Premium Hosting',
      price: '$5.99',
      period: '/month',
      description: 'Ideal for growing businesses and e-commerce',
      features: [
        '50 GB SSD Storage',
        'Unlimited Websites',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        '99.9% Uptime Guarantee',
        '24/7 Priority Support',
        'Free Domain for 1 Year',
        'Daily Backups'
      ],
      icon: Cloud,
      popular: true
    },
    {
      name: 'Business Hosting',
      price: '$9.99',
      period: '/month',
      description: 'For high-traffic websites and applications',
      features: [
        '100 GB SSD Storage',
        'Unlimited Websites',
        'Free SSL Certificate',
        'Unlimited Bandwidth',
        '99.9% Uptime Guarantee',
        '24/7 Priority Support',
        'Free Domain for 1 Year',
        'Daily Backups',
        'Optimized for WordPress',
        'Advanced Security Features'
      ],
      icon: Database,
      popular: false
    }
  ];

  return (
    <ServicePage
      title="Web Hosting Services"
      description="Fast, secure, and reliable hosting solutions for your website"
      ctaTitle="Ready to Start Hosting?"
      ctaDescription="Get your website online today with our reliable hosting services."
      ctaButtonText="Choose a Plan"
      ctaButtonLink="/hosting"
    >
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your Hosting Plan</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
          Select the perfect hosting package for your website needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hostingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative flex flex-col p-6 rounded-xl shadow-sm border 
                ${plan.popular ? 'border-domainBlue ring-2 ring-domainBlue' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-domainBlue text-white">
                  Most Popular
                </Badge>
              )}
              
              <div className="mb-4 flex items-center">
                <div className={`${plan.popular ? 'bg-domainBlue' : 'bg-gray-100'} p-3 rounded-full mr-4`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-500">{plan.period}</span>
                </div>
              </div>
              
              <ul className="mb-8 space-y-3 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-domainGreen shrink-0" />
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`mt-auto ${plan.popular ? 'bg-domainBlue hover:bg-domainBlue-dark' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">Hosting Features</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
          All our hosting plans include these powerful features
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 text-domainBlue p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4">
              <HardDrive className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">SSD Storage</h3>
            <p className="text-gray-600">
              Lightning-fast SSD storage for improved website performance and loading speeds.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-green-100 text-green-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">99.9% Uptime</h3>
            <p className="text-gray-600">
              We guarantee 99.9% uptime for your website with our reliable server infrastructure.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Backups</h3>
            <p className="text-gray-600">
              Automatic daily backups to keep your website data safe and secure.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">One-Click Installs</h3>
            <p className="text-gray-600">
              Easily install popular applications like WordPress, Joomla, and more with just one click.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-red-100 text-red-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4">
              <Cloud className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Migrations</h3>
            <p className="text-gray-600">
              We'll help you migrate your existing website to our hosting platform for free.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our expert support team is available 24/7 to help with any hosting-related issues.
            </p>
          </Card>
        </div>
      </div>
    </ServicePage>
  );
};

export default Hosting;
