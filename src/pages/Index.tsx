import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import DomainSearch from '@/components/sections/DomainSearch';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import ServiceCard from '@/components/ui/ServiceCard';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = "Hurricanian Domains - Find Your Perfect Domain";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <Hero />

      {/* Domain Search Section */}
      <DomainSearch />

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
              icon="link-2"
              link="/transfer"
            />
            <ServiceCard
              title="WHOIS Lookup"
              description="Look up domain ownership and registration information."
              icon="search"
              link="/whois"
            />
            <ServiceCard
              title="Domain Auction"
              description="Bid on premium domain names or list your own domains for auction."
              icon="gavel"
              link="/domain-auction"
            />
            <ServiceCard
              title="Premium Domains"
              description="Discover high-quality premium domain names for your business."
              icon="star"
              link="/premium"
            />
            <ServiceCard
              title="Web Hosting"
              description="Reliable web hosting services for your websites."
              icon="server"
              link="/hosting"
            />
            <ServiceCard
              title="Domain AI"
              description="Use our AI to discover the perfect domain name for your business."
              icon="zap"
              link="/domain-ai"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <FinalCTA />
    </Layout>
  );
};

export default Index;
