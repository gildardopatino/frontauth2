import React, { useEffect, useState } from 'react'
import { formatPrice } from '../utils/formatPrice';

const AdminPage = ({ user }) => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch('http://localhost:3000/sales');
                const data = await response.json();
                setSales(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales:', error);
                setLoading(false);
            }
        };

        fetchSales();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mt-5">
            <h2>Ventas Realizadas</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Email</th>
                        <th scope="col">Referencia Externa</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Productos</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.user_name}</td>
                            <td>{sale.user_email}</td>
                            <td>{sale.external_reference}</td>
                            <td>{new Date(sale.created_at).toLocaleString()}</td>
                            <td>
                                <ul>
                                    {sale.items.map(item => (
                                        <li key={item.product_id}>
                                            {item.title} - {item.quantity} x {formatPrice(item.price)}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{formatPrice(sale.items.reduce((total, item) => total + item.price * item.quantity, 0))}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage
