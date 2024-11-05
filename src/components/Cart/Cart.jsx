import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import LoadingOverlay from '../LoadingOverlay';
const Cart = ({ user }) => {
  const { cartItems, removeFromCart, updateQuantity  } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const createPayment = async () => {
    setLoading(true);
    const items = cartItems.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || item.title, // Usa la descripción si está disponible, de lo contrario usa el título
      quantity: item.quantity,
      currency_id: 'COP',
      unit_price: item.price
    }));

    const paymentData = {
      items,
      email: user?.emails[0].value,
      name: user?.displayName
    };

    try {
      const response = await fetch('http://localhost:3000/crear-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const paymentUrl = await response.text(); // Obtener la URL como texto
        window.open(paymentUrl, '_blank');
      } else {
        console.error('Error realizando el pago');
      }
    } catch (error) {
      console.log("error al realizar el pago");
    } finally {
      setLoading(false);
    }

  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const envio = 0;
  return (
    <div className="container mt-5">
      {loading && <LoadingOverlay />}
      <div className="row">
        <div className="col-md-9 col-sm-7 col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4>Productos</h4>
            </div>
            <div className="card-body">
              {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
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
                      {cartItems.map(item => {
                        const formattedPrice = new Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: 'COP',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }).format(item.price);
                        return (
                          <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{formattedPrice}</td>
                            <td>
                              <input
                              type="number"
                              className="form-control"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              min="1"
                            /></td>
                            <td>{formatPrice(item.price * item.quantity)}</td>
                            <td>
                              <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                                Quitar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-5 col-lg-3">
          <div className="card">
            <div className="card-header">
              <h4>Resumen del Carrito</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>Producto</div>
                <div>{formatPrice(total)}</div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div>Envio</div>
                <div className="text-success">{envio == 0 ? 'Gratis' : envio}</div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div className="fw-bold">Total</div>
                <div className="fw-bold">{formatPrice(total + envio)}</div>
              </div>
              <div className="d-flex justifify-content-center mt-5">
                <button className="btn btn-primary w-100" onClick={createPayment}>Pagar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
