
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun, User, ShoppingCart, Search, Gavel, ArrowRightLeft, FileText, Server, Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
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

  const navigationItems = [
    { to: "/domain-search", icon: Search, label: "Domain Search" },
    { to: "/domain-auction", icon: Gavel, label: "Domain Auction" },
    { to: "/transfer", icon: ArrowRightLeft, label: "Domain Transfer" },
    { to: "/whois", icon: FileText, label: "WHOIS Lookup" },
    { to: "/hosting", icon: Server, label: "Web Hosting" },
    ...(isAdmin ? [{ to: "/admin", icon: Shield, label: "Admin Dashboard" }] : []),
  ];

  return (
    <header className="border-b">
      <div className="bg-secondary py-2 text-center text-secondary-foreground text-sm">
        Free WHOIS Lookup | Starting at $9.99 .com
      </div>
      
      <div className="py-4 border-t">
        <div className="domain-container">
          <nav className="flex justify-between items-center">
            {/* Website Logo/Name */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-300 hover-glow">
                Hurricanian Domains
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => (
                <div key={item.to} className="group relative">
                  <Link 
                    to={item.to} 
                    className="flex items-center justify-center p-2 hover:text-primary transition-all duration-300 hover-lift group"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-card text-card-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border">
                      {item.label}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Right side items */}
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative hover-lift">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 hover-lift">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="hover-fade">
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover-fade">
                    <a href="https://github.com/sadmann7/domain/issues" target="_blank">Report a bug</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="hover-fade">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover-lift"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover-lift"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 border-t pt-4 animate-slide-up">
              <div className="grid grid-cols-2 gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/10 transition-all duration-300 hover-lift"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
