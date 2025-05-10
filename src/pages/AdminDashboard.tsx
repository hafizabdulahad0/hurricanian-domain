
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ApiIntegrations from '@/components/admin/ApiIntegrations';
import DomainManagement from '@/components/admin/DomainManagement';
import HostingManagement from '@/components/admin/HostingManagement';
import AuctionManagement from '@/components/admin/AuctionManagement';
import UserManagement from '@/components/admin/UserManagement';
import Settings from '@/components/admin/Settings';

// Helper to check if a user is an admin
const useIsAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Since we can't directly use the typed Supabase client for admin_users table,
        // we'll use the raw query approach
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id) as any; // Using 'any' to bypass type checking

        if (error) throw error;
        setIsAdmin(!!data && data.length > 0);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('api');
  const { user } = useAuth();
  const { isAdmin, loading } = useIsAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use effect to handle redirection and toast
  useEffect(() => {
    // Only show toast and redirect if loading is complete and user is not admin
    if (!loading && (!isAdmin || !user)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [loading, isAdmin, user, toast, navigate]);

  // If still loading admin status, show loading state
  if (loading) {
    return (
      <Layout>
        <div className="domain-container py-12 flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-center">
            <p className="text-muted-foreground">Verifying admin privileges...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // If not admin or not logged in, render nothing as the redirect will happen in useEffect
  if (!isAdmin || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="domain-container py-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === 'api' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('api')}
                  >
                    API Integrations
                  </Button>
                  <Button
                    variant={activeTab === 'domains' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('domains')}
                  >
                    Domain Management
                  </Button>
                  <Button
                    variant={activeTab === 'hosting' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('hosting')}
                  >
                    Hosting Management
                  </Button>
                  <Button
                    variant={activeTab === 'auctions' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('auctions')}
                  >
                    Auction Management
                  </Button>
                  <Button
                    variant={activeTab === 'users' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('users')}
                  >
                    User Management
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="api">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>API Integrations</CardTitle>
                    <CardDescription>Configure domain and hosting API connections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApiIntegrations />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="domains">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Domain Management</CardTitle>
                    <CardDescription>Manage domain products and pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DomainManagement />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="hosting">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Hosting Management</CardTitle>
                    <CardDescription>Manage hosting plans and services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HostingManagement />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="auctions">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Auction Management</CardTitle>
                    <CardDescription>Manage domain auctions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuctionManagement />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserManagement />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Configure system settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Settings />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
