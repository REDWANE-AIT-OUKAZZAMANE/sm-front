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
            className="flex-1 text-dPurple border-2 border-dPurple rounded-[10px] mr-[60px] text-center px-5 py-2.5 inline-flex items-center justify-center font-medium"
            onClick={onLogoutCancel}
          >
            No
          </button>

          <button
            type="button"
            className="flex-[2] text-center text-white bg-[#5F4080] hover:bg-darkPurple focus:outline-none font-medium rounded-[10px] px-5 py-2.5 inline-flex items-center justify-center border-2 border-dPurple"
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
