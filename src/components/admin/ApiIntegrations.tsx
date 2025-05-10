
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, Check, Globe, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type APIConfig = {
  id: string;
  provider: string;
  api_key: string;
  api_type: string;
  api_secret?: string;
  integration_status: string | null;
  created_at: string;
  updated_at: string;
};

const ApiIntegrations = () => {
  const [configs, setConfigs] = useState<APIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [apiType, setApiType] = useState('domain'); // 'domain' or 'hosting'
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("domain");
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
      // Create the API configuration object
      const apiConfig: any = {
        provider,
        api_key: apiKey,
        api_type: apiType,
        integration_status: 'active'
      };
      
      // Add API secret if provided
      if (apiSecret) {
        apiConfig.api_secret = apiSecret;
      }
      
      // Use 'any' to bypass TypeScript errors
      const { data, error } = await (supabase
        .from('api_configurations')
        .insert(apiConfig) as any);
        
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: `${provider} ${apiType} API integration added successfully`,
        variant: 'default'
      });
      
      fetchApiConfigs();
      setProvider('');
      setApiKey('');
      setApiSecret('');
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

  // Filter configs based on active tab
  const filteredConfigs = configs.filter(config => 
    config.api_type === activeTab || 
    // For backward compatibility with existing records that don't have api_type
    (activeTab === 'domain' && !config.api_type)
  );
  
  // Check if we have any active integrations
  const hasActiveIntegrations = configs.some(config => config.integration_status === 'active');
  
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

      {hasActiveIntegrations && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-900/30">
          <div className="flex items-start">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">API Integration Active</h3>
              <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                Your API integration is active. Your platform is ready to sell domains and hosting services.
              </p>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="domain" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="domain" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Domain APIs
          </TabsTrigger>
          <TabsTrigger value="hosting" className="flex items-center gap-2">
            <Server className="h-4 w-4" /> Hosting APIs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="domain" className="space-y-4">
          {isAdding && activeTab === "domain" && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider Name</Label>
                  <Select onValueChange={setProvider} value={provider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain registrar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GoDaddy">GoDaddy</SelectItem>
                      <SelectItem value="Namecheap">Namecheap</SelectItem>
                      <SelectItem value="ResellerClub">ResellerClub</SelectItem>
                      <SelectItem value="NameSilo">NameSilo</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {provider === 'Other' && (
                    <Input 
                      className="mt-2" 
                      placeholder="Enter provider name" 
                      onChange={(e) => setProvider(e.target.value)}
                    />
                  )}
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
                
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret (if required)</Label>
                  <Input 
                    id="api-secret"
                    type="password"
                    placeholder="Enter API secret"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Some providers require both an API key and secret. Please refer to your provider's documentation.
                  </p>
                </div>
                
                <input type="hidden" value="domain" onChange={() => setApiType("domain")} />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAdding(false);
                      setProvider('');
                      setApiKey('');
                      setApiSecret('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      setApiType("domain");
                      handleAddConfig();
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Integration'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {renderConfigsList(filteredConfigs, loading, handleRemoveConfig)}
        </TabsContent>
        
        <TabsContent value="hosting" className="space-y-4">
          {isAdding && activeTab === "hosting" && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider">Hosting Provider</Label>
                  <Select onValueChange={setProvider} value={provider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hosting provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cPanel WHM">cPanel WHM</SelectItem>
                      <SelectItem value="Plesk">Plesk</SelectItem>
                      <SelectItem value="DirectAdmin">DirectAdmin</SelectItem>
                      <SelectItem value="HostGator">HostGator</SelectItem>
                      <SelectItem value="GoDaddy">GoDaddy Hosting</SelectItem>
                      <SelectItem value="SiteGround">SiteGround</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {provider === 'Other' && (
                    <Input 
                      className="mt-2" 
                      placeholder="Enter provider name" 
                      onChange={(e) => setProvider(e.target.value)}
                    />
                  )}
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
                
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret/Password (if required)</Label>
                  <Input 
                    id="api-secret"
                    type="password"
                    placeholder="Enter API secret or password"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hosting control panels like cPanel WHM may require additional credentials.
                  </p>
                </div>
                
                <input type="hidden" value="hosting" onChange={() => setApiType("hosting")} />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAdding(false);
                      setProvider('');
                      setApiKey('');
                      setApiSecret('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      setApiType("hosting");
                      handleAddConfig();
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Hosting Integration'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {renderConfigsList(filteredConfigs, loading, handleRemoveConfig)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Extracted list rendering function
const renderConfigsList = (configs: APIConfig[], loading: boolean, handleRemoveConfig: (id: string) => void) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading API integrations...</p>
      </div>
    );
  } 
  
  if (configs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No API integrations found</p>
        <p className="text-sm text-muted-foreground">
          Add domain registrars and hosting providers to enable automatic service management.
        </p>
      </div>
    );
  }
  
  return (
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
                  <Badge variant="outline">
                    {config.api_type === 'hosting' ? 'Hosting' : 'Domain'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  API Key: •••••••••{config.api_key.slice(-4)}
                </p>
                {config.api_secret && (
                  <p className="text-sm text-muted-foreground">
                    API Secret: •••••••••{config.api_secret.slice(-4)}
                  </p>
                )}
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
  );
};

export default ApiIntegrations;
