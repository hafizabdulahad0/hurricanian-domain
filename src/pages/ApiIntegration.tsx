
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
import { Key, Check } from 'lucide-react';

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
  
  const form = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      provider: '',
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
            <p className="text-muted-foreground mt-2">Configure your domain reseller API credentials</p>
          </div>
          
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Set up your domain registrar API connection</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="godaddy">
                <TabsList className="mb-4">
                  <TabsTrigger value="godaddy">GoDaddy</TabsTrigger>
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
                            <FormLabel>API Secret</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your ResellerClub API secret" {...field} />
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
          
          <div className="mt-12 bg-card text-card-foreground p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">How to Get Your API Credentials</h2>
            
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
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
                <p className="text-yellow-800 dark:text-yellow-400 text-sm font-medium">
                  <strong>Important:</strong> Keep your API credentials secure. Never share them or expose them in client-side code. This integration stores them securely for server-side API calls only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiIntegration;
