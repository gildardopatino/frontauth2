import React, { useEffect, useState } from 'react'
import { CartContext } from '../../Contexts/CartContext';

const PaymentSuccesful = () => {
    const { clearCart } = useState(CartContext);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div>
            TU PAGO HA SIDO RECIBIDO
        </div>
    )
}

export default PaymentSuccesful
