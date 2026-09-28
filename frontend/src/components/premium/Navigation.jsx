import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { Avatar, Button, Icon, Logo } from './Ui';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  const go = (path) => { navigate(path); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const submitSearch = (event) => { event.preventDefault(); go(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/'); };

  return <header className="topbar">
    <div className="nav-wrap">
      <button type="button" onClick={() => go('/')} className="logo-click" aria-label="StoryVerse home"><Logo /></button>
      <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        <Button variant={isActive('/') ? 'secondary' : 'ghost'} onClick={() => go('/')} icon="compass">Discover</Button>
        <Button variant={isActive('/profile') ? 'secondary' : 'ghost'} onClick={() => go(isAuthenticated ? '/profile' : '/login')} icon="book">Library</Button>
        <Button variant={isActive('/leaderboard') ? 'secondary' : 'ghost'} onClick={() => go('/leaderboard')} icon="trophy">Rankings</Button>
        <Button variant={isActive('/creator') ? 'secondary' : 'ghost'} onClick={() => go('/creator')} icon="pen">Create</Button>
        <div className="mobile-auth-actions">
          {isAuthenticated ? <><Button variant="ghost" onClick={() => go('/profile')}>Profile</Button><Button variant="ghost" onClick={() => { logout(); go('/'); }}>Log out</Button></> : <><Button variant="ghost" onClick={() => go('/login')}>Log in</Button><Button variant="secondary" onClick={() => go('/register')}>Join StoryVerse</Button></>}
        </div>
      </nav>
      <div className="nav-actions">
        <form className="search" role="search" onSubmit={submitSearch}>
          <Icon name="search" />
          <input aria-label="Search stories" placeholder="Search worlds, authors…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </form>
        {isAuthenticated ? <>
          <Button variant="icon" icon="bell" ariaLabel="Notifications" />
          <button type="button" className="avatar-button" onClick={() => go('/profile')} aria-label={`Open ${user?.username || 'your'} profile`}><Avatar /></button>
          <Button variant="ghost" onClick={() => { logout(); go('/'); }}>Log out</Button>
        </> : <>
          <Button variant="ghost" onClick={() => go('/login')}>Log in</Button>
          <Button variant="secondary" onClick={() => go('/register')}>Join</Button>
        </>}
        <Button variant="icon" icon={open ? 'close' : 'menu'} className="menu-button" ariaLabel={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen((current) => !current)} />
      </div>
    </div>
  </header>;
}
