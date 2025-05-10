import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings, Users, ShoppingCart, Database, LineChart, Key } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout>
      <div className="domain-container py-12">
        <div className="flex justify-center mb-6">
          <Card className="w-full max-w-2xl bg-red-50 border border-red-200">
            <CardContent className="p-4">
              <p className="text-red-600 text-center font-medium">
                This page is deprecated. Please use the new Admin Dashboard at{' '}
                <Link to="/admin" className="underline">
                  /admin
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
        
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="dashboard">
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

              <TabsContent value="api">
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
                            <Link to="/admin">Configure GoDaddy API</Link>
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
                            <Link to="/admin">Configure ResellerClub API</Link>
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
              
              {/* Replace placeholders with actual content for other tabs */}
              <TabsContent value="orders">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Order Management</CardTitle>
                    <CardDescription>Track and manage customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="overflow-x-auto border rounded-md">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="p-3 text-left">Order ID</th>
                              <th className="p-3 text-left">Customer</th>
                              <th className="p-3 text-left">Items</th>
                              <th className="p-3 text-left">Amount</th>
                              <th className="p-3 text-left">Status</th>
                              <th className="p-3 text-left">Date</th>
                              <th className="p-3 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { id: 'ORD-1235', customer: 'John Smith', items: 'Domain Registration', amount: '$14.99', status: 'Completed', date: '2023-04-12' },
                              { id: 'ORD-1234', customer: 'Jane Doe', items: 'Hosting Plan (Basic)', amount: '$59.99', status: 'Processing', date: '2023-04-11' },
                              { id: 'ORD-1233', customer: 'Mike Johnson', items: 'Domain + Hosting Bundle', amount: '$74.98', status: 'Completed', date: '2023-04-10' },
                            ].map((order, i) => (
                              <tr key={i} className="border-t">
                                <td className="p-3">{order.id}</td>
                                <td className="p-3">{order.customer}</td>
                                <td className="p-3">{order.items}</td>
                                <td className="p-3">{order.amount}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3 text-center">
                                  <Button variant="ghost" size="sm">View</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm">View All Orders</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customers">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>Manage your customer accounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="overflow-x-auto border rounded-md">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="p-3 text-left">Customer</th>
                              <th className="p-3 text-left">Email</th>
                              <th className="p-3 text-left">Domains</th>
                              <th className="p-3 text-left">Hosting</th>
                              <th className="p-3 text-left">Total Spend</th>
                              <th className="p-3 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'John Smith', email: 'john@example.com', domains: 3, hosting: 1, spend: '$214.95' },
                              { name: 'Jane Doe', email: 'jane@example.com', domains: 1, hosting: 1, spend: '$89.98' },
                              { name: 'Mike Johnson', email: 'mike@example.com', domains: 5, hosting: 2, spend: '$349.75' },
                            ].map((customer, i) => (
                              <tr key={i} className="border-t">
                                <td className="p-3">{customer.name}</td>
                                <td className="p-3">{customer.email}</td>
                                <td className="p-3">{customer.domains}</td>
                                <td className="p-3">{customer.hosting}</td>
                                <td className="p-3">{customer.spend}</td>
                                <td className="p-3 text-center">
                                  <Button variant="ghost" size="sm">View</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-center">
                        <Button variant="outline" size="sm">View All Customers</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="domains">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>Domain Management</CardTitle>
                    <CardDescription>Manage domain products and pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="overflow-x-auto border rounded-md">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="p-3 text-left">Extension</th>
                              <th className="p-3 text-left">Registration Price</th>
                              <th className="p-3 text-left">Transfer Price</th>
                              <th className="p-3 text-left">Renewal Price</th>
                              <th className="p-3 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { ext: '.com', reg: '$14.99', transfer: '$14.99', renewal: '$14.99' },
                              { ext: '.net', reg: '$12.99', transfer: '$12.99', renewal: '$12.99' },
                              { ext: '.org', reg: '$13.99', transfer: '$13.99', renewal: '$13.99' },
                              { ext: '.io', reg: '$39.99', transfer: '$39.99', renewal: '$39.99' },
                            ].map((domain, i) => (
                              <tr key={i} className="border-t">
                                <td className="p-3 font-medium">{domain.ext}</td>
                                <td className="p-3">{domain.reg}</td>
                                <td className="p-3">{domain.transfer}</td>
                                <td className="p-3">{domain.renewal}</td>
                                <td className="p-3 text-center">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Domain Pricing Management</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Set your retail prices for domain names above the wholesale costs from your registrar.
                        </p>
                        <Button size="sm" variant="outline">Update Pricing</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure your reseller platform</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">General Settings</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Company Name</label>
                          <Input defaultValue="Domain Reseller Co." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Support Email</label>
                          <Input defaultValue="support@example.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Default Currency</label>
                          <Select defaultValue="usd">
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tax Rate (%)</label>
                          <Input defaultValue="0" />
                        </div>
                      </div>
                    </div>
                    
                    <Button>Save Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
