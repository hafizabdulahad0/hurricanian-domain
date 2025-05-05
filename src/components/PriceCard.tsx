
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
    <div className={`relative flex flex-col p-6 rounded-xl shadow-sm border ${popular ? 'border-domainBlue ring-2 ring-domainBlue' : 'border-gray-200'}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-domainBlue text-white">
          Most Popular
        </Badge>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-extrabold text-gray-900">{price}</span>
          {period && <span className="ml-1 text-gray-500">{period}</span>}
        </div>
      </div>
      
      <ul className="mb-8 space-y-3 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-domainGreen shrink-0" />
            <span className="ml-3 text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      {children}
      
      <Button
        className={`mt-auto ${popular ? 'bg-domainBlue hover:bg-domainBlue-dark' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        asChild
      >
        <a href={buttonLink}>{buttonText}</a>
      </Button>
    </div>
  );
};

export default PriceCard;
