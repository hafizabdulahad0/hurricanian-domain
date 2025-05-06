
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import SideNav from '@/components/dashboard/SideNav';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-purpleTheme-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile, shown on larger screens */}
        <div className="hidden md:block w-64 border-r">
          <SideNav />
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="container py-6">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
