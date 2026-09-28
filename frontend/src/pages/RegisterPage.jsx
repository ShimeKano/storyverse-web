import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Button, Title } from '../components/premium/Ui';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault(); setMessage(''); setSubmitting(true);
    try { await register(form); navigate('/login', { replace: true }); }
    catch (error) { setMessage(error.message); }
    finally { setSubmitting(false); }
  }
  return <section className="auth-card card"><span className="eyebrow">Join the community</span><Title as={1}>Create your account</Title><p>Your account stores story progress, endings, and creator projects.</p>
    <form onSubmit={handleSubmit}>
      <label>Username<input autoComplete="username" required minLength="3" value={form.username} onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))} /></label>
      <label>Email<input autoComplete="email" required type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} /></label>
      <label>Password<input autoComplete="new-password" required minLength="6" type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} /></label>
      <Button type="submit" loading={submitting}>Create account</Button>
    </form>
    {message && <p className="status-message error" role="alert">{message}</p>}
    <p>Already registered? <Link to="/login">Log in</Link>.</p>
  </section>;
}
