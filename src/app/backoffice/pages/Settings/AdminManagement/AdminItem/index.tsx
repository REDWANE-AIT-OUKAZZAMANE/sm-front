import { Dropdown, Switch } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { UserData } from '../../../../../types';
import dots from '../../../../../../assets/icons/vertical_dots.svg';
import checkedIcon from '../../../../../../assets/icons/checked.svg';
import { ReactComponent as Pen } from '../../../../../../assets/icons/pen.svg';
import { ReactComponent as Bin } from '../../../../../../assets/icons/bin.svg';
import './style.scss';

type AdminItemProps = {
  admin: UserData;
};

const dropdownMenu = (onEdit, onDelete, setDropdownActionsOpen) => (
  <div className="admin-dropdown">
    <button
      onClick={() => onEdit()}
      type="button"
      className="mb-2 flex items-center"
    >
      <span className="mr-4">
        <Pen className="icon" />
      </span>{' '}
      Edit Admin
    </button>
    <button
      onClick={() => {
        onDelete();
        setDropdownActionsOpen(false);
      }}
      type="button"
      className="mt-2 flex items-center"
    >
      <span className="mr-4">
        <Bin className="icon" />
      </span>{' '}
      Delete Admin
    </button>
  </div>
);

function AdminItem({ admin }: AdminItemProps) {
  const {
    // id: adminId,
    firstName,
    lastName,
    email,
    authorities,
    createdAt,
    activated,
  } = admin;
  const [dropdownActionsOpen, setDropdownActionsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const editAdmin = () => {
    console.log('edit admin');
  };

  const deleteAdmin = () => {
    console.log('delete admin');
  };

  const handleCheck = () => {
    setChecked(!checked);
  };
  return (
    <div className="flex items-center gap-[40px] rounded-2xl border border-[#E2E2E2] p-[10px]">
      <button
        type="button"
        className="flex h-[20px] w-[20px] items-center justify-center rounded border border-dPurple"
        onClick={handleCheck}
      >
        {checked && (
          <img src={checkedIcon} alt="checkedIcon" className="w-[60%]" />
        )}
      </button>
      <div className="flex flex-1 gap-10">
        <div className="flex-1">
          <h1 className="mb-2 whitespace-nowrap text-[10px] font-bold text-[color:var(--border-grey)]">
            FULL NAME
          </h1>
          <p className="text-lg font-medium text-black">
            {`${firstName} ${lastName}`}
          </p>
        </div>
        <div className="flex-1">
          <h1 className="text[10px] mb-2 whitespace-nowrap font-bold text-[color:var(--border-grey)]">
            ROLE
          </h1>
          <div className="flex">
            {authorities.map((auth) => (
              <p className="break-all text-lg font-medium text-black">
                {auth.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text[10px] mb-2 whitespace-nowrap font-bold text-[color:var(--border-grey)]">
            EMAIL ADDRESS
          </h1>
          <p className="break-all text-lg font-medium text-black">{email}</p>
        </div>
        <div className="w-[120px]">
          <h1 className="text[10px] mb-2 whitespace-nowrap font-bold text-[color:var(--border-grey)]">
            CREATION DATE
          </h1>
          <div>
            <p className=" text-lg font-medium text-black">
              {dayjs(createdAt).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
        <div className="w-[120px]">
          <h1 className="text[10px] mb-2 whitespace-nowrap font-bold text-[color:var(--border-grey)]">
            STATUS
          </h1>
          <Switch
            className={classNames(`w-[35px]`, {
              ' bg-dPurple': activated,
              'bg-darkGrey': !activated,
            })}
            checked={activated}
            size="small"
            style={{
              background: activated ? '#5F4080' : '#8D91A0',
            }}
          />
        </div>

        <div className="flex items-center">
          <Dropdown
            trigger={['click']}
            open={dropdownActionsOpen}
            onOpenChange={(open) => setDropdownActionsOpen(open)}
            dropdownRender={() =>
              dropdownMenu(editAdmin, deleteAdmin, setDropdownActionsOpen)
            }
          >
            <button className="h-[20px] px-[10px]" type="button">
              <img src={dots} alt="fots" />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default AdminItem;
