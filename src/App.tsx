import { Routes, Route } from 'react-router-dom';
import { Status } from 'async-states';
import { useAsyncState } from 'react-async-states';

import FrontOffice from './app/landing/page';
import BackOffice from './app/backoffice/login';
import { stompClientSource } from './app/landing/data/sources/ClientSource';

function App() {
  const { state: clientState } = useAsyncState.auto(stompClientSource);
  return (
    <Routes>
      <Route
        path="/"
        element={clientState.status === Status.success && <FrontOffice />}
      />
      <Route path="/admin" element={<BackOffice />} />
    </Routes>
  );
}

export default App;
