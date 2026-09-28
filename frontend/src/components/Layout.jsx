import { NavLink, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

function NavItem({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
      {children}
    </NavLink>
  );
}

export default function Layout() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="app-shell">
      <header>
        <h1>StoryVerse Web Game</h1>
        <nav>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/upload">Đăng tải</NavItem>
          <NavItem to="/play">Phần chơi</NavItem>
          <NavItem to="/leaderboard">Bảng xếp hạng</NavItem>
          <NavItem to="/player">Người chơi</NavItem>
          {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && <NavItem to="/admin">Admin/Manager</NavItem>}
        </nav>
        <div className="auth-box">
          {isAuthenticated ? (
            <>
              <span>{user?.username} ({user?.role})</span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <NavItem to="/login">Đăng nhập</NavItem>
              <NavItem to="/register">Đăng ký</NavItem>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
