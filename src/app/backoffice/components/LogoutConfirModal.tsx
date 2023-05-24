import { Button, Modal } from 'antd';

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
      width={300}
      open={showLogoutModal}
      title="Logout"
      onOk={handelConfirm}
      onCancel={onLogoutCancel}
      footer={
        <div className="flex items-center justify-between ">
          <Button
            key="back"
            onClick={onLogoutCancel}
            className="flex-1 text-dPurple border-2 border-dPurple rounded-lg mr-[20px]"
          >
            No
          </Button>
          ,
          <Button
            className="flex-[2] bg-dPurple text-white"
            style={{ marginLeft: 'auto' }}
            onClick={handelConfirm}
          >
            Yes
          </Button>
          ,
        </div>
      }
    >
      <p>Are you sure you want to Logout ?</p>
    </Modal>
  );
};

export default LogoutModal;
