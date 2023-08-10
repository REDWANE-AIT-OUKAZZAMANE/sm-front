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
import {
  openErrorToast,
  openSuccessToast,
} from '../../../../utils/notifications';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import { defaultAdminsQueryParams } from '../../../../../utils/constants';
import { deleteAdmin } from '../../../../data/sources/deleteAdminSource';
import { testIds } from '../../../../../../tests/constants';

type AdminItemProps = {
  admin: UserData;
  runGetAdmins: (queryparams) => void;
};

const dropdownMenu = (onEdit, onDelete, setDropdownActionsOpen) => (
  <div className="admin-dropdown">
    <button
      onClick={() => onEdit(true)}
      type="button"
      className="mb-2 flex items-center"
      data-testid={testIds.users.userItem.edit}
    >
      <span className="mr-4">
        <Pen className="icon" />
      </span>{' '}
      Edit Admin
    </button>
    <button
      onClick={() => {
        onDelete(true);
        setDropdownActionsOpen(false);
      }}
      type="button"
      className="mt-2 flex items-center"
      data-testid={testIds.users.userItem.delete}
    >
      <span className="mr-4">
        <Bin className="icon" />
      </span>{' '}
      Delete Admin
    </button>
  </div>
);

function AdminItem({ admin, runGetAdmins }: AdminItemProps) {
  const {
    id: adminId,
    firstName,
    lastName,
    email,
    authorities,
    createdAt,
    activated,
  } = admin;
  const [isDeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [dropdownActionsOpen, setDropdownActionsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const editAdmin = () => {
    console.log('edit admin');
  };
  const handleCheck = () => {
    setChecked(!checked);
  };

  function onDeleteSuccess() {
    openSuccessToast('The admin has been successfully deleted');
    setIsdeleteModalOpen(false);
    runGetAdmins(defaultAdminsQueryParams);
  }

  function onDeleteError() {
    openErrorToast('Failed to delete admin');
    setIsdeleteModalOpen(false);
  }

  const handleDelete = () => {
    deleteAdmin.runc({
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      args: [adminId],
    });
  };

  const handleCancelDelete = () => {
    setIsdeleteModalOpen(false);
  };
  return (
    <div
      className="flex items-center gap-[40px] rounded-2xl border border-[#E2E2E2] p-[10px]"
      data-testid={testIds.users.userItem.container}
    >
      <button
        type="button"
        className="flex h-[20px] w-[20px] items-center justify-center rounded border border-dPurple"
        onClick={handleCheck}
        data-testid={testIds.users.userItem.checkbox}
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
                {auth && auth.name}
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
            data-testid={testIds.users.userItem.switch}
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
              dropdownMenu(
                editAdmin,
                setIsdeleteModalOpen,
                setDropdownActionsOpen
              )
            }
          >
            <button
              className="h-[20px] px-[10px]"
              data-testid={testIds.users.userItem.dots}
              type="button"
            >
              <img src={dots} alt="fots" />
            </button>
          </Dropdown>
        </div>
      </div>
      <ConfirmationModal
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
        showModal={isDeleteModalOpen}
        title="Confirmation"
        message="Are you sure you want to delete this admin ?"
      />
    </div>
  );
}

export default AdminItem;
