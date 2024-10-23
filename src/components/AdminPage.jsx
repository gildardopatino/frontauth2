import React from 'react'

const AdminPage = ({ user, onLogout }) => {

    return (
        <div>
            <h1>Pagina de Administracion</h1>
            <p>
                Usuario conectado: {user.displayName}
            </p>
            <p>Email: {user.emails[0].value} </p>
            <button onClick={onLogout} className='btn btn-secondary mt-2'>Logout</button>
        </div>
    )
}

export default AdminPage
