
import { useState } from 'react';
import ServicePage from '@/components/ServicePage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Server, Database, Cloud, HardDrive, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Hosting = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [addedPlans, setAddedPlans] = useState<string[]>([]);

  const hostingPlans = [
    {
      id: 'shared-hosting',
      name: 'Shared Hosting',
      price: 3.99,
      period: '/month',
      description: 'Perfect for small websites and blogs',
      features: ['10 GB SSD Storage', '1 Website', 'Free SSL Certificate', 'Unlimited Bandwidth', '99.9% Uptime Guarantee', '24/7 Support'],
      icon: Server,
      popular: false
    },
    {
      id: 'premium-hosting',
      name: 'Premium Hosting',
      price: 5.99,
      period: '/month',
      description: 'Ideal for growing businesses and e-commerce',
      features: ['50 GB SSD Storage', 'Unlimited Websites', 'Free SSL Certificate', 'Unlimited Bandwidth', '99.9% Uptime Guarantee', '24/7 Priority Support', 'Free Domain for 1 Year', 'Daily Backups'],
      icon: Cloud,
      popular: true
    },
    {
      id: 'business-hosting',
      name: 'Business Hosting',
      price: 9.99,
      period: '/month',
      description: 'For high-traffic websites and applications',
      features: ['100 GB SSD Storage', 'Unlimited Websites', 'Free SSL Certificate', 'Unlimited Bandwidth', '99.9% Uptime Guarantee', '24/7 Priority Support', 'Free Domain for 1 Year', 'Daily Backups', 'Optimized for WordPress', 'Advanced Security Features'],
      icon: Database,
      popular: false
    }
  ];

  const handleAddToCart = (plan: any) => {
    addItem({
      id: `hosting-${plan.id}`,
      type: 'hosting',
      name: `${plan.name} Plan`,
      price: plan.price,
      period: 12,
      details: {
        planId: plan.id,
        features: plan.features
      }
    });
    
    setAddedPlans([...addedPlans, plan.id]);
    toast({
      title: "Plan added to cart",
      description: `${plan.name} plan has been added to your cart.`
    });

    // Reset added state after 3 seconds
    setTimeout(() => {
      setAddedPlans(prevPlans => prevPlans.filter(id => id !== plan.id));
    }, 3000);
  };

  const handleProceedToCheckout = () => {
    navigate('/cart');
  };

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
        <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-inherit">
          Select the perfect hosting package for your website needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hostingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-6 rounded-xl shadow-sm border hover-lift transition-all duration-300
                ${plan.popular ? 'border-primary ring-2 ring-primary hover:shadow-primary/25' : 'border-gray-200 hover:shadow-lg'}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground animate-scale-in">
                  Most Popular
                </Badge>
              )}
              
              <div className="mb-4 flex items-center">
                <div className={`${plan.popular ? 'bg-primary' : 'bg-gray-100'} p-3 rounded-full mr-4 hover-glow`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <h3 className="text-xl font-bold text-inherit">{plan.name}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold text-inherit">${plan.price}</span>
                  <span className="ml-1 text-inherit">{plan.period}</span>
                </div>
              </div>
              
              <ul className="mb-8 space-y-3 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center hover-fade">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="ml-3 text-inherit">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`mt-auto flex items-center justify-center gap-2 button-hover ${
                  addedPlans.includes(plan.id) 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : plan.popular 
                      ? 'bg-primary hover:bg-accent' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`} 
                onClick={() => handleAddToCart(plan)}
              >
                {addedPlans.includes(plan.id) ? (
                  <>Added to Cart</>
                ) : (
                  <>Get Started</>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleProceedToCheckout} 
            className="bg-primary hover:bg-accent flex items-center gap-2 button-hover"
          >
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </Button>
        </div>
      </div>
      
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">Hosting Features</h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-inherit">
          All our hosting plans include these powerful features
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow hover-lift">
            <div className="bg-blue-100 text-primary p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow">
              <HardDrive className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-inherit">SSD Storage</h3>
            <p className="text-gray-600">
              Lightning-fast SSD storage for improved website performance and loading speeds.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow hover-lift">
            <div className="bg-green-100 text-secondary p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-inherit">99.9% Uptime</h3>
            <p className="text-gray-600">
              We guarantee 99.9% uptime for your website with our reliable server infrastructure.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow hover-lift">
            <div className="bg-purple-100 text-accent p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-inherit">Daily Backups</h3>
            <p className="text-gray-600">
              Automatic daily backups to keep your website data safe and secure.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow hover-lift">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-inherit">One-Click Installs</h3>
            <p className="text-gray-600">
              Easily install popular applications like WordPress, Joomla, and more with just one click.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow hover-lift">
            <div className="bg-red-100 text-red-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow">
              <Cloud className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-inherit">Free Migrations</h3>
            <p className="text-gray-600">
              We'll help you migrate your existing website to our hosting platform for free.
            </p>
          </Card>
          
          <Card className="p-6 border border-gray-100 hover:shadow-md transition-shadow hover-lift">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-inherit">24/7 Support</h3>
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
