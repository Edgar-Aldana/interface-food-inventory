import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      

      const response = await axios.post(
        "https://api-food-inventory.onrender.com/admin/login",
        new URLSearchParams({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );


      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Usuario"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Iniciar Sesión</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
