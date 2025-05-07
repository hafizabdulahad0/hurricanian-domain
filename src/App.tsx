import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth and Dashboard routes
import AuthRoute from "./pages/Auth/AuthRoute";
import DashboardRoute from "./pages/Dashboard/DashboardRoute";

// Create a standard service page component
import DomainSearch from "./pages/DomainSearch";
import Transfer from "./pages/Transfer";
import Whois from "./pages/Whois";
import Appraise from "./pages/Appraise";
import DomainAI from "./pages/DomainAI";
import Broker from "./pages/Broker";
import Premium from "./pages/Premium";
import FreeDomains from "./pages/FreeDomains";
import Extensions from "./pages/Extensions";
import Privacy from "./pages/Privacy";
import Expiration from "./pages/Expiration";
import SSL from "./pages/SSL";
import SiteLock from "./pages/SiteLock";
import Hosting from "./pages/Hosting";
import ApiIntegration from "./pages/ApiIntegration";
import Admin from "./pages/Admin";
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminDashboard from './pages/AdminDashboard';
import DomainAuction from './pages/DomainAuction';

const queryClient = new QueryClient();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Check local storage or system preference for theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on storage or system preference
    if (savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/domain-search" element={<DomainSearch />} />
                  <Route path="/transfer" element={<Transfer />} />
                  <Route path="/whois" element={<Whois />} />
                  <Route path="/appraise" element={<Appraise />} />
                  <Route path="/domain-ai" element={<DomainAI />} />
                  <Route path="/broker" element={<Broker />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/free-domains" element={<FreeDomains />} />
                  <Route path="/extensions" element={<Extensions />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/expiration" element={<Expiration />} />
                  <Route path="/ssl" element={<SSL />} />
                  <Route path="/sitelock" element={<SiteLock />} />
                  <Route path="/hosting" element={<Hosting />} />
                  <Route path="/api-integration" element={<ApiIntegration />} />
                  <Route path="/admin" element={<Admin />} />
                  
                  {/* Auth routes */}
                  <Route path="/auth/*" element={<AuthRoute />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard/*" element={<DashboardRoute />} />
                  
                  {/* New routes */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/domain-auction" element={<DomainAuction />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
