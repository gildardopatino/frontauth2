import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                toast.info(`Incrementada la cantidad de ${product.title}`);
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                toast.success(`${product.title} agregado al carrito`);
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const itemToRemove = prevItems.find(item => item.id === productId);
            if (itemToRemove) {
                toast.error(`${itemToRemove.title} eliminado del carrito`);
            }
            return prevItems.filter(item => item.id !== productId);
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const getCartItems = () => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItems, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};