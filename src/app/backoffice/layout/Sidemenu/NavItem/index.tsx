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
    <div className="relative font-medium select-none">
      <button
        className={classNames(
          ' px-[24px] py-[18px] w-full rounded-[12px] border-[1px] border-transparent text-[14px] flex items-center cursor-pointer justify-between hover:bg-white/[0.03] ease duration-200',
          {
            'bg-white/[0.03] border-[#5b446d] border-[1px]': active,
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
            'nav-submenu pl-[47px] pr-2 pt-[4px] flex flex-col gap-2 relative after:bg-xPurple',
            { 'short-line': item.subItems.length === 1, animate }
          )}
        >
          {item.subItems.map((subItem) => (
            <li
              className={classNames('flex relative w-full', {
                animate,
              })}
              key={subItem.link}
            >
              <button
                className={classNames(
                  'nav-submenu__item px-[14px] text-left flex-1 py-[8px] rounded-[12px] cursor-pointer hover:bg-white/[0.03] text-[12px] relative fade-in',
                  {
                    'bg-white/[0.03] border-[#5b446d] border-[1px] active':
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
