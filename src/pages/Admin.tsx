
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, Users, ShoppingCart, Database, LineChart, Key } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout>
      <div className="domain-container py-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: LineChart },
                    { id: 'orders', label: 'Orders', icon: ShoppingCart },
                    { id: 'customers', label: 'Customers', icon: Users },
                    { id: 'domains', label: 'Domains', icon: Database },
                    { id: 'api', label: 'API Settings', icon: Key },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <TabsContent value="dashboard" className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                  <CardDescription>View your domain management statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Domains', value: '237' },
                      { label: 'Active Orders', value: '18' },
                      { label: 'Customers', value: '126' },
                      { label: 'Revenue', value: '$9,841' }
                    ].map((stat, i) => (
                      <div key={i} className="bg-background p-4 rounded-lg border text-center">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className={activeTab === 'api' ? 'block' : 'hidden'}>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>API Integration Settings</CardTitle>
                  <CardDescription>Configure your domain reseller API connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">
                    Connect to your domain registrar's API to enable domain registration, transfers, and management directly from your website.
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Card className="flex-1 border border-gray-200 dark:border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-lg">GoDaddy API</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm mb-4">
                          Current status: <span className="text-red-500 font-medium">Not Connected</span>
                        </p>
                        <Button className="w-full" asChild>
                          <Link to="/api-integration">Configure GoDaddy API</Link>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="flex-1 border border-gray-200 dark:border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-lg">ResellerClub API</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm mb-4">
                          Current status: <span className="text-red-500 font-medium">Not Connected</span>
                        </p>
                        <Button className="w-full" asChild>
                          <Link to="/api-integration">Configure ResellerClub API</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md mt-6">
                    <h3 className="font-medium mb-2">API Integration Benefits</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Real-time domain availability checking</li>
                      <li>Automated domain registration process</li>
                      <li>Domain transfer management</li>
                      <li>DNS record configuration</li>
                      <li>Domain renewal and expiration management</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Placeholder content for other tabs */}
            {['orders', 'customers', 'domains', 'settings'].map((tab) => (
              <TabsContent key={tab} value={tab} className={activeTab === tab ? 'block' : 'hidden'}>
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>{tab.charAt(0).toUpperCase() + tab.slice(1)}</CardTitle>
                    <CardDescription>Manage your {tab}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This is a placeholder for the {tab} management interface.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
