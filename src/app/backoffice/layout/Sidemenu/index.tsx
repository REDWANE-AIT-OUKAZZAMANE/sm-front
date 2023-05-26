import { useLocation } from 'react-router-dom';

import SmLogo from '../../../../assets/smlogo.svg';
import NavItem from './NavItem';
import { NavItems } from './nav-settings';

function Sidemenu({ userData }) {
  const { pathname } = useLocation();

  return (
    <div className="bg-xPurple w-[256px] flex flex-col justify-between pt-3 pb-8 text-white shadow-[0_64px_64px_-32px_rgba(41,15,0,0.56)]">
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
        <div className="h-[42px] w-[42px] rounded-full flex items-center justify-center bg-white text-[23px] text-xPurple font-semibold">
          A
        </div>
        <div className="flex flex-col justify-evenly ">
          <p className="uppercase text-white/30 text-[11px]">Admin</p>
          <p className="text-[14px]">{userData?.data?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
