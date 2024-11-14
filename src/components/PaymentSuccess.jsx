import React, { useContext, useEffect } from 'react';
import { CartContext } from '../Contexts/CartContext';


const PaymentSuccess = () => {
    const { clearCart } = useContext(CartContext);
    useEffect(() => {
        clearCart();
        // Extraer los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const paymentData = {
            collection_id: params.get('collection_id'),
            collection_status: params.get('collection_status'),
            payment_id: params.get('payment_id'),
            status: params.get('status'),
            external_reference: params.get('external_reference'),
            payment_type: params.get('payment_type'),
            merchant_order_id: params.get('merchant_order_id'),
            preference_id: params.get('preference_id'),
            site_id: params.get('site_id'),
            processing_mode: params.get('processing_mode'),
            merchant_account_id: params.get('merchant_account_id')
        };
        const sendPaymentData = async () => {
            try {
                const response = await fetch('http://localhost:3000/save/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentData),
                });

                if (!response.ok) {
                    throw new Error('Error al guardar los datos del pago');
                }

                console.log('Datos del pago guardados exitosamente');
            } catch (error) {
                console.error('Error:', error);
            }
        };
        sendPaymentData();
    }, []);
    return (
        <div className="container mt-5">
            <h2>Pago Completado</h2>
            <p>¡Gracias por tu compra! Tu pago ha sido procesado exitosamente.</p>
        </div>
    );
};

export default PaymentSuccess;