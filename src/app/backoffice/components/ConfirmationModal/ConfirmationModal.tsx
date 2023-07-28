import { Modal } from 'antd';

import CloseIcon from '../../../../assets/icons/CloseIcon.svg';
import './modalStyle.scss';
import { testIds } from '../../../../tests/constants';

interface ConfirmationModalProps {
  showModal: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showModal,
  onConfirm,
  onCancel,
  message,
}) => {
  const handelConfirm = () => {
    onConfirm();
  };
  return (
    <Modal
      width={470}
      open={showModal}
      title="Logout"
      onOk={handelConfirm}
      onCancel={onCancel}
      closeIcon={<img src={CloseIcon} alt="icon" />}
      className="font-poppins"
      maskClosable={false}
      data-testid={testIds.modalContainer}
      footer={
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="mr-[60px] inline-flex flex-1 items-center justify-center rounded-[10px] border-2 border-dPurple px-5 py-2.5 text-center font-medium text-dPurple"
            onClick={onCancel}
            data-testid={testIds.modalCloseBtn}
          >
            No
          </button>

          <button
            type="button"
            className="inline-flex flex-[2] items-center justify-center rounded-[10px] border-2 border-dPurple bg-[#5F4080] px-5 py-2.5 text-center font-medium text-white hover:bg-darkPurple focus:outline-none"
            style={{ marginLeft: 'auto' }}
            onClick={handelConfirm}
            data-testid={testIds.modalConfirmation}
          >
            Yes
          </button>
        </div>
      }
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
