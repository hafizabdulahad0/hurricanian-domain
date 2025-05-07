
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface CartItem {
  id: string;
  type: 'domain' | 'hosting';
  name: string;
  price: number;
  period?: number; // in months
  details?: Record<string, any>;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  saveCartToDatabase: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('domainCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('domainCart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    // Check if item with same id already exists
    if (items.some(existingItem => existingItem.id === item.id)) {
      toast({
        title: "Already in cart",
        description: `${item.type === 'domain' ? 'Domain' : 'Hosting plan'} is already in your cart.`,
      });
      return;
    }

    setItems(prevItems => [...prevItems, item]);
    toast({
      title: "Added to cart",
      description: `${item.type === 'domain' ? 'Domain' : 'Hosting plan'} added to your cart.`,
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item removed from your cart.",
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('domainCart');
  };

  // Save cart to database for logged in users
  const saveCartToDatabase = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please login to save your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      // First delete any existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      
      // Then insert new cart items
      if (items.length > 0) {
        const cartItemsWithUserId = items.map(item => ({
          ...item,
          user_id: user.id
        }));
        
        const { error } = await supabase
          .from('cart_items')
          .insert(cartItemsWithUserId);
        
        if (error) throw error;
        
        toast({
          title: "Cart saved",
          description: "Your cart has been saved to your account.",
        });
      }
    } catch (error: any) {
      console.error('Error saving cart to database:', error);
      toast({
        title: "Error saving cart",
        description: error.message || "Failed to save cart to your account.",
        variant: "destructive",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems: items.length,
        totalPrice: items.reduce((total, item) => total + item.price, 0),
        saveCartToDatabase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
