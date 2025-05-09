
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, RefreshCw, Server, Cloud, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HostingManagement = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
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
      
      <Tabs defaultValue="reseller" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reseller">Hosting Reseller Options</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
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
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Server className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Setup Your Hosting Reseller Account</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Connect your hosting reseller account API to enable automatic provisioning and management of client hosting services.
                </p>
                <Button className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" /> Configure Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostingManagement;
