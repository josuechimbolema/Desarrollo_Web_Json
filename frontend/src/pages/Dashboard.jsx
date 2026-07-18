import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '' });

  const cargarUsuarios = async () => {
    setCargando(true);
    try {
      const { data } = await api.get('/usuarios');
      setUsuarios(data);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cargar usuarios');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    await api.delete(`/usuarios/${id}`);
    cargarUsuarios();
  };

  const empezarEdicion = (u) => {
    setEditando(u._id);
    setForm({ nombre: u.nombre, email: u.email });
  };

  const guardarEdicion = async (id) => {
    await api.put(`/usuarios/${id}`, form);
    setEditando(null);
    cargarUsuarios();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">práctica 6 · CRUD + JWT</p>
          <h1>Panel de usuarios</h1>
        </div>
        <div className="user-badge">
          <span>{usuario?.nombre || usuario?.email}</span>
          <button className="btn-ghost" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </header>

      {error && <p className="error-text">{error}</p>}
      {cargando ? (
        <p className="loading-text">Cargando usuarios…</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Origen</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u._id}>
                {editando === u._id ? (
                  <>
                    <td><input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} /></td>
                    <td><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                    <td>{u.rol}</td>
                    <td>{u.googleId ? 'Google' : 'Local'}</td>
                    <td className="acciones">
                      <button className="btn-primary sm" onClick={() => guardarEdicion(u._id)}>Guardar</button>
                      <button className="btn-ghost sm" onClick={() => setEditando(null)}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{u.nombre}</td>
                    <td>{u.email}</td>
                    <td>{u.rol}</td>
                    <td>{u.googleId ? 'Google' : 'Local'}</td>
                    <td className="acciones">
                      <button className="btn-ghost sm" onClick={() => empezarEdicion(u)}>Editar</button>
                      <button className="btn-danger sm" onClick={() => eliminar(u._id)}>Eliminar</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
