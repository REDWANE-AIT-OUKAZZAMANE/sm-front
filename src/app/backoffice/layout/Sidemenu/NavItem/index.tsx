import classNames from 'classnames';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import downChevron from '../../../../../assets/icons/downChevron.svg';
import './styles.scss';

function NavItem({ item, active }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const handleItemClick = () => {
    if (!item.subItems) {
      navigate(item.link);
    } else {
      setAnimate(!animate);
    }
  };
  return (
    <div className="relative select-none font-medium">
      <button
        className={classNames(
          ' ease flex w-full cursor-pointer items-center justify-between rounded-[12px] border-[1px] border-transparent px-[24px] py-[18px] text-[14px] duration-200 hover:bg-white/[0.03]',
          {
            'border-[1px] border-[#5b446d] bg-white/[0.03]': active,
          }
        )}
        onClick={handleItemClick}
        type="button"
      >
        <div className="flex items-center text-[14px]">
          <img className="mr-[16px]" src={item.icon} alt="icon" />
          {item.name}
        </div>
        {item.subItems && (
          <img
            src={downChevron}
            alt="chevron"
            className={classNames('ease duration-200', {
              'rotate-180': animate,
            })}
          />
        )}
      </button>
      {item.subItems && (
        <ul
          className={classNames(
            'nav-submenu relative flex flex-col gap-2 pl-[47px] pr-2 pt-[4px] after:bg-xPurple',
            { 'short-line': item.subItems.length === 1, animate }
          )}
        >
          {item.subItems.map((subItem) => (
            <li
              className={classNames('relative flex w-full', {
                animate,
              })}
              key={subItem.link}
            >
              <button
                className={classNames(
                  'nav-submenu__item fade-in relative flex-1 cursor-pointer rounded-[12px] px-[14px] py-[8px] text-left text-[12px] hover:bg-white/[0.03]',
                  {
                    'active border-[1px] border-[#5b446d] bg-white/[0.03]':
                      pathname.split('/')[3] === subItem.link.split('/')[1],
                    animate,
                  }
                )}
                type="button"
                onClick={() => navigate(subItem.link)}
              >
                {subItem.name}
              </button>
              <div className="hook" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NavItem;
