
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Check, X, Loader2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DomainSearch {
  id: string;
  domain_name: string;
  extension: string;
  search_date: string;
  available: boolean;
}

const DomainSearches = () => {
  const { user } = useAuth();
  const [searches, setSearches] = useState<DomainSearch[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSearches = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('domain_searches')
            .select('*')
            .eq('user_id', user.id)
            .order('search_date', { ascending: false })
            .limit(20);
          
          if (error) throw error;
          setSearches(data || []);
        }
      } catch (error: any) {
        console.error('Error fetching domain searches:', error);
        toast({
          title: 'Error',
          description: 'Could not load your domain search history',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearches();
  }, [user]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Domain Search History</h1>
            <p className="text-muted-foreground">
              View your recent domain search activity
            </p>
          </div>
          
          <Button asChild className="bg-primary hover:bg-primary/90 button-hover">
            <Link to="/domain-search">
              <Search className="mr-2 h-4 w-4" />
              Search New Domain
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Searches</CardTitle>
            <CardDescription>
              Your most recent domain name searches
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
                <span>Loading search history...</span>
              </div>
            ) : searches.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground mb-4">You haven't searched for any domains yet</p>
                <Button asChild className="bg-primary hover:bg-primary/90 button-hover">
                  <Link to="/domain-search">
                    Try searching for a domain
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">Domain Name</th>
                      <th className="py-3 px-4 text-left">Availability</th>
                      <th className="py-3 px-4 text-left">Date Searched</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searches.map((search) => (
                      <tr key={search.id} className="border-b hover-fade">
                        <td className="py-3 px-4 font-medium">
                          {search.domain_name}{search.extension}
                        </td>
                        <td className="py-3 px-4">
                          {search.available === null ? (
                            <span className="text-muted-foreground">Unknown</span>
                          ) : search.available ? (
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-green-600">Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <X className="h-4 w-4 text-red-500 mr-2" />
                              <span className="text-red-600">Taken</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(search.search_date)}
                        </td>
                        <td className="py-3 px-4">
                          <Button asChild variant="outline" size="sm" className="hover-lift">
                            <Link to={`/domain-search?domain=${search.domain_name}`}>
                              Search Again
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DomainSearches;
