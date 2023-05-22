import { Outlet } from 'react-router-dom';

function Content() {
  return (
    <div className="overflow-y-scroll flex-1">
      <Outlet />
    </div>
  );
}

export default Content;
