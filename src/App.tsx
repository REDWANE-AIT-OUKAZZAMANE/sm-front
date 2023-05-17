import { Routes, Route } from 'react-router-dom';

import FrontOffice from './app/landing/page';
import BackOffice from './app/backoffice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontOffice />} />
      <Route path="/admin" element={<BackOffice />} />
    </Routes>
  );
}

export default App;
