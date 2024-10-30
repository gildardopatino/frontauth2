import React, { useContext } from 'react'
import { CartContext } from '../../Contexts/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const total = cartItems.reduce((acumulador, product) => acumulador + (product.price * product.quantity), 0);
    const porcentajeIva = 19;
    const totalIva = Math.round(total * porcentajeIva / 100);
    const granTotal = total + totalIva;

    const handleRemove = (productId) => {
        removeFromCart(productId);
    }

    const handleQuantityChange = (productId, quantity) => {
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    }

    const createPayment = async () => {
        const items = cartItems.map(product => (
            {
                title: product.title,
                description: product.title,
                quantity: product.quantity,
                currency_id: 'COP',
                unit_price: Math.round(product.price + (product.price * porcentajeIva / 100))
            }
        ));
        const paymentData = {
            items,
            email: 'test_user_123456@testuser.com'
        }
        const response = await fetch('http://localhost:3000/crear-pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });
        if (response.ok) {
            const paymentUrl = await response.text();
            window.open(paymentUrl, '_blank');
        } else {
            console.log('Error al procesar el pago');
        }
    }

    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Tus productos</h4>
                        </div>
                        <div className="card-body">
                            {
                                cartItems.length === 0 ? (
                                    <p>El Carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th>Total</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItems.map(product => (

                                                        <tr key={product.id}>
                                                            <td>{product.title}</td>
                                                            <td>{product.price}</td>
                                                            <td>
                                                                <input type="number"
                                                                    className='form-control'
                                                                    value={product.quantity}
                                                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                                    min={1}
                                                                />
                                                            </td>
                                                            <td>{product.price * product.quantity}</td>
                                                            <td>
                                                                <button onClick={() => handleRemove(product.id)} className='btn btn-danger'>Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                <tr>
                                                    <td colSpan={2}></td>
                                                    <td>Total</td>
                                                    <td>{total}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}></td>
                                                    <td>Iva</td>
                                                    <td>{totalIva}</td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}></td>
                                                    <td>Total a pagar</td>
                                                    <td>{granTotal}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div>
                                            <button onClick={createPayment} className='btn btn-primary'>Pagar</button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Cart
