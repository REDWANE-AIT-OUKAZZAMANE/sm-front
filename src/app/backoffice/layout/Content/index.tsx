import { Outlet } from 'react-router-dom';

import { testIds } from '../../../../tests/constants';

function Content() {
  return (
    <div
      data-testid={testIds.content}
      className="mb-[20px] h-screen max-h-[calc(100vh-113px)]"
    >
      <Outlet />
    </div>
  );
}

export default Content;
