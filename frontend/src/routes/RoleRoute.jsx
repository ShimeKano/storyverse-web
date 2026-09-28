import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
