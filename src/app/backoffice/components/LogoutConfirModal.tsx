import { Modal } from 'antd';

import CloseIcon from '../../../assets/icons/CloseIcon.svg';
import './modalStyle.scss';

interface LogoutModalProps {
  showLogoutModal: boolean;
  onLogoutConfirm: () => void;
  onLogoutCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  showLogoutModal,
  onLogoutConfirm,
  onLogoutCancel,
}) => {
  const handelConfirm = () => {
    onLogoutConfirm();
  };
  return (
    <Modal
      width={470}
      open={showLogoutModal}
      title="Logout"
      onOk={handelConfirm}
      onCancel={onLogoutCancel}
      closeIcon={<img src={CloseIcon} alt="icon" />}
      className="font-poppins"
      maskClosable={false}
      footer={
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="mr-[60px] inline-flex flex-1 items-center justify-center rounded-[10px] border-2 border-dPurple px-5 py-2.5 text-center font-medium text-dPurple"
            onClick={onLogoutCancel}
          >
            No
          </button>

          <button
            type="button"
            className="inline-flex flex-[2] items-center justify-center rounded-[10px] border-2 border-dPurple bg-[#5F4080] px-5 py-2.5 text-center font-medium text-white hover:bg-darkPurple focus:outline-none"
            style={{ marginLeft: 'auto' }}
            onClick={handelConfirm}
          >
            Yes
          </button>
        </div>
      }
    >
      <p>Are you sure you want to Logout ?</p>
    </Modal>
  );
};

export default LogoutModal;
