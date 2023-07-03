import { useLocation } from 'react-router-dom';

import SmLogo from '../../../../assets/smlogo.svg';
import NavItem from './NavItem';
import { NavItems } from './nav-settings';

function Sidemenu({ userData }) {
  const { pathname } = useLocation();

  return (
    <div className="flex w-[256px] flex-col justify-between bg-xPurple pb-8 pt-3 text-white shadow-[0_64px_64px_-32px_rgba(41,15,0,0.56)]">
      <div className="px-[23px]">
        <img className="mb-[20px] translate-x-[8px]" src={SmLogo} alt="logo" />
        <ul className="flex flex-col gap-[5px]">
          {NavItems.map((item) => (
            <li key={item.name}>
              <NavItem
                item={item}
                active={pathname.split('/')[2] === item.link}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full justify-between px-[34px]">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[23px] font-semibold text-xPurple">
          A
        </div>
        <div className="flex flex-col justify-evenly ">
          <p className="text-[11px] uppercase text-white/30">Admin</p>
          <p className="text-[14px]">{userData?.data?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
