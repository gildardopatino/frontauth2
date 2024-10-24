import React, { createContext, useEffect, useState } from 'react'

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
        setCartItems(savedItems => {
            const itemExists = savedItems.find(item => item.id === product.id);
            if (itemExists) { // Existe el Item, debo buscarlo en los guardados para poder actualizar la cantidad +1
                return savedItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else { // Si no existe, entonces lo insertamos
                return [...savedItems, { ...product, quantity: 1 }];
            }
        });
    }

    const removeFromCart = (productId) => {

    }

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    }

    const getCartItems = () => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItems, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
