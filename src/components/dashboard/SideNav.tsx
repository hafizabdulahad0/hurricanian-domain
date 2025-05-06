
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Star, 
  History, 
  User, 
  Settings, 
  Clock, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const SideNav = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <User className="h-5 w-5" />
    },
    {
      title: 'Domain Searches',
      href: '/dashboard/searches',
      icon: <Search className="h-5 w-5" />
    },
    {
      title: 'Saved Domains',
      href: '/dashboard/saved',
      icon: <Star className="h-5 w-5" />
    },
    {
      title: 'Recent Activity',
      href: '/dashboard/activity',
      icon: <History className="h-5 w-5" />
    },
    {
      title: 'Domain Expiry',
      href: '/dashboard/expiry',
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: 'Account Settings',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />
    },
    {
      title: 'Support',
      href: '/dashboard/support',
      icon: <HelpCircle className="h-5 w-5" />
    },
  ];
  
  return (
    <div className="flex flex-col h-full space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Account</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive(item.href) ? "bg-accent text-accent-foreground" : "transparent"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="px-3 py-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
