import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import Layout from './layouts/Layout';
import './App.css';

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
    <Routes>
      <Route path='/' element={<LoginPage user={user} />} />
      <Route element={<Layout user={user} />}>
        <Route path="/admin" element={user ? <AdminPage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
