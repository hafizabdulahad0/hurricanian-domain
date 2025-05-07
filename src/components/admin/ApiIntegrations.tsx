import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, AlertTriangle, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface APIConfig {
  id: string;
  provider: string;
  api_key: string;
  api_secret?: string;
  integration_status: 'active' | 'inactive' | 'error';
  last_checked?: string;
  settings?: Record<string, any>;
}

const ApiIntegrations = () => {
  const [apiConfigs, setApiConfigs] = useState<APIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('domain');
  const { toast } = useToast();
  
  // Load API configurations on component mount
  useEffect(() => {
    fetchApiConfigs();
  }, []);
  
  const fetchApiConfigs = async () => {
    setLoading(true);
    try {
      // Mock API data instead of calling Supabase
      const mockData: APIConfig[] = [
        {
          id: '1',
          provider: 'godaddy',
          api_key: '********',
          api_secret: '********',
          integration_status: 'active',
          last_checked: new Date().toISOString(),
          settings: {}
        },
        {
          id: '2',
          provider: 'namecheap',
          api_key: '********',
          api_secret: '********',
          integration_status: 'inactive',
          settings: {}
        },
        {
          id: '3',
          provider: 'resellerclub',
          api_key: '',
          api_secret: '',
          integration_status: 'inactive',
          settings: {}
        }
      ];
      
      setApiConfigs(mockData);
    } catch (error: any) {
      console.error('Error fetching API configs:', error);
      toast({
        title: 'Error loading configurations',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveConfig = async (provider: string, formData: any) => {
    setSaving(true);
    try {
      // Mock save operation
      setTimeout(() => {
        const existingConfig = apiConfigs.find(config => config.provider === provider);
        
        if (existingConfig) {
          // Update existing config in local state
          setApiConfigs(prev => prev.map(config => 
            config.provider === provider 
              ? {
                  ...config,
                  api_key: formData.api_key,
                  api_secret: formData.api_secret,
                  integration_status: 'active',
                  last_checked: new Date().toISOString(),
                }
              : config
          ));
        } else {
          // Add new config to local state
          const newConfig: APIConfig = {
            id: Date.now().toString(),
            provider,
            api_key: formData.api_key,
            api_secret: formData.api_secret,
            integration_status: 'active',
            last_checked: new Date().toISOString(),
            settings: {}
          };
          setApiConfigs(prev => [...prev, newConfig]);
        }
        
        toast({
          title: 'Configuration saved',
          description: `${provider} API credentials have been updated successfully.`,
        });
        
        setSaving(false);
      }, 1000);
    } catch (error: any) {
      console.error('Error saving API config:', error);
      toast({
        title: 'Error saving configuration',
        description: error.message,
        variant: 'destructive',
      });
      setSaving(false);
    }
  };
  
  const testApiConnection = async (providerId: string) => {
    // In a real implementation, you would call an endpoint to test the connection
    // For now, we'll just simulate a successful test
    toast({
      title: 'Connection successful',
      description: `API connection tested successfully.`,
    });
  };
  
  const DomainRegistrarsTab = () => {
    const godaddyForm = useForm({
      defaultValues: {
        api_key: apiConfigs.find(c => c.provider === 'godaddy')?.api_key || '',
        api_secret: apiConfigs.find(c => c.provider === 'godaddy')?.api_secret || '',
      }
    });
    
    const namecheapForm = useForm({
      defaultValues: {
        api_key: apiConfigs.find(c => c.provider === 'namecheap')?.api_key || '',
        api_secret: apiConfigs.find(c => c.provider === 'namecheap')?.api_secret || '',
      }
    });
    
    const resellerclubForm = useForm({
      defaultValues: {
        api_key: apiConfigs.find(c => c.provider === 'resellerclub')?.api_key || '',
        api_secret: apiConfigs.find(c => c.provider === 'resellerclub')?.api_secret || '',
      }
    });
    
    return (
      <div className="space-y-8">
        {/* GoDaddy */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>GoDaddy</CardTitle>
                <CardDescription>Connect to GoDaddy Reseller API</CardDescription>
              </div>
              {apiConfigs.find(c => c.provider === 'godaddy')?.integration_status === 'active' ? (
                <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Connected</Badge>
              ) : (
                <Badge variant="outline">Not Connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...godaddyForm}>
              <form onSubmit={godaddyForm.handleSubmit((data) => handleSaveConfig('godaddy', data))} className="space-y-4">
                <FormField
                  control={godaddyForm.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your GoDaddy API Key" {...field} />
                      </FormControl>
                      <FormDescription>
                        Find this in your GoDaddy developer account
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={godaddyForm.control}
                  name="api_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Secret</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your GoDaddy API Secret" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  {apiConfigs.find(c => c.provider === 'godaddy') && (
                    <Button type="button" variant="outline" onClick={() => testApiConnection('godaddy')}>
                      Test Connection
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Namecheap */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Namecheap</CardTitle>
                <CardDescription>Connect to Namecheap Reseller API</CardDescription>
              </div>
              {apiConfigs.find(c => c.provider === 'namecheap')?.integration_status === 'active' ? (
                <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Connected</Badge>
              ) : (
                <Badge variant="outline">Not Connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...namecheapForm}>
              <form onSubmit={namecheapForm.handleSubmit((data) => handleSaveConfig('namecheap', data))} className="space-y-4">
                <FormField
                  control={namecheapForm.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Namecheap API Key" {...field} />
                      </FormControl>
                      <FormDescription>
                        Find this in your Namecheap account settings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={namecheapForm.control}
                  name="api_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Namecheap API Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  {apiConfigs.find(c => c.provider === 'namecheap') && (
                    <Button type="button" variant="outline" onClick={() => testApiConnection('namecheap')}>
                      Test Connection
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* ResellerClub */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>ResellerClub</CardTitle>
                <CardDescription>Connect to ResellerClub API</CardDescription>
              </div>
              {apiConfigs.find(c => c.provider === 'resellerclub')?.integration_status === 'active' ? (
                <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Connected</Badge>
              ) : (
                <Badge variant="outline">Not Connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...resellerclubForm}>
              <form onSubmit={resellerclubForm.handleSubmit((data) => handleSaveConfig('resellerclub', data))} className="space-y-4">
                <FormField
                  control={resellerclubForm.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reseller ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your ResellerClub Reseller ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your ResellerClub reseller identification
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={resellerclubForm.control}
                  name="api_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your ResellerClub API Key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  {apiConfigs.find(c => c.provider === 'resellerclub') && (
                    <Button type="button" variant="outline" onClick={() => testApiConnection('resellerclub')}>
                      Test Connection
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const PaymentGatewaysTab = () => {
    const jazzCashForm = useForm({
      defaultValues: {
        api_key: apiConfigs.find(c => c.provider === 'jazzcash')?.api_key || '',
        api_secret: apiConfigs.find(c => c.provider === 'jazzcash')?.api_secret || '',
      }
    });
    
    const easyPaisaForm = useForm({
      defaultValues: {
        api_key: apiConfigs.find(c => c.provider === 'easypaisa')?.api_key || '',
        api_secret: apiConfigs.find(c => c.provider === 'easypaisa')?.api_secret || '',
      }
    });
    
    return (
      <div className="space-y-8">
        {/* JazzCash */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>JazzCash</CardTitle>
                <CardDescription>Configure JazzCash Payment Gateway</CardDescription>
              </div>
              {apiConfigs.find(c => c.provider === 'jazzcash')?.integration_status === 'active' ? (
                <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Connected</Badge>
              ) : (
                <Badge variant="outline">Not Connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...jazzCashForm}>
              <form onSubmit={jazzCashForm.handleSubmit((data) => handleSaveConfig('jazzcash', data))} className="space-y-4">
                <FormField
                  control={jazzCashForm.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your JazzCash Merchant ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your JazzCash merchant identification
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={jazzCashForm.control}
                  name="api_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Integrity Salt</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your JazzCash Integrity Salt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  {apiConfigs.find(c => c.provider === 'jazzcash') && (
                    <Button type="button" variant="outline" onClick={() => testApiConnection('jazzcash')}>
                      Test Connection
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* EasyPaisa */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>EasyPaisa</CardTitle>
                <CardDescription>Configure EasyPaisa Payment Gateway</CardDescription>
              </div>
              {apiConfigs.find(c => c.provider === 'easypaisa')?.integration_status === 'active' ? (
                <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Connected</Badge>
              ) : (
                <Badge variant="outline">Not Connected</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Form {...easyPaisaForm}>
              <form onSubmit={easyPaisaForm.handleSubmit((data) => handleSaveConfig('easypaisa', data))} className="space-y-4">
                <FormField
                  control={easyPaisaForm.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merchant ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your EasyPaisa Merchant ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your EasyPaisa merchant identification
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={easyPaisaForm.control}
                  name="api_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Integrity Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your EasyPaisa Integrity Key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Configuration'}
                  </Button>
                  {apiConfigs.find(c => c.provider === 'easypaisa') && (
                    <Button type="button" variant="outline" onClick={() => testApiConnection('easypaisa')}>
                      Test Connection
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading API configurations...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">API Integrations</h2>
        <Button variant="outline" onClick={fetchApiConfigs}>Refresh</Button>
      </div>
      
      <Tabs defaultValue="domain" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="domain">Domain Registrars</TabsTrigger>
          <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
          <TabsTrigger value="hosting">Hosting Providers</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="domain">
            <DomainRegistrarsTab />
          </TabsContent>
          
          <TabsContent value="payment">
            <PaymentGatewaysTab />
          </TabsContent>
          
          <TabsContent value="hosting">
            <div className="text-center py-8 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">Hosting provider integrations coming soon...</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ApiIntegrations;
