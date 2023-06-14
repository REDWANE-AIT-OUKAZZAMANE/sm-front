import React from 'react';

import NotFound from './app/backoffice/pages/NotFound/NotFound';

const LazyFrontoffice = React.lazy(() => import('./app/landing/page'));
const LazyBackoffice = React.lazy(() => import('./app/backoffice'));

function App() {
  if (window.location.pathname === '/') return <LazyFrontoffice />;
  if (window.location.pathname.startsWith('/admin')) return <LazyBackoffice />;
  return (
    <div className="h-screen w-screen">
      <NotFound />
    </div>
  );
}

export default App;
