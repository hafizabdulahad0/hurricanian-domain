
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!user) {
    navigate('/auth?redirect=/checkout');
    return null;
  }
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Create an order in the database using 'any' to bypass type checking temporarily
      const { data: order, error: orderError } = await (supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalPrice * 1.1,
          payment_method: paymentMethod,
          payment_status: 'pending',
          items: JSON.stringify(items)
        })
        .select() as any);
      
      if (orderError) throw orderError;
      
      // In a real implementation, we would call our payment endpoint here
      // For example:
      // if (paymentMethod === 'jazzcash') {
      //   const { data } = await supabase.functions.invoke('process-jazzcash-payment', {
      //     body: { orderId: order.id, amount: totalPrice * 1.1 }
      //   });
      //   window.location.href = data.paymentUrl;
      //   return;
      // }
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful payment
      clearCart();
      
      // Navigate to success page
      navigate('/payment-success');
      
    } catch (error: any) {
      console.error('Payment processing error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'An error occurred during payment processing',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <Layout>
      <div className="domain-container py-12">
        <div className="flex items-center mb-8">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <a href="/cart"><ArrowLeft className="h-4 w-4" /></a>
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                    <TabsTrigger value="jazzcash">JazzCash</TabsTrigger>
                    <TabsTrigger value="easypaisa">EasyPaisa</TabsTrigger>
                    <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit-card">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Card Number</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Cardholder Name</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="John Doe" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Expiration Date</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">CVV</label>
                          <input type="text" className="w-full p-2 border rounded" placeholder="123" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="jazzcash">
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          You'll be redirected to JazzCash to complete your payment securely.
                        </AlertDescription>
                      </Alert>
                      <div className="flex items-center gap-4">
                        <img src="https://via.placeholder.com/80x40?text=JazzCash" alt="JazzCash" className="h-10" />
                        <div>
                          <p className="font-medium">Pay with JazzCash</p>
                          <p className="text-sm text-muted-foreground">Mobile payments service by Jazz</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="easypaisa">
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          You'll be redirected to EasyPaisa to complete your payment securely.
                        </AlertDescription>
                      </Alert>
                      <div className="flex items-center gap-4">
                        <img src="https://via.placeholder.com/80x40?text=EasyPaisa" alt="EasyPaisa" className="h-10" />
                        <div>
                          <p className="font-medium">Pay with EasyPaisa</p>
                          <p className="text-sm text-muted-foreground">Mobile payments service by Telenor</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bank-transfer">
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          Bank transfers may take 2-3 business days to process.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2">
                        <p className="font-medium">Bank Account Details:</p>
                        <p className="text-sm">Bank: Example Bank</p>
                        <p className="text-sm">Account Name: Domain Registration Services</p>
                        <p className="text-sm">Account Number: 1234567890</p>
                        <p className="text-sm">IBAN: PK00EXMP0123456789012345</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Items</p>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm mb-1">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-purpleTheme-primary hover:bg-purpleTheme-secondary"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Payment
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
