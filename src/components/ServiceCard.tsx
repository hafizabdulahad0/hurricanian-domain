
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
  color = 'bg-domainBlue' 
}: ServiceCardProps) => {
  return (
    <Link
      to={link}
      className="group block p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition duration-300 ease-in-out hover:shadow-md"
    >
      <div className={`${color} text-white p-3 rounded-full inline-flex items-center justify-center w-12 h-12 mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-domainBlue transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-gray-600">
        {description}
      </p>
      <div className="mt-4 text-domainBlue font-medium group-hover:underline">
        Learn more
      </div>
    </Link>
  );
};

export default ServiceCard;
