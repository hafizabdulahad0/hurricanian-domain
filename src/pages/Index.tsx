
import Layout from '@/components/layout/Layout';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Link2, Star, Server, Zap, Tag, Gavel } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    document.title = "Hurricanian Domains - Find Your Perfect Domain";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="domain-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purpleTheme-secondary to-purpleTheme-primary">
              Secure Your Online Identity Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Find the perfect domain name for your business, brand, or idea
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/domain-search">Search Domains</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/transfer">Transfer Domain</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Search Section */}
      <section className="py-16 bg-card">
        <div className="domain-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Find Your Perfect Domain Name</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search for available domain names and register them instantly
            </p>
          </div>
          
          <div className="w-full max-w-3xl mx-auto">
            <form className="relative">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Find your perfect domain name"
                  className="flex h-14 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 text-base"
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none bg-purpleTheme-primary hover:bg-purpleTheme-secondary px-4 h-14"
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to register, manage, and protect your domain names with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Domain Transfer"
              description="Transfer your domains to us and enjoy our premium services."
              icon={Link2}
              link="/transfer"
            />
            <ServiceCard
              title="WHOIS Lookup"
              description="Look up domain ownership and registration information."
              icon={Search}
              link="/whois"
            />
            <ServiceCard
              title="Domain Auction"
              description="Bid on premium domain names or list your own domains for auction."
              icon={Gavel}
              link="/domain-auction"
            />
            <ServiceCard
              title="Premium Domains"
              description="Discover high-quality premium domain names for your business."
              icon={Star}
              link="/premium"
            />
            <ServiceCard
              title="Web Hosting"
              description="Reliable web hosting services for your websites."
              icon={Server}
              link="/hosting"
            />
            <ServiceCard
              title="Domain AI"
              description="Use our AI to discover the perfect domain name for your business."
              icon={Zap}
              link="/domain-ai"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide top-notch domain registration and management services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Competitive Pricing</h3>
              <p className="text-muted-foreground">Our domain names are priced competitively with no hidden fees.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">Our support team is available 24/7 to help you with any issues.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Free Privacy Protection</h3>
              <p className="text-muted-foreground">We include privacy protection with all domain registrations at no extra cost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it, see what our customers have to say
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <p className="italic mb-4">"I've been using Hurricanian Domains for years and they never disappoint. Great service!"</p>
              <p className="font-semibold">- John D.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <p className="italic mb-4">"The best domain registration service I've ever used. Simple, fast, and affordable."</p>
              <p className="font-semibold">- Sarah M.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm border">
              <p className="italic mb-4">"Their customer support is outstanding. They helped me transfer my domains quickly."</p>
              <p className="font-semibold">- Michael K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="domain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">How do I register a domain name?</h3>
                <p className="text-muted-foreground">Simply search for your desired domain, add it to your cart, and complete the checkout process.</p>
              </div>
              <div className="p-4 bg-card rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Can I transfer my domain from another registrar?</h3>
                <p className="text-muted-foreground">Yes, you can easily transfer your domain to us from any other registrar.</p>
              </div>
              <div className="p-4 bg-card rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Do you offer domain privacy protection?</h3>
                <p className="text-muted-foreground">Yes, we offer free privacy protection with all domain registrations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-purpleTheme-primary text-white">
        <div className="domain-container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Register your domain name today and take the first step in establishing your online presence.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/domain-search">Find Your Domain</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
