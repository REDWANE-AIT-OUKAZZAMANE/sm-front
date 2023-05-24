import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ user, children }) {
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  if (user) return children;
}

export default ProtectedRoutes;
