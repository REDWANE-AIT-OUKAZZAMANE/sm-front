import { useAsyncState } from 'react-async-states';
import { useState } from 'react';

import logoutIcon from '../../../../assets/icons/logout.svg';
import { logoutSource } from '../../data/sources/logoutSource';
import LogoutModal from '../../components/LogoutConfirModal';

function Header() {
  const { run: logout } = useAsyncState(logoutSource);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };
  return (
    <div className=" h-[93px] flex justify-between items-center px-[34px]">
      <LogoutModal
        onLogoutConfirm={handleLogout}
        onLogoutCancel={handleCancelLogout}
        showLogoutModal={isLogoutModalOpen}
      />
      <h1 className="text-textBlack text-[37px] font-semibold">Title</h1>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setIsLogoutModalOpen(true)}
      >
        <img src={logoutIcon} alt="logout_icon" />
      </button>
    </div>
  );
}

export default Header;
