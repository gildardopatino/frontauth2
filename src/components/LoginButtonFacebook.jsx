import React from 'react'
import { FaFacebook } from 'react-icons/fa'
const LoginButtonFacebook = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/facebook';
    }

    return (
        <div>
            <button onClick={handleLogin} className='btn btn-primary'>
                <FaFacebook class="me-2" />
                Login con Facebook
            </button>
        </div>
    )
}

export default LoginButtonFacebook
