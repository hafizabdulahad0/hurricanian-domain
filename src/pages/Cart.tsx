
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Cart = () => {
  const { items, removeItem, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    if (!user) {
      window.location.href = '/auth?redirect=/cart';
      return;
    }
    
    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      window.location.href = '/checkout';
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="domain-container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add domains or hosting plans to your cart to get started.</p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                <Link to="/domain-search">Search Domains</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/hosting">View Hosting Plans</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({items.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type === 'domain' ? 'Domain Registration' : 'Hosting Plan'}
                          {item.period && ` (${item.period} ${item.period === 1 ? 'month' : 'months'})`}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">${item.price.toFixed(2)}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => clearCart()}>Clear Cart</Button>
                  <Button asChild variant="outline">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
