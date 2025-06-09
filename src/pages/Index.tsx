
import Layout from '@/components/layout/Layout';
import DomainSearch from '@/components/DomainSearch';
import ServiceCard from '@/components/ServiceCard';
import PriceCard from '@/components/PriceCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Gift, 
  FileUp, 
  ShieldCheck, 
  Clock, 
  Briefcase, 
  Wand2, 
  FileSearch, 
  FileText, 
  Search,
  Server,
  Database,
  Cloud
} from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="domain-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Find Your Perfect Domain Name
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Secure your online identity with our simple domain registration service. 
              Over 500+ domain extensions available.
            </p>
            
            <DomainSearch />
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="font-semibold text-primary mr-2">.com</span>
                <span>$9.99/yr</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-primary mr-2">.org</span>
                <span>$12.99/yr</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-primary mr-2">.net</span>
                <span>$11.99/yr</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-primary mr-2">.io</span>
                <span>$39.99/yr</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-primary mr-2">.co</span>
                <span>$24.99/yr</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-full opacity-50 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/20 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary/20 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      </section>
      
      {/* Domain Services */}
      <section className="py-16 bg-background">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Domain Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to find, secure, and manage your perfect domain name
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Domain Search"
              description="Find available domain names for your website or business."
              icon={Search}
              link="/domain-search"
              color="bg-primary"
            />
            <ServiceCard
              title="Transfer Your Domain"
              description="Move your existing domain to our platform for better service."
              icon={ArrowRight}
              link="/transfer"
              color="bg-secondary"
            />
            <ServiceCard
              title="WHOIS Lookup"
              description="Check domain ownership information and registration details."
              icon={FileText}
              link="/whois"
              color="bg-accent"
            />
            <ServiceCard
              title="Domain Appraisal"
              description="Get an estimated value for any domain name."
              icon={FileSearch}
              link="/appraise"
              color="bg-secondary"
            />
            <ServiceCard
              title="AI Domain Generator"
              description="Let our AI find the perfect domain name for your business."
              icon={Wand2}
              link="/domain-ai"
              color="bg-primary"
            />
            <ServiceCard
              title="Domain Broker Service"
              description="We'll negotiate the purchase of premium domains on your behalf."
              icon={Briefcase}
              link="/broker"
              color="bg-accent"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-primary hover:bg-secondary button-hover">
              <Link to="/domain-search" className="text-primary-foreground">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Hosting Services */}
      <section className="py-16 bg-muted">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Web Hosting Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fast, reliable hosting for your website with 24/7 support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Shared Hosting"
              description="Affordable hosting perfect for small websites and personal blogs."
              icon={Server}
              link="/hosting"
              color="bg-primary"
            />
            <ServiceCard
              title="Cloud Hosting"
              description="Scalable resources for growing websites with variable traffic."
              icon={Cloud}
              link="/hosting"
              color="bg-secondary"
            />
            <ServiceCard
              title="Dedicated Servers"
              description="Maximum performance and control for high-traffic websites."
              icon={Database}
              link="/hosting"
              color="bg-accent"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-primary hover:bg-secondary button-hover">
              <Link to="/hosting" className="text-primary-foreground">View All Hosting Plans</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Domains */}
      <section className="py-16 bg-muted">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Domains</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our selection of premium domain names
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'techhub.com', price: '$15,000' },
              { name: 'digitalflow.io', price: '$3,500' },
              { name: 'investpro.com', price: '$8,800' },
              { name: 'cloudstore.net', price: '$4,200' },
              { name: 'aitools.org', price: '$7,500' },
              { name: 'cryptomarket.io', price: '$12,000' },
            ].map((domain, index) => (
              <div key={index} className="bg-card rounded-lg shadow p-6 hover:shadow-md transition-shadow hover-lift">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{domain.name}</h3>
                <p className="text-2xl font-bold text-primary">{domain.price}</p>
                <Button variant="outline" className="mt-4 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground button-hover">
                  Make Offer
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-primary hover:bg-secondary button-hover">
              <Link to="/premium" className="text-primary-foreground">View Premium Domains</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Domain Extensions */}
      <section className="py-16 bg-background">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Popular Domain Extensions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from hundreds of domain extensions to find the perfect fit
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { ext: '.com', price: '$9.99/yr', popular: true },
              { ext: '.net', price: '$11.99/yr', popular: false },
              { ext: '.org', price: '$12.99/yr', popular: false },
              { ext: '.io', price: '$39.99/yr', popular: true },
              { ext: '.co', price: '$24.99/yr', popular: false },
              { ext: '.tech', price: '$34.99/yr', popular: false },
              { ext: '.app', price: '$14.99/yr', popular: true },
              { ext: '.dev', price: '$15.99/yr', popular: false },
              { ext: '.ai', price: '$79.99/yr', popular: true },
              { ext: '.store', price: '$19.99/yr', popular: false },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 text-center hover-lift
                  ${item.popular ? 'border-primary bg-primary/10' : 'border-border bg-background'}
                  hover:shadow-md transition-shadow`}
              >
                <p className="text-xl font-bold text-foreground">{item.ext}</p>
                <p className={`text-sm ${item.popular ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.price}
                </p>
                {item.popular && (
                  <div className="mt-2">
                    <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-primary hover:bg-secondary button-hover">
              <Link to="/extensions" className="text-primary-foreground">View All Extensions</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Security Services */}
      <section className="py-16 bg-muted">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Protect Your Domain</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enhance your domain security with our protection services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Domain Privacy"
              description="Keep your personal information private and protected from spammers."
              icon={ShieldCheck}
              link="/privacy"
              color="bg-primary"
            />
            <ServiceCard
              title="Expiration Protection"
              description="Never lose your domain with automatic renewal protection."
              icon={Clock}
              link="/expiration"
              color="bg-secondary"
            />
            <ServiceCard
              title="SSL Certificates"
              description="Secure your website with industry-standard encryption."
              icon={ShieldCheck}
              link="/ssl"
              color="bg-accent"
            />
            <ServiceCard
              title="SiteLock Security"
              description="Protect your website from malware and cyber attacks."
              icon={ShieldCheck}
              link="/sitelock"
              color="bg-secondary"
            />
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-16 bg-background">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard
              title="Basic"
              price="$9.99"
              description="Perfect for individuals and small projects"
              features={[
                "1 Domain Registration",
                "Free Email Forwarding",
                "DNS Management",
                "24/7 Support",
                "Auto-renewal"
              ]}
              buttonText="Register Domain"
              buttonLink="/domain-search"
            />
            
            <PriceCard
              title="Professional"
              price="$14.99"
              description="Ideal for businesses and growing websites"
              features={[
                "1 Domain Registration",
                "Domain Privacy Protection",
                "Email Forwarding",
                "DNS Management",
                "24/7 Priority Support",
                "Auto-renewal"
              ]}
              popular={true}
              buttonText="Register Domain"
              buttonLink="/domain-search"
            />
            
            <PriceCard
              title="Premium"
              price="$24.99"
              description="For businesses requiring maximum protection"
              features={[
                "1 Domain Registration",
                "Domain Privacy Protection",
                "Email Forwarding",
                "DNS Management",
                "SiteLock Security Basic",
                "SSL Certificate",
                "24/7 Priority Support",
                "Auto-renewal"
              ]}
              buttonText="Register Domain"
              buttonLink="/domain-search"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="domain-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Domain?</h2>
            <p className="text-xl mb-8">
              Start your online journey today with a domain name that perfectly represents your brand.
            </p>
            <Button className="bg-primary-foreground text-primary hover:bg-secondary-foreground button-hover" size="lg">
              <Link to="/domain-search">Find Your Domain Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thousands of customers trust us with their domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Registering my domain was incredibly easy. The search tool helped me find the perfect name for my business.",
                author: "Sarah Johnson",
                role: "Entrepreneur"
              },
              {
                text: "The domain transfer process was smooth and the customer service team was very helpful. Highly recommended!",
                author: "Michael Chen",
                role: "Web Developer"
              },
              {
                text: "I love how easy it is to manage all my domains in one place. The renewal reminders have saved me more than once!",
                author: "Jessica Martinez",
                role: "Marketing Director"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-muted rounded-lg p-6 hover-lift">
                <div className="text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="inline-block h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
