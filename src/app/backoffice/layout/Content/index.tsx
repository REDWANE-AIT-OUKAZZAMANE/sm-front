import { Outlet } from 'react-router-dom';

function Content() {
  return (
    <div className="mb-[20px] h-screen max-h-[calc(100vh-113px)]">
      <Outlet />
    </div>
  );
}

export default Content;
