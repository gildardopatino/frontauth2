import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginButtonFacebook from './components/LoginButtonFacebook';
import LoginButtonGoogle from './components/LoginButtonGoogle';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from './components/AdminPage';

function App() {
  const [user, setUser] = useState(null);
  const urlGetProfile = 'http://localhost:3000/profile';
  const urlLogout = 'http://localhost:3000/logout';
 
  const handleLogout = async() => {
    const response = await fetch(urlLogout);
    if(response.ok){
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
    <Router>
      <Routes>
        <Route path='/' element={
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="card shadow p-4">
                  <h1 className='text-center'>TalentoTech OAuth2</h1>
                  {user ? (
                    <Navigate to="/admin" />
                  ) : (
                    <div>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email address</label>
                          <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                      </form>
                      <div className="d-flex justify-content-between">
                        <LoginButtonGoogle />
                        <LoginButtonFacebook />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
        />
        <Route path="/admin" element={user ? <AdminPage user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
