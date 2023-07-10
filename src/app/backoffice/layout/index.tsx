import { testIds } from '../../../tests/constants';
import Content from './Content';
import Header from './Header';
import Sidemenu from './Sidemenu';

function Layout({ userData }) {
  return (
    <div
      data-testid={testIds.layout}
      className="flex h-[100vh] w-[100vw] font-backOffice"
    >
      <Sidemenu userData={userData} />
      <div className="flex h-screen flex-1 flex-col ">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default Layout;
