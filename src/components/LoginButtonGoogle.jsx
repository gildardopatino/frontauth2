import React from 'react'
import { FaGoogle } from 'react-icons/fa'
const LoginButtonGoogle = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    }

    return (
        <div>
            <button onClick={handleLogin} className='btn btn-danger'>
                <FaGoogle class="me-2"/>
                Login con Google
            </button>
        </div>
    )
}

export default LoginButtonGoogle
