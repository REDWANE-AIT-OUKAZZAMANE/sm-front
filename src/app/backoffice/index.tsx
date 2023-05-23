import { Route, Routes } from 'react-router-dom';

import Header from './layout/Header';
import Sidemenu from './layout/Sidemenu';
import Content from './layout/Content';
import Login from './pages/Login';
import ProtectedRoutes from './pages/ProtectedRoutes/ProtectedRoutes';
import NotFound from './pages/NotFound/NotFound';
import Moderation from './pages/Moderation';

function index() {
  const user = true;
  return (
    <Routes>
      <Route path="/admin-login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoutes user={user}>
            <div className="h-[100vh] w-[100vw] flex font-backOffice">
              <Sidemenu />
              <div className="flex flex-col flex-1 h-screen">
                <Header />
                <Content />
              </div>
            </div>
          </ProtectedRoutes>
        }
      >
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<div>HOME</div>} />
        <Route path="/admin/moderate" element={<Moderation />} />
      </Route>
    </Routes>
  );
}

export default index;
