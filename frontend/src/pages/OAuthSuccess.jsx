import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // guardamos el token y pedimos el perfil para completar los datos del usuario
    localStorage.setItem('token', token);
    api
      .get('/auth/perfil')
      .then(({ data }) => {
        iniciarSesion(token, data);
        navigate('/dashboard');
      })
      .catch(() => navigate('/login'));
  }, []);

  return (
    <div className="auth-page">
      <p className="loading-text">Completando inicio de sesión con Google…</p>
    </div>
  );
}
