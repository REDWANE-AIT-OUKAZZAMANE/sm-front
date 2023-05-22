import FrontOffice from './app/landing/page';
import BackOffice from './app/backoffice';
import NotFound from './app/backoffice/pages/NotFound/NotFound';

function App() {
  if (window.location.pathname === '/') return <FrontOffice />;
  if (window.location.pathname.startsWith('/admin')) return <BackOffice />;
  return (
    <div className="h-screen w-screen">
      <NotFound />
    </div>
  );
}

export default App;
