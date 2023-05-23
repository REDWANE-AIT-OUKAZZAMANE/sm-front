import { Outlet } from 'react-router-dom';

function Content() {
  return (
    <div
      id="mainScrollableContent"
      className="overflow-auto flex-1 mx-[32px] mb-[17px] rounded-2xl shadow-xl border"
    >
      <Outlet />
    </div>
  );
}

export default Content;
