import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Button, Title } from '../components/premium/Ui';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); setMessage(''); setSubmitting(true);
    try { await login(form); navigate(location.state?.from || '/', { replace: true }); }
    catch (error) { setMessage(error.message); }
    finally { setSubmitting(false); }
  }

  return <section className="auth-card card"><span className="eyebrow">Welcome back</span><Title as={1}>Log in to StoryVerse</Title><p>Continue your stories and return to Creator Studio.</p>
    <form onSubmit={handleSubmit}>
      <label>Username or email<input autoComplete="username" required value={form.usernameOrEmail} onChange={(event) => setForm((current) => ({ ...current, usernameOrEmail: event.target.value }))} /></label>
      <label>Password<input autoComplete="current-password" required type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} /></label>
      <Button type="submit" loading={submitting}>Log in</Button>
    </form>
    {message && <p className="status-message error" role="alert">{message}</p>}
    <p>New to StoryVerse? <Link to="/register">Create an account</Link>.</p>
  </section>;
}
