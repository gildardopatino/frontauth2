import React from 'react'
import LoginButtonGoogle from './LoginButtonGoogle'
import LoginButtonFacebook from './LoginButtonFacebook'
import { Navigate } from 'react-router-dom'

const LoginPage = ({user}) => {
    
    return (
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
    )
}

export default LoginPage
