import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import Layout from './layouts/Layout';
import { CartProvider } from './Contexts/CartContext';
import ProductList from './components/Cart/Products/ProductList';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/Cart/Cart';
import PaymentSuccesful from './components/Cart/PaymentSuccesful';

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
          <Route element={<Layout user={user} />}>
            <Route path="/admin" element={user ? <AdminPage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/products" element={user ? <ProductList /> : <Navigate to="/" />}></Route>
            <Route path="/checkout" element={user ? <Cart /> : <Navigate to="/" />}></Route>
            <Route path="/completado" element={<PaymentSuccesful />}></Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </CartProvider>
  )
}

export default App
