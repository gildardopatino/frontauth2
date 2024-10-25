import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Layout = ({ user }) => {
    const navigate = useNavigate();

    const goCheckout = () => {
        navigate('/checkout');
    }
    return (
        <div className="app">
            <div className='aside'>
                <div className="aside-head my-5" >
                    <div className="brand">
                        <img src="https://talentotech.gov.co/849/channels-748_logo_talentotech.png" style={{ width: '10rem' }} />
                    </div>
                </div>
                <div className="aside-body no-scrollbar">
                    <nav>
                        <ul className="navigation">
                            <li className="navigation-item">
                                <NavLink className="navigation-link navigation-link-pill" end to="/dashboard" role="button" >
                                    <span className="navigation-link-info">
                                        <span className="navigation-text">
                                            Dashboard
                                        </span>
                                    </span>
                                </NavLink>
                            </li>
                            <li className="navigation-item">
                                <NavLink className="navigation-link navigation-link-pill" end to="/products" role="button" >
                                    <span className="navigation-link-info">
                                        <span className="navigation-text">
                                            Productos
                                        </span>
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="wrapper">
                <header className="header">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="header-left col-md">
                                <button onClick={goCheckout} class="btn btn-secondary">Ver tu carrito</button>
                            </div>
                            <div className="header-right col-md-auto">
                                <div className="row g-3">
                                    <div className="col d-flex align-items-center cursor-pointer">
                                        <div className="me-3">
                                            <div className="text-end">
                                                <div className="fw-bold fs-6 mb-0">{user?.displayName}
                                                </div><div className="text-muted">
                                                    <small>{user?.emails[0].value}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="position-relative">
                                            <img className="avatar rounded-circle bg-l25-warning" src={user?.provider == 'google' ? user?.photos[0]?.value : ''} alt="Avatar" width="48" height="48" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="content">
                    <div className="page-wrapper container-fluid">
                        <Outlet />
                    </div>
                </main>
                <footer className="footer">
                    Footer
                </footer>
            </div>
        </div>
    )
}

export default Layout
