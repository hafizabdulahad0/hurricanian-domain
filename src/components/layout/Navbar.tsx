
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun, Github, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          // Create a simple check to determine if the user is an admin
          // This is a placeholder until we have a proper admin_users table
          const isUserAdmin = user.email?.endsWith('@admin.com') || false;
          setIsAdmin(isUserAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      }
    };
    
    if (user) {
      checkAdminStatus();
    }
  }, [user]);
  
  return (
    <header className="border-b">
      <div className="bg-secondary py-2 text-center text-secondary-foreground text-sm">
        Free WHOIS Lookup | Starting at $9.99 .com
      </div>
      
      <div className="py-4 border-t">
        <div className="domain-container">
          <nav className="flex flex-wrap justify-center lg:justify-between items-center gap-y-2">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/domain-search" className="hover:text-purpleTheme-primary transition">
                Domain Search
              </Link>
              <Link to="/domain-auction" className="hover:text-purpleTheme-primary transition">
                Domain Auction
              </Link>
              <Link to="/transfer" className="hover:text-purpleTheme-primary transition">
                Domain Transfer
              </Link>
              <Link to="/whois" className="hover:text-purpleTheme-primary transition">
                WHOIS Lookup
              </Link>
              <Link to="/hosting" className="hover:text-purpleTheme-primary transition">
                Web Hosting
              </Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-purpleTheme-primary transition">
                  Admin Dashboard
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purpleTheme-primary text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Button variant="ghost" size="icon" onClick={() => window.open('https://github.com/sadmann7/domain', '_blank')}>
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url as string} />
                      <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a href="https://github.com/sadmann7/domain/issues" target="_blank">Report a bug</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
