import React, { useState } from 'react';
import axios from 'axios';
import "../../scss/register.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://6653200c813d78e6d6d747f9.mockapi.io/user', {
        username,
        email,
        password,
      });
      console.log('User registered:', response.data);
      setSuccess('User registered successfully');
      setError(null);
    } catch (error) {
      console.error('Error registering user:', error.response || error.message);
      setError(error.response ? error.response.data : 'Registration failed');
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
        required
      />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
        required
      />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
        required
      />
    </div>
    <button type="submit" className="register-button">Register</button>
    {success && <p className="success-message">{success}</p>}
    {error && <p className="error-message">{error}</p>}
  </form>
);
};

export default Register;