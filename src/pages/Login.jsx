// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      });

      // Guardar token en localStorage o estado
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);

      alert('Login exitoso');
       window.location.href = 'http://localhost:3000/Dashboard';

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError('Ocurrió un error al iniciar sesión');
      }
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Ingresar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default Login;
