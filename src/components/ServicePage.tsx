
import { ReactNode } from 'react';
import Layout from './layout/Layout';
import { Button } from '@/components/ui/button';

interface ServicePageProps {
  title: string;
  description: string;
  children: ReactNode;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

const ServicePage = ({
  title,
  description,
  children,
  ctaTitle = "Ready to Get Started?",
  ctaDescription = "Secure your online presence today with our domain services.",
  ctaButtonText = "Get Started",
  ctaButtonLink = "/domain-search",
}: ServicePageProps) => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-purpleTheme-primary/10 to-background py-16">
        <div className="domain-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Page Content */}
      <section className="py-16">
        <div className="domain-container">
          {children}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-purpleTheme-primary text-white">
        <div className="domain-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{ctaTitle}</h2>
            <p className="text-xl mb-8">
              {ctaDescription}
            </p>
            <Button className="bg-white text-purpleTheme-primary hover:bg-gray-100 hover:text-purpleTheme-secondary" size="lg" asChild>
              <a href={ctaButtonLink}>{ctaButtonText}</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePage;
