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
import { toggleAdminStatus } from '../../../../data/sources/toggleAdminStatusSource';
import { testIds } from '../../../../../../tests/constants';
import { selectedAdmins } from '../../../../data/sources/selectedAdminsSource';
import { AdminsSelection } from '../../../../data/producers/SelectedAdminsProducer';
import AdminForm from '../AdminForm/AdminForm';

type AdminItemProps = {
  admin: UserData;
  runGetAdmins: (queryparams) => void;
  setAdminToEdit: Function;
  adminFormVisible: boolean;
};

const dropdownMenu = (onEdit, onDelete, setDropdownActionsOpen) => (
  <div className="admin-dropdown">
    <button
      onClick={() => {
        onEdit(true);
        setDropdownActionsOpen(false);
      }}
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

function AdminItem({
  admin,
  setAdminToEdit,
  runGetAdmins,
  adminFormVisible,
}: AdminItemProps) {
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
  const [edit, setEdit] = useState(false);
  const [isActivated, setIsActivated] = useState(activated);

  function onEdit() {
    setEdit(true);
    setAdminToEdit(adminId);
  }

  function onUpdatingSuccess(result: any): void {
    if (result.data) {
      openSuccessToast(
        `The admin has been successfully ${
          !isActivated ? 'activated' : 'deactivated'
        }`
      );
      setIsActivated(!isActivated);
    }
  }

  const handelToggleAdminStatus = () => {
    toggleAdminStatus.runc({
      args: [adminId],
      onSuccess: onUpdatingSuccess,
      onError: () => {
        openErrorToast('Failed to update admin status');
      },
    });
  };
  const handleCheck = () => {
    if (checked) {
      selectedAdmins.run(AdminsSelection.UNSELECT, adminId);
    } else {
      selectedAdmins.run(AdminsSelection.SELECT, adminId);
    }
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
  return edit ? (
    <AdminForm
      closeForm={() => {
        setEdit(false);
        setAdminToEdit('');
      }}
      edit
      adminData={admin}
      runGetAdmins={runGetAdmins}
    />
  ) : (
    <div
      className="flex items-center gap-[40px] rounded-2xl border border-[#E2E2E2] p-[10px]"
      data-testid={testIds.users.userItem.container}
    >
      <button
        type="button"
        className={classNames(
          `flex h-[20px] w-[20px] items-center justify-center rounded-[5px] border`,
          {
            'border-dPurple': checked,
            'border-darkGrey': !checked,
          }
        )}
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
              <p className="mr-[5px] break-all text-lg font-medium text-black">
                {auth &&
                  auth.name.charAt(5) + auth.name.substring(6).toLowerCase()}
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
        <div className="flex-1">
          <h1 className="text[10px] mb-2 whitespace-nowrap font-bold text-[color:var(--border-grey)]">
            CREATION DATE
          </h1>
          <div>
            <p className=" text-lg font-medium text-black">
              {dayjs(createdAt).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text[10px] mb-2 whitespace-nowrap font-bold text-[color:var(--border-grey)]">
            STATUS
          </h1>
          <Switch
            className={classNames(`w-[35px]`, {
              ' bg-dPurple': isActivated,
              'bg-darkGrey': !isActivated,
            })}
            data-testid={testIds.users.userItem.switch}
            checked={isActivated}
            onClick={handelToggleAdminStatus}
            size="small"
            style={{
              background: isActivated ? '#5F4080' : '#8D91A0',
            }}
          />
        </div>

        <div className="flex items-center">
          <Dropdown
            trigger={['click']}
            open={dropdownActionsOpen}
            onOpenChange={(open) => setDropdownActionsOpen(open)}
            dropdownRender={() =>
              dropdownMenu(onEdit, setIsdeleteModalOpen, setDropdownActionsOpen)
            }
            disabled={adminFormVisible}
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
