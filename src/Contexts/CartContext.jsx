import React, { createContext, useEffect, useState } from 'react'
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
        setCartItems(savedItems => {
            const itemExists = savedItems.find(item => item.id === product.id);
            if (itemExists) { // Existe el Item, debo buscarlo en los guardados para poder actualizar la cantidad +1
                toast.info('Ha sido actualizada la cantidad del producto');
                return savedItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            } else { // Si no existe, entonces lo insertamos
                toast.success('El producto ha sido agregado al carrito');
                return [...savedItems, { ...product, quantity: 1 }];
            }
        });
    }

    const removeFromCart = (productId) => {
        setCartItems(savedItems => {
            const itemExists = savedItems.find(item => item.id === productId);
            if (itemExists) {
                toast.error('El producto fue Eliminado del carrito');
            }
            return savedItems.filter(item => item.id !== productId);
        });
    }

    const clearCart = () => {
        console.log("entre a clear")
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
