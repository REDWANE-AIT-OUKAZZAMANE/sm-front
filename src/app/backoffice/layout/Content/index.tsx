import { Outlet } from 'react-router-dom';

function Content() {
  return (
    <div className="max-h-[calc(100vh-113px)] mb-[20px]">
      <Outlet />
    </div>
  );
}

export default Content;
