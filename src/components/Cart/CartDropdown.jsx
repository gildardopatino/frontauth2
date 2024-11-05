import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

const CartDropdown = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="dropdown">
            <button className="btn btn-outline dropdown-toggle" type="button" id="cartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <FaShoppingCart />
            </button>
            <div className="dropdown-menu p-3" aria-labelledby="cartDropdown">
                {cartItems.length === 0 ? (
                    <p className="dropdown-item">El carrito está vacío</p>
                ) : (
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${(item.price * item.quantity)}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                    <td colSpan="2"><strong>${total}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary w-100" onClick={handleCheckout}>Proceder al Pago</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDropdown;