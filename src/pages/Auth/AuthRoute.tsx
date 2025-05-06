
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

const AuthRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-purpleTheme-primary" />
        <span className="ml-2 text-lg font-medium">Loading...</span>
      </div>
    );
  }
  
  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AuthRoute;
