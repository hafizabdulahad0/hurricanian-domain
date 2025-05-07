
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const PaymentSuccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If no user is logged in, redirect to home
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <Layout>
      <div className="domain-container py-12">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-500/20 p-3">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl mb-2">Payment Successful!</CardTitle>
              <p className="text-muted-foreground">
                Your order has been successfully processed.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/50">
                <p className="font-medium">Transaction Details</p>
                <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                  <p className="text-muted-foreground">Order Number:</p>
                  <p className="text-right">ORD-{Math.floor(Math.random() * 10000)}</p>
                  <p className="text-muted-foreground">Date:</p>
                  <p className="text-right">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address. 
                  Please check your inbox for further details.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button asChild className="w-full bg-purpleTheme-primary hover:bg-purpleTheme-secondary">
                <Link to="/dashboard">
                  View Order Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  Return to Home
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
