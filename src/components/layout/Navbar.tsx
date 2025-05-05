
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  ShieldCheck,
  Clock,
  Gift,
  Star,
  FileText,
  Briefcase,
  FileSearch,
  ArrowRight,
  FileUp,
  Wand2,
  Server,
  Cloud,
  Database,
  HardDrive
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [hostingDropdownOpen, setHostingDropdownOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="domain-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-domainBlue">DomainVerse</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-domainBlue transition-colors"
                onClick={() => setDomainDropdownOpen(!domainDropdownOpen)}
              >
                Domains <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Domain dropdown */}
              <div className={`absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${domainDropdownOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'}`}>
                <div className="py-1">
                  <Link to="/domain-search" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Search className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Domain Search</span>
                  </Link>
                  <Link to="/transfer" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <ArrowRight className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Transfer Domain</span>
                  </Link>
                  <Link to="/whois" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <FileText className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>WHOIS Lookup</span>
                  </Link>
                  <Link to="/appraise" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <FileSearch className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Domain Appraisal</span>
                  </Link>
                  <Link to="/domain-ai" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Wand2 className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>AI Domain Generator</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-domainBlue transition-colors"
                onClick={() => setHostingDropdownOpen(!hostingDropdownOpen)}
              >
                Hosting <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Hosting dropdown */}
              <div className={`absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${hostingDropdownOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'}`}>
                <div className="py-1">
                  <Link to="/hosting" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Server className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Shared Hosting</span>
                  </Link>
                  <Link to="/hosting" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Cloud className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Cloud Hosting</span>
                  </Link>
                  <Link to="/hosting" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Database className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Dedicated Servers</span>
                  </Link>
                  <Link to="/hosting" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <HardDrive className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>VPS Hosting</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-domainBlue transition-colors"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Services dropdown */}
              <div className={`absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${servicesDropdownOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'}`}>
                <div className="py-1">
                  <Link to="/broker" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Briefcase className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Domain Broker Service</span>
                  </Link>
                  <Link to="/premium" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Star className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Premium Domains</span>
                  </Link>
                  <Link to="/free-domains" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <Gift className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>Free Domains</span>
                  </Link>
                  <Link to="/extensions" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-domainGray">
                    <FileUp className="mr-3 h-5 w-5 text-domainBlue" />
                    <span>New Domain Extensions</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/privacy" className="text-gray-700 hover:text-domainBlue transition-colors">
              <div className="flex items-center">
                <ShieldCheck className="mr-1 h-4 w-4" />
                <span>Domain Privacy</span>
              </div>
            </Link>
            
            <Link to="/ssl" className="text-gray-700 hover:text-domainBlue transition-colors">
              <div className="flex items-center">
                <ShieldCheck className="mr-1 h-4 w-4" />
                <span>SSL Certificates</span>
              </div>
            </Link>
          </div>
          
          {/* Login/Signup */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline" className="border-domainBlue text-domainBlue hover:bg-domainBlue hover:text-white">Log in</Button>
            <Button className="bg-domainBlue hover:bg-domainBlue-dark">Sign up</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-domainBlue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-domainBlue"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="space-y-1">
            <button 
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md"
              onClick={() => setDomainDropdownOpen(!domainDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <span>Domains</span>
                <ChevronDown className={`h-4 w-4 transform ${domainDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {domainDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link to="/domain-search" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Domain Search
                </Link>
                <Link to="/transfer" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Transfer Domain
                </Link>
                <Link to="/whois" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  WHOIS Lookup
                </Link>
                <Link to="/appraise" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Domain Appraisal
                </Link>
                <Link to="/domain-ai" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  AI Domain Generator
                </Link>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <button 
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md"
              onClick={() => setHostingDropdownOpen(!hostingDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <span>Hosting</span>
                <ChevronDown className={`h-4 w-4 transform ${hostingDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {hostingDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link to="/hosting" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Shared Hosting
                </Link>
                <Link to="/hosting" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Cloud Hosting
                </Link>
                <Link to="/hosting" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Dedicated Servers
                </Link>
                <Link to="/hosting" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  VPS Hosting
                </Link>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <button 
              className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md"
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link to="/broker" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Domain Broker Service
                </Link>
                <Link to="/premium" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Premium Domains
                </Link>
                <Link to="/free-domains" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  Free Domains
                </Link>
                <Link to="/extensions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
                  New Domain Extensions
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/privacy" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
            Domain Privacy
          </Link>
          
          <Link to="/ssl" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
            SSL Certificates
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-domainBlue text-white flex items-center justify-center">
                <span className="text-lg font-semibold">G</span>
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Guest User</div>
              <div className="text-sm font-medium text-gray-500">guest@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-domainBlue rounded-md">
              Log in
            </button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-domainBlue hover:bg-gray-50 rounded-md">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
