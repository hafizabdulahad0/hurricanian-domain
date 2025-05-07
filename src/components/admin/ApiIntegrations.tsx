
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type APIConfig = {
  id: string;
  provider: string;
  api_key: string;
  integration_status: string | null;
  created_at: string;
  updated_at: string;
};

const ApiIntegrations = () => {
  const [configs, setConfigs] = useState<APIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchApiConfigs();
  }, []);
  
  const fetchApiConfigs = async () => {
    setLoading(true);
    try {
      // Use 'any' to bypass TypeScript errors since the database schema is not reflected in the types
      const { data, error } = await (supabase
        .from('api_configurations')
        .select('*') as any);
        
      if (error) throw error;
      
      // Type-cast the data to match our expected type
      setConfigs(data as APIConfig[]);
    } catch (error: any) {
      console.error('Error fetching API configurations:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load API configurations',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddConfig = async () => {
    if (!provider || !apiKey) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both provider name and API key',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSaving(true);
    try {
      // Use 'any' to bypass TypeScript errors
      const { data, error } = await (supabase
        .from('api_configurations')
        .insert({
          provider,
          api_key: apiKey,
          integration_status: 'active'
        }) as any);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `${provider} API integration added successfully`,
        variant: 'default'
      });
      
      fetchApiConfigs();
      setProvider('');
      setApiKey('');
      setIsAdding(false);
    } catch (error: any) {
      console.error('Error adding API configuration:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add API configuration',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleRemoveConfig = async (id: string) => {
    try {
      // Use 'any' to bypass TypeScript errors
      const { error } = await (supabase
        .from('api_configurations')
        .delete()
        .eq('id', id) as any);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'API integration removed successfully',
        variant: 'default'
      });
      
      fetchApiConfigs();
    } catch (error: any) {
      console.error('Error removing API configuration:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove API configuration',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">API Integrations</h2>
        {!isAdding && (
          <Button 
            variant="outline" 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Integration
          </Button>
        )}
      </div>
      
      {isAdding && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider Name</Label>
              <Input 
                id="provider"
                placeholder="e.g. Namecheap, Cloudflare, etc."
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input 
                id="api-key"
                type="password"
                placeholder="Enter API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setProvider('');
                  setApiKey('');
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddConfig}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Integration'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading API integrations...</p>
        </div>
      ) : configs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No API integrations found</p>
          <p className="text-sm text-muted-foreground">Add domain registrars and hosting providers to enable automatic domain management.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {configs.map((config) => (
            <Card key={config.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{config.provider}</h3>
                      <Badge variant={config.integration_status === 'active' ? 'default' : 'warning'}>
                        {config.integration_status === 'active' ? (
                          <><Check className="h-3 w-3 mr-1" /> Active</>
                        ) : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      API Key: •••••••••{config.api_key.slice(-4)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Added on {new Date(config.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveConfig(config.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiIntegrations;
