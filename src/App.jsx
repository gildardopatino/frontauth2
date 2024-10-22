import LoginButtonFacebook from './components/LoginButtonFacebook';
import LoginButtonGoogle from './components/LoginButtonGoogle'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="card shadow p-4">
            <h1 className='text-center'>TalentoTech OAuth2</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' id="email" placeholder='Registre su email' />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' id="password" placeholder='Su clave' />
              </div>
              <button type='submit' className='btn btn-primary w-100 mb-3'>Login Basico</button>
            </form>
            <div className="d-flex justify-content-between">
              <LoginButtonGoogle />
              <LoginButtonFacebook />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
