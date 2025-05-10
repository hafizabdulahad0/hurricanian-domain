
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, RefreshCw, Server, Cloud, ShieldCheck, AlertTriangle, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Updated interface to make api_type optional and match the database schema
interface APIConfig {
  id: string;
  provider: string;
  api_key: string;
  api_secret?: string | null;
  api_type?: string | null; // Make this optional
  integration_status: string | null;
  created_at?: string; 
  updated_at?: string;
}

// Interface for hosting packages
interface HostingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  storage: number; // in GB
  bandwidth: number; // in GB
  domains: number;
  features: string[];
}

const HostingManagement = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [hostingApis, setHostingApis] = useState<APIConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Sample hosting packages data (would normally come from database)
  const [hostingPackages, setHostingPackages] = useState<HostingPackage[]>([
    {
      id: '1',
      name: 'Basic Hosting',
      description: 'Perfect for personal websites and blogs',
      price: 4.99,
      storage: 10,
      bandwidth: 100,
      domains: 1,
      features: ['1-Click WordPress Install', 'Free SSL Certificate', '24/7 Support']
    },
    {
      id: '2',
      name: 'Business Hosting',
      description: 'Ideal for small business websites',
      price: 9.99,
      storage: 30,
      bandwidth: 500,
      domains: 5,
      features: ['1-Click WordPress Install', 'Free SSL Certificate', '24/7 Support', 'Daily Backups', 'Enhanced Security']
    },
    {
      id: '3',
      name: 'Premium Hosting',
      description: 'Advanced hosting for high-traffic websites',
      price: 19.99,
      storage: 100,
      bandwidth: 1000,
      domains: 10,
      features: ['1-Click WordPress Install', 'Free SSL Certificate', '24/7 Priority Support', 'Daily Backups', 'Enhanced Security', 'Dedicated Resources']
    }
  ]);

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

  // Simulate client count (would normally come from API/database)
  const clientCount = 47;

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
            <Button variant="link" className="p-0 h-auto font-medium mx-1" onClick={() => window.location.href = '/admin'}>API Integrations</Button>
            section.
          </AlertDescription>
        </Alert>
      )}
      
      {hostingApis.length > 0 && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/30">
          <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-300">Hosting API Connected</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            Your hosting API is properly configured. You can now manage hosting packages and client accounts.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plans">Hosting Plans</TabsTrigger>
          <TabsTrigger value="clients" disabled={hostingApis.length === 0}>
            Client Accounts {clientCount > 0 ? `(${clientCount})` : ''}
          </TabsTrigger>
          <TabsTrigger value="reseller">Reseller Options</TabsTrigger>
          <TabsTrigger value="configuration">API Configuration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans" className="space-y-4 mt-4">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">Hosting Packages</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your hosting packages that will be available to your customers.
            </p>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add New Package
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hostingPackages.map((pkg) => (
              <Card key={pkg.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <Badge variant="outline">${pkg.price.toFixed(2)}/mo</Badge>
                  </div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{pkg.storage} GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bandwidth:</span>
                      <span className="font-medium">{pkg.bandwidth} GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domains:</span>
                      <span className="font-medium">{pkg.domains}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground mb-4">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {clientCount > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto border rounded-md">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-3 text-left">Client</th>
                          <th className="p-3 text-left">Package</th>
                          <th className="p-3 text-left">Server</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-left">Created</th>
                          <th className="p-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({length: 5}).map((_, i) => (
                          <tr key={i} className="border-t">
                            <td className="p-3">Client {i+1}</td>
                            <td className="p-3">{['Basic', 'Premium', 'Business'][i % 3]} Hosting</td>
                            <td className="p-3">srv{(i+1).toString().padStart(2, '0')}.hostex.com</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                i % 4 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {i % 4 === 0 ? 'Pending' : 'Active'}
                              </span>
                            </td>
                            <td className="p-3">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</td>
                            <td className="p-3 text-center">
                              <Button variant="ghost" size="sm">Manage</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm">View All Clients</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="mb-4 rounded-full bg-muted p-3">
                    <Server className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No Client Accounts</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Client hosting accounts will appear here once customers purchase hosting services.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
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
                      onClick={() => window.location.href = '/admin'}
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
                    onClick={() => window.location.href = '/admin'}
                  >
                    <Cloud className="h-4 w-4" /> Configure Integration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add the Plus icon from lucide-react
const Plus = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default HostingManagement;
