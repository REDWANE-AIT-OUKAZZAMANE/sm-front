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
      <div className="bg-white text-white w-screen h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
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
            <div className="h-[100vh] w-[100vw] flex font-backOffice">
              <Sidemenu userData={state.data} />
              <div className="flex flex-col flex-1 h-screen ">
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
