
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Star, ArrowRight, Clock, FileText } from 'lucide-react';

interface UserProfile {
  username: string;
  full_name: string;
  avatar_url: string | null;
}

interface DashboardStats {
  recentSearches: number;
  savedDomains: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({ recentSearches: 0, savedDomains: 0 });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('username, full_name, avatar_url')
            .eq('id', user.id)
            .single();
          
          if (profileError) throw profileError;
          setProfile(profileData);
          
          // Fetch domain searches count
          const { count: searchesCount, error: searchesError } = await supabase
            .from('domain_searches')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id);
          
          if (searchesError) throw searchesError;
          
          // Fetch saved domains count
          const { count: savedCount, error: savedError } = await supabase
            .from('saved_domains')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id);
          
          if (savedError) throw savedError;
          
          setStats({
            recentSearches: searchesCount || 0,
            savedDomains: savedCount || 0
          });
        }
      } catch (error: any) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: 'Error loading data',
          description: 'Could not load your dashboard information',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {profile?.full_name || 'there'}!</h1>
          <p className="text-muted-foreground">
            Manage your domains and account from your personal dashboard
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.recentSearches}</div>
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Domains you've searched recently
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Saved Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stats.savedDomains}</div>
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Domains you've saved for later
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">0</div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Currently registered domains
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">0</div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Domains expiring in 30 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Domain Activity</CardTitle>
              <CardDescription>
                Your latest domain searches and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentSearches === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No recent activity found</p>
                  <Button asChild className="mt-4 bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                    <Link to="/domain-search">
                      Search for a domain
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Your recent domain searches will appear here.</p>
                  <Button asChild variant="outline">
                    <Link to="/dashboard/searches">
                      View All Searches
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Saved Domains */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Domains</CardTitle>
              <CardDescription>
                Domains you've saved for future reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.savedDomains === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You haven't saved any domains yet</p>
                  <Button asChild className="mt-4 bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                    <Link to="/domain-search">
                      Find domains to save
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Your saved domains will appear here.</p>
                  <Button asChild variant="outline">
                    <Link to="/dashboard/saved">
                      View All Saved Domains
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common domain management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Button asChild variant="outline" className="h-24 flex flex-col space-y-2">
                <Link to="/domain-search">
                  <Search className="h-6 w-6 mb-1" />
                  <span>Search for Domains</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col space-y-2">
                <Link to="/transfer">
                  <ArrowRight className="h-6 w-6 mb-1" />
                  <span>Transfer a Domain</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col space-y-2">
                <Link to="/whois">
                  <FileText className="h-6 w-6 mb-1" />
                  <span>WHOIS Lookup</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col space-y-2">
                <Link to="/domain-ai">
                  <div className="flex flex-col items-center">
                    <div className="mb-1 text-2xl">AI</div>
                    <span>Generate Domain Ideas</span>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
