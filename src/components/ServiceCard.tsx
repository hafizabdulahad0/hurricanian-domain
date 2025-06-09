
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color?: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  link, 
  color = 'bg-primary' 
}: ServiceCardProps) => {
  return (
    <Link
      to={link}
      className="group block p-6 bg-card text-card-foreground rounded-lg shadow-sm border border-border transition duration-300 ease-in-out hover:shadow-md hover-lift"
    >
      <div className={`${color} text-primary-foreground p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4 hover-glow`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {description}
      </p>
      <div className="mt-4 text-primary font-medium group-hover:underline">
        Learn more
      </div>
    </Link>
  );
};

export default ServiceCard;
