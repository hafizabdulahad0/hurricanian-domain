
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
