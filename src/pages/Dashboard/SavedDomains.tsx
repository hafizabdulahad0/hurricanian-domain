
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2, Search, Trash2, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SavedDomain {
  id: string;
  domain_name: string;
  saved_date: string;
  notes: string | null;
}

const SavedDomains = () => {
  const { user } = useAuth();
  const [savedDomains, setSavedDomains] = useState<SavedDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDomain, setEditingDomain] = useState<SavedDomain | null>(null);
  const [notes, setNotes] = useState('');
  
  const fetchSavedDomains = async () => {
    try {
      if (user) {
        const { data, error } = await supabase
          .from('saved_domains')
          .select('*')
          .eq('user_id', user.id)
          .order('saved_date', { ascending: false });
        
        if (error) throw error;
        setSavedDomains(data || []);
      }
    } catch (error: any) {
      console.error('Error fetching saved domains:', error);
      toast({
        title: 'Error',
        description: 'Could not load your saved domains',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSavedDomains();
  }, [user]);
  
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_domains')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Remove from state
      setSavedDomains(savedDomains.filter(domain => domain.id !== id));
      
      toast({
        title: 'Domain removed',
        description: 'The domain has been removed from your saved list'
      });
    } catch (error: any) {
      console.error('Error deleting domain:', error);
      toast({
        title: 'Error',
        description: 'Could not delete the domain',
        variant: 'destructive'
      });
    }
  };
  
  const handleEdit = (domain: SavedDomain) => {
    setEditingDomain(domain);
    setNotes(domain.notes || '');
  };
  
  const saveNotes = async () => {
    if (!editingDomain) return;
    
    try {
      const { error } = await supabase
        .from('saved_domains')
        .update({ notes })
        .eq('id', editingDomain.id);
      
      if (error) throw error;
      
      // Update in state
      setSavedDomains(savedDomains.map(domain => 
        domain.id === editingDomain.id 
          ? { ...domain, notes } 
          : domain
      ));
      
      toast({
        title: 'Notes saved',
        description: 'Your notes have been updated'
      });
      
      setEditingDomain(null);
    } catch (error: any) {
      console.error('Error updating notes:', error);
      toast({
        title: 'Error',
        description: 'Could not update the notes',
        variant: 'destructive'
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Saved Domains</h1>
            <p className="text-muted-foreground">
              Manage your collection of saved domains
            </p>
          </div>
          
          <Button asChild className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
            <Link to="/domain-search">
              <Search className="mr-2 h-4 w-4" />
              Find New Domains
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Saved Domains</CardTitle>
            <CardDescription>
              Domains you've saved for future consideration
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <span>Loading saved domains...</span>
              </div>
            ) : savedDomains.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground mb-4">You haven't saved any domains yet</p>
                <Button asChild className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                  <Link to="/domain-search">
                    Find domains to save
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left">Domain Name</th>
                      <th className="py-3 px-4 text-left">Date Saved</th>
                      <th className="py-3 px-4 text-left">Notes</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedDomains.map((domain) => (
                      <tr key={domain.id} className="border-b">
                        <td className="py-3 px-4 font-medium">
                          {domain.domain_name}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(domain.saved_date)}
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate">
                          {domain.notes || <span className="text-muted-foreground italic">No notes</span>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => handleEdit(domain)}>
                                  <PenLine className="h-4 w-4" />
                                  <span className="sr-only">Edit notes</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Domain Notes</DialogTitle>
                                  <DialogDescription>
                                    Add or update notes for {domain.domain_name}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="domain">Domain</Label>
                                    <Input id="domain" value={domain.domain_name} disabled />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                      id="notes"
                                      value={notes}
                                      onChange={(e) => setNotes(e.target.value)}
                                      placeholder="Add notes about this domain..."
                                      className="min-h-[100px]"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setEditingDomain(null)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={saveNotes}
                                    className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary"
                                  >
                                    Save Notes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleDelete(domain.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
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

export default SavedDomains;
