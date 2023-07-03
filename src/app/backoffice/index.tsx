import { Navigate, Route, Routes } from 'react-router-dom';
import { Status, useAsyncState } from 'react-async-states';
import { useEffect, useState } from 'react';

import { currentUserSource } from './data/sources/currentUserSource';
import Header from './layout/Header';
import Sidemenu from './layout/Sidemenu';
import Content from './layout/Content';
import Login from './pages/Login';
import ProtectedRoutes from './pages/ProtectedRoutes/ProtectedRoutes';
import NotFound from './pages/NotFound/NotFound';
import Moderation from './pages/Moderation';
import GeneralSettings from './pages/Settings/GeneralSettings';
import Spinner from '../landing/components/Spinner';

function Index() {
  const { state } = useAsyncState.auto(currentUserSource);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoggedIn(state.status === Status.success && state.data !== null);

    if (state.status !== Status.pending && state.status !== Status.initial) {
      setLoading(false);
    }
  }, [state]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white text-white">
        <Spinner className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/admin-login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoutes user={loggedIn}>
            <div className="flex h-[100vh] w-[100vw] font-backOffice">
              <Sidemenu userData={state.data} />
              <div className="flex h-screen flex-1 flex-col ">
                <Header />
                <Content />
              </div>
            </div>
          </ProtectedRoutes>
        }
      >
        <Route path="*" element={<NotFound />} />
        <Route
          path="/admin"
          element={<Navigate to="/admin/moderate" replace />}
        />
        <Route path="/admin/moderate" element={<Moderation />} />
        <Route
          path="/admin/settings/general-settings"
          element={<GeneralSettings />}
        />
      </Route>
    </Routes>
  );
}

export default Index;
