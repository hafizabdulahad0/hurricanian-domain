
import React, { createContext, useContext, useState, useEffect } from 'react';

// Cart Item Interface
export interface CartItem {
  id: string;
  type: 'domain' | 'hosting' | 'ssl' | 'other';
  name: string;
  price: number;
  period: number;
  details?: Record<string, any>;
}

// Cart Context Interface
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Create the context
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

// Cart Provider Props
interface CartProviderProps {
  children: React.ReactNode;
}

// Cart Provider Component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if item with same ID already exists
      const existingIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingIndex >= 0) {
        // Replace the existing item
        const newItems = [...prevItems];
        newItems[existingIndex] = item;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const updateItem = (id: string, updates: Partial<CartItem>) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateItem,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
