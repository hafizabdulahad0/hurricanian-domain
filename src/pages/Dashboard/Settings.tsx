
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface ProfileData {
  username: string;
  full_name: string;
  avatar_url: string | null;
}

const AccountSettings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    username: '',
    full_name: '',
    avatar_url: null
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('username, full_name, avatar_url')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          setProfile({
            username: data.username || '',
            full_name: data.full_name || '',
            avatar_url: data.avatar_url
          });
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Could not load your profile',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) return;
    
    setUpdating(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          full_name: profile.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Could not update your profile',
        variant: 'destructive'
      });
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purpleTheme-primary" />
          <span className="ml-2 text-lg">Loading your profile...</span>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and profile information
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile details and personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    Email address cannot be changed
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
            <CardDescription>
              Manage your email preferences and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Email preferences will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
