import { useAsyncState } from 'react-async-states';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NavItems } from '../Sidemenu/nav-settings';
import logoutIcon from '../../../../assets/icons/logout.svg';
import { logoutSource } from '../../data/sources/logoutSource';
import LogoutModal from '../../components/LogoutConfirModal';
import { testIds } from '../../../../tests/constants';

function Header() {
  const { run: logout } = useAsyncState(logoutSource);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { pathname } = useLocation();
  const [title, setTitle] = useState('-');

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const pathArray = pathname.split('/');

    // if pathname contains only 1 level after /admin (i.e. /admin/something) only take title from the first level of the nav items array of objects
    if (pathArray.length <= 3) {
      const navItem = NavItems.find(
        (item) => item.link === pathArray[pathArray.length - 1]
      );
      if (navItem) setTitle(navItem.name);
    }

    // if pathname contains 2 level after /admin (i.e. /admin/something/another), find title from subItems of the first level of the nav items array of objects
    if (pathArray.length > 3) {
      const navParent = NavItems.find((item) => item.link === pathArray[2]);
      const navItem = navParent?.subItems?.find(
        (item) => item.link === `${pathArray[2]}/${pathArray[3]}`
      );
      if (navItem) setTitle(navItem.name);
    }
  }, [pathname]);

  return (
    <div
      data-testid={testIds.header}
      className=" flex h-[88px] items-center justify-between px-[34px]"
    >
      <LogoutModal
        onLogoutConfirm={handleLogout}
        onLogoutCancel={handleCancelLogout}
        showLogoutModal={isLogoutModalOpen}
      />
      <h1 className="text-[27px] font-semibold text-textBlack">{title}</h1>
      <button
        type="button"
        className="cursor-pointer"
        data-testid={testIds.logoutBtn}
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <img src={logoutIcon} alt="logout_icon" />
      </button>
    </div>
  );
}

export default Header;
