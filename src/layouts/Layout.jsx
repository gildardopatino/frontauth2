import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import CartDropdown from '../components/Cart/CartDropdown'


const Layout = ({ user, onLogout }) => {
    
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
                                <NavLink className="navigation-link navigation-link-pill" end to="/admin" role="button" >
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
                                <CartDropdown />
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
                                            <div className="dropdown">
                                                <img data-bs-toggle="dropdown" aria-expanded="false" id="avatarDropDown"
                                                    className="dropdown-toggle avatar rounded-circle bg-l25-warning" src={user?.provider == 'google' ? user?.photos[0]?.value : ''} alt="Avatar" width="48" height="48" />
                                                <ul className="dropdown-menu p-3" aria-labelledby='avatarDropDown'>
                                                    <li className='dropdown-item'>Configuración</li>
                                                    <li className='dropdown-item' onClick={onLogout}>Cerrar Sesión</li>
                                                </ul>
                                            </div>
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
