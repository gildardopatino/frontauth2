import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import Layout from './layouts/Layout';
import './App.css';
import ProductList from './components/Products/ProductList';
import { CartProvider } from './components/contexts/CartContext';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import PaymentPending from './components/PaymentPending';

function App() {
  const [user, setUser] = useState(null);
  const urlGetProfile = 'http://localhost:3000/profile';
  const urlLogout = 'http://localhost:3000/logout';

  const handleLogout = async () => {
    const response = await fetch(urlLogout);
    if (response.ok) {
      setUser(null);
    }
  }
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(urlGetProfile, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Error tratando de obtener el perfil', error);
        setUser(null);
      }
    };
    checkUser();
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage user={user} />} />
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            <Route path="/admin" element={user ? <AdminPage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/products" element={user ? <ProductList /> : <Navigate to="/" />} />
            <Route path="/checkout" element={user ? <Cart user={user} /> : <Navigate to="/" />} />
            <Route path="/completado" element={<PaymentSuccess />} />
            <Route path="/fallido" element={<PaymentFailure />} />
            <Route path="/pendiente" element={<PaymentPending />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </CartProvider>
  )
}

export default App
