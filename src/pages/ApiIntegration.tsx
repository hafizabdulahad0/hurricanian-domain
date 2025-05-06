
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Key, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const apiFormSchema = z.object({
  provider: z.string().min(1, { message: 'Please select a provider' }),
  apiKey: z.string().min(1, { message: 'API key is required' }),
  apiSecret: z.string().min(1, { message: 'API secret is required' }),
  environment: z.string().min(1, { message: 'Please select an environment' })
});

type ApiFormValues = z.infer<typeof apiFormSchema>;

const ApiIntegration = () => {
  const { toast } = useToast();
  const [isConfigured, setIsConfigured] = useState(false);
  const [activeTab, setActiveTab] = useState('godaddy');
  
  // Check if there are existing API configurations
  useState(() => {
    const savedConfig = localStorage.getItem('domainApiConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setIsConfigured(true);
        setActiveTab(config.provider.toLowerCase());
      } catch (e) {
        console.error('Error parsing saved API config', e);
      }
    }
  });
  
  const form = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      provider: activeTab === 'godaddy' ? 'GoDaddy' : 
                activeTab === 'namecheap' ? 'Namecheap' : 
                activeTab === 'resellerclub' ? 'ResellerClub' : '',
      apiKey: '',
      apiSecret: '',
      environment: 'sandbox'
    }
  });

  const onSubmit = (data: ApiFormValues) => {
    // In a real app, you would securely store and validate these credentials
    console.log('API Integration data:', data);
    
    // Store in localStorage (for demo only - in production use a more secure method)
    localStorage.setItem('domainApiConfig', JSON.stringify(data));
    
    setIsConfigured(true);
    toast({
      title: "API Configuration Saved",
      description: `${data.provider} API configured successfully.`,
    });
  };

  const handleTestConnection = () => {
    // Here you would test the API connection
    const savedConfig = localStorage.getItem('domainApiConfig');
    
    if (!savedConfig) {
      toast({
        title: "Connection Failed",
        description: "No API configuration found. Please save your configuration first.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, you would use the credentials to test the connection
    // For demo purposes, we'll simulate a successful connection
    toast({
      title: "Connection Test",
      description: "API connection test successful!",
    });
  };

  return (
    <Layout>
      <div className="domain-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground">Domain Reseller API Integration</h1>
            <p className="text-muted-foreground mt-2">Configure your domain registrar API credentials</p>
          </div>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              You'll need to sign up for a reseller account with one of the supported providers to access their API services.
              Most providers offer sandbox/test environments for development before committing to paid services.
            </AlertDescription>
          </Alert>
          
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Set up your domain registrar API connection</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="godaddy">GoDaddy</TabsTrigger>
                  <TabsTrigger value="namecheap">Namecheap</TabsTrigger>
                  <TabsTrigger value="resellerclub">ResellerClub</TabsTrigger>
                </TabsList>
                
                <TabsContent value="godaddy">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provider</FormLabel>
                            <FormControl>
                              <Input value="GoDaddy" disabled {...field} onChange={(e) => field.onChange("GoDaddy")} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your GoDaddy API key" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiSecret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Secret</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your GoDaddy API secret" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="environment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Environment</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select environment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="production">Production</SelectItem>
                                <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 flex space-x-4">
                        <Button type="submit" className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                          <Key className="mr-2 h-4 w-4" />
                          Save Configuration
                        </Button>
                        <Button type="button" variant="outline" onClick={handleTestConnection}>
                          Test Connection
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="namecheap">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provider</FormLabel>
                            <FormControl>
                              <Input value="Namecheap" disabled {...field} onChange={(e) => field.onChange("Namecheap")} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your Namecheap API key" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiSecret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your Namecheap username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="environment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Environment</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select environment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="production">Production</SelectItem>
                                <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 flex space-x-4">
                        <Button type="submit" className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                          <Key className="mr-2 h-4 w-4" />
                          Save Configuration
                        </Button>
                        <Button type="button" variant="outline" onClick={handleTestConnection}>
                          Test Connection
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="resellerclub">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provider</FormLabel>
                            <FormControl>
                              <Input value="ResellerClub" disabled {...field} onChange={(e) => field.onChange("ResellerClub")} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your ResellerClub API key" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiSecret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ResellerId</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your ResellerClub Reseller ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="environment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Environment</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select environment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="production">Production</SelectItem>
                                <SelectItem value="test">Test</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 flex space-x-4">
                        <Button type="submit" className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                          <Key className="mr-2 h-4 w-4" />
                          Save Configuration
                        </Button>
                        <Button type="button" variant="outline" onClick={handleTestConnection}>
                          Test Connection
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            {isConfigured && (
              <CardFooter className="bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-900/30">
                <div className="flex items-center text-green-700 dark:text-green-400">
                  <Check className="h-5 w-5 mr-2" />
                  <span>API configuration successful! You can now use domain registration features.</span>
                </div>
              </CardFooter>
            )}
          </Card>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">API Integration Guide</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How to Get Your API Credentials</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">GoDaddy</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Log in to your GoDaddy Developer account at <a href="https://developer.godaddy.com/" className="text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">developer.godaddy.com</a></li>
                        <li>Go to the "API Keys" section</li>
                        <li>Click "Create New API Key"</li>
                        <li>Name your key and select the environment (Production or Test)</li>
                        <li>Copy both the API Key and Secret values</li>
                        <li>Paste them into the form on this page</li>
                      </ol>
                      <p className="mt-2 text-sm">Pricing: Starts at $249.99/year for the Reseller program, plus individual domain costs</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Namecheap</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Log in to your Namecheap account</li>
                        <li>Navigate to "Profile" &gt; "Tools" &gt; "API Access"</li>
                        <li>Enable API access and whitelist your server IP</li>
                        <li>Your API key will be displayed on this page</li>
                        <li>Use your Namecheap username as the "API Username"</li>
                      </ol>
                      <p className="mt-2 text-sm">Pricing: No setup fee, pay-as-you-go for domains with reseller discounts available</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">ResellerClub</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Log in to your ResellerClub account</li>
                        <li>Navigate to Settings &gt; API</li>
                        <li>Generate a new API Key if you don't already have one</li>
                        <li>Copy your ResellerID and API Key</li>
                        <li>Paste them into the form on this page</li>
                      </ol>
                      <p className="mt-2 text-sm">Pricing: Starting at $99 setup fee + domain costs with various reseller plans available</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>API Features & Capabilities</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Domain Registration</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Register new domains</li>
                          <li>Transfer domains between registrars</li>
                          <li>Bulk domain registration</li>
                          <li>Domain pricing information</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Domain Management</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Renew domains</li>
                          <li>Update nameservers</li>
                          <li>Modify contact information</li>
                          <li>Domain transfers</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">DNS Management</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Create/update DNS records</li>
                          <li>Set up domain forwarding</li>
                          <li>Configure email forwarding</li>
                          <li>DNSSEC configuration</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Domain Information</h4>
                        <ul className="list-disc pl-4 space-y-1 text-sm">
                          <li>Domain availability check</li>
                          <li>WHOIS information</li>
                          <li>Domain suggestions</li>
                          <li>Premium domain search</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Alternative API Services</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Other Domain API Providers</h4>
                      <ul className="list-disc pl-4 mt-2 space-y-2">
                        <li>
                          <strong>OpenSRS (Tucows)</strong>
                          <p className="text-sm mt-1">Enterprise-level domain reseller platform with a comprehensive API.</p>
                          <a href="https://opensrs.com/" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">opensrs.com</a>
                        </li>
                        <li>
                          <strong>NameAPI</strong>
                          <p className="text-sm mt-1">Specialized in domain WHOIS and availability checking API services.</p>
                          <a href="https://www.nameapi.org/" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">nameapi.org</a>
                        </li>
                        <li>
                          <strong>Cloudflare</strong>
                          <p className="text-sm mt-1">Offers domain registration and DNS management APIs.</p>
                          <a href="https://developers.cloudflare.com/" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">developers.cloudflare.com</a>
                        </li>
                        <li>
                          <strong>Domain.com</strong>
                          <p className="text-sm mt-1">Provides reseller API for domain registration and management.</p>
                          <a href="https://www.domain.com/resellers" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">domain.com/resellers</a>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold">Hosting API Providers</h4>
                      <ul className="list-disc pl-4 mt-2 space-y-2">
                        <li>
                          <strong>cPanel/WHM</strong>
                          <p className="text-sm mt-1">Industry standard control panel with comprehensive API for hosting management.</p>
                          <a href="https://documentation.cpanel.net/display/DD/Guide+to+cPanel+API" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">documentation.cpanel.net</a>
                        </li>
                        <li>
                          <strong>Plesk</strong>
                          <p className="text-sm mt-1">Web hosting control panel with API for automation and management.</p>
                          <a href="https://docs.plesk.com/en-US/obsidian/api-rpc/about-xml-api.78379/" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">docs.plesk.com</a>
                        </li>
                        <li>
                          <strong>DirectAdmin</strong>
                          <p className="text-sm mt-1">Hosting control panel with API access for automation.</p>
                          <a href="https://www.directadmin.com/api.php" className="text-xs text-purpleTheme-primary hover:underline" target="_blank" rel="noopener noreferrer">directadmin.com/api.php</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-400 text-sm font-medium">
              <strong>Important:</strong> Keep your API credentials secure. Never share them or expose them in client-side code. This integration stores them securely for server-side API calls only.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiIntegration;
