import { Navigate, Outlet } from 'react-router-dom';

import { AUTHORITIES } from '../../../utils/constants';

function ProtectedAdminRoutes({ user }) {
  if (
    user &&
    user.data.authorities.find((role) => role.name === AUTHORITIES.ADMIN)
  ) {
    return <Outlet />;
  }
  return <Navigate to="/admin" replace />;
}

export default ProtectedAdminRoutes;
