
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, RefreshCw, Server, Cloud, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Updated interface to make api_type optional and match the database schema
interface APIConfig {
  id: string;
  provider: string;
  api_key: string;
  api_type?: string | null; // Make this optional
  integration_status: string | null;
  created_at?: string; 
  updated_at?: string;
}

const HostingManagement = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [hostingApis, setHostingApis] = useState<APIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHostingApis();
  }, []);

  const fetchHostingApis = async () => {
    try {
      // Use type assertion before calling methods to avoid deep type instantiation
      const response = await (supabase
        .from('api_configurations') as any)
        .select('*')
        .eq('api_type', 'hosting');
      
      if (response.error) throw response.error;
      
      // Safely cast the result to our expected type
      const apiData = (response.data || []) as APIConfig[];
      setHostingApis(apiData);
    } catch (error: any) {
      console.error('Error fetching hosting APIs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load hosting API configurations',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHostingApis();
    setTimeout(() => setRefreshing(false), 1500);
  };

  const resellerOptions = [
    {
      name: 'cPanel WHM',
      description: 'Industry standard for hosting reselling with complete control panel',
      features: ['Easy account creation', 'White-label branding', 'Resource allocation control'],
      website: 'https://cpanel.net/products/whm/',
      type: 'Self-Managed'
    },
    {
      name: 'HostGator Reseller',
      description: 'Reliable hosting reseller plans with 24/7 support',
      features: ['Unlimited domains', 'Free SSL certificates', 'White-label support'],
      website: 'https://www.hostgator.com/reseller-hosting',
      type: 'Managed'
    },
    {
      name: 'GoDaddy Reseller',
      description: 'Comprehensive reseller program with strong brand recognition',
      features: ['Extensive product line', 'Competitive pricing', 'Marketing tools'],
      website: 'https://www.godaddy.com/reseller-program',
      type: 'Managed'
    },
    {
      name: 'InMotion Reseller',
      description: 'High-performance hosting reseller plans with SSD storage',
      features: ['90-day money-back guarantee', 'Free cPanel migrations', 'Launch assistance'],
      website: 'https://www.inmotionhosting.com/reseller-hosting',
      type: 'Managed'
    },
    {
      name: 'A2 Hosting Reseller',
      description: 'Fast and reliable turbo servers for resellers',
      features: ['Anytime money-back guarantee', 'Free HackScan protection', 'Developer friendly'],
      website: 'https://www.a2hosting.com/reseller-hosting',
      type: 'Managed'
    },
    {
      name: 'SiteGround Reseller',
      description: 'Premium hosting reseller plans with excellent uptime',
      features: ['White-label client area', 'Priority support', 'Advanced security features'],
      website: 'https://www.siteground.com/reseller-hosting.htm',
      type: 'Managed'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hosting Management</h2>
        <Button 
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>
      
      {hostingApis.length === 0 && !loading && (
        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/30">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-300">No hosting APIs configured</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            To enable automated hosting management, please add hosting provider API credentials in the 
            <a href="/admin/api-integrations" className="font-medium underline mx-1">API Integrations</a>
            section.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="reseller" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reseller">Hosting Reseller Options</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="accounts" disabled={hostingApis.length === 0}>
            Client Accounts {hostingApis.length > 0 ? `(${hostingApis.length})` : ''}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reseller" className="space-y-4 mt-4">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">About Hosting Reselling</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Hosting reselling allows you to sell web hosting services under your own brand. 
              Choose from these popular hosting reseller platforms to start your hosting business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resellerOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    <Badge variant={option.type === 'Managed' ? 'default' : 'secondary'}>
                      {option.type}
                    </Badge>
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
                    {option.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-2 flex items-center justify-center gap-2"
                    onClick={() => window.open(option.website, '_blank')}
                  >
                    Visit Website <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="configuration" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {hostingApis.length > 0 ? (
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800">
                    <div className="flex items-start">
                      <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-800 dark:text-green-400">Hosting APIs Connected</h3>
                        <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                          Your hosting provider APIs are configured and ready to use. You can now create and manage client hosting accounts.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Connected Hosting Providers</h3>
                    {hostingApis.map((api) => (
                      <div key={api.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center space-x-3">
                          <Server className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">{api.provider}</p>
                            <p className="text-xs text-muted-foreground">API Key: •••••••{api.api_key.slice(-3)}</p>
                          </div>
                        </div>
                        <Badge>{api.integration_status}</Badge>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/admin/api-integrations'}
                      className="mt-2"
                    >
                      Manage API Integrations
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 rounded-full bg-muted p-3">
                    <Server className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Setup Your Hosting Reseller Account</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Connect your hosting reseller account API to enable automatic provisioning and management of client hosting services.
                  </p>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => window.location.href = '/admin/api-integrations'}
                  >
                    <Cloud className="h-4 w-4" /> Configure Integration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounts" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <h3 className="font-semibold mb-2">Client Hosting Accounts</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  This section will display all client hosting accounts created through your reseller API.
                </p>
                <Button disabled className="flex items-center gap-2">
                  <Server className="h-4 w-4" /> Manage Client Accounts
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Feature coming soon. API integrations are currently in development.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostingManagement;
