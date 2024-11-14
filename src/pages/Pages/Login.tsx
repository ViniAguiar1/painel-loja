// loginV1.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../toolkit/authSlice';
import { loginService } from '../../services/authService';
import { parseJwt  } from '../../services/jwtService';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import authlogin from '../../assets/images/authentication/img-auth-login.png'; 
import logo from '../../../public/assets/images/logo.png';

const LoginV1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginService(email, password);
      const { token } = data; // Pega o token da resposta
      
      // Decodifica o token e guarda no localStorage
      const decodedToken = parseJwt(token); // Decodificação do token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
  
      dispatch(login(decodedToken));  // Armazena os dados do usuário no redux, se necessário
      navigate('/');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Ocorreu um erro desconhecido');
      }
    }
  };
 
  return (
    <React.Fragment>
      <div className="auth-main v1">
        <div className="auth-wrapper">
          <div className="auth-form">
            <Card className="my-5">
              <Card.Body>
                <div className="text-center">
                  <img src="../../../public/assets/logo.png" style={{ width: '8rem', height: '8rem' }} alt="images" className="img-fluid mb-3" />
                  <h4 className="f-w-500 mb-1">Logue com seu email</h4>
                  <p className="mb-3">Não tem uma conta? <Link to="/register" className="link-primary ms-1">Criar Conta</Link></p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Endereço de Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-flex mt-1 justify-content-between align-items-center">
                  <div className="form-check">
                    <input className="form-check-input input-primary" type="checkbox" id="customCheckc1" defaultChecked />
                    <label className="form-check-label text-muted" htmlFor="customCheckc1">Lembrar dados?</label>
                  </div>
                  <Link to="../forgot-password"><h6 className="f-w-400 mb-0">Esqueci minha senha?</h6></Link>
                </div>
                <div className="d-grid mt-4">
                  <button type="button" className="btn btn-primary" onClick={handleLogin}>Entrar</button>
                </div>
                 
              </Card.Body>
            </Card>
          </div>
           
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginV1;
