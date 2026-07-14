import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    try {
      await login(form);
      navigate('/play');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="card">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username hoặc Email"
          value={form.usernameOrEmail}
          onChange={(e) => setForm((prev) => ({ ...prev, usernameOrEmail: e.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p className="error">{message}</p>}
    </section>
  );
}
