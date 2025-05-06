
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import DomainSearches from './DomainSearches';
import SavedDomains from './SavedDomains';
import Settings from './Settings';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const DashboardRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-purpleTheme-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/searches" element={<DomainSearches />} />
      <Route path="/saved" element={<SavedDomains />} />
      <Route path="/settings" element={<Settings />} />
      {/* Not Found - redirect to dashboard home */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DashboardRoute;
