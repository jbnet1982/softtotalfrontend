import { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/api/register/', {
        name,
        email,
        phone,
        password,
      });
      setMsg('Usuario registrado con éxito');
      onRegister(); // Callback para navegar a login o chat
    } catch (err) {
      setMsg('Error al registrar');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {msg && <p>{msg}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}