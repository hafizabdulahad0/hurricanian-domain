
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PriceCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
  children?: ReactNode;
}

const PriceCard = ({
  title,
  price,
  period = '/year',
  description,
  features,
  popular = false,
  buttonText = 'Get Started',
  buttonLink = '#',
  children,
}: PriceCardProps) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-xl shadow-sm bg-card text-card-foreground ${popular ? 'border-purpleTheme-primary ring-2 ring-purpleTheme-primary' : 'border-border'}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purpleTheme-primary text-white">
          Most Popular
        </Badge>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-extrabold text-card-foreground">{price}</span>
          {period && <span className="ml-1 text-muted-foreground">{period}</span>}
        </div>
      </div>
      
      <ul className="mb-8 space-y-3 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-purpleTheme-primary shrink-0" />
            <span className="ml-3 text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      
      {children}
      
      <Button
        className={`mt-auto ${popular ? 'bg-purpleTheme-primary hover:bg-purpleTheme-secondary' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
        asChild
      >
        <a href={buttonLink}>{buttonText}</a>
      </Button>
    </div>
  );
};

export default PriceCard;
