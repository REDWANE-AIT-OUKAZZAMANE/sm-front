import { Modal } from 'antd';

import CloseIcon from '../../../assets/icons/CloseIcon.svg';
import './modalStyle.scss';
import { testIds } from '../../../tests/constants';

interface DeleteAnnouncementModalProps {
  showDeleteModal: boolean;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

const DeleteAnnouncementModal: React.FC<DeleteAnnouncementModalProps> = ({
  showDeleteModal,
  onDeleteConfirm,
  onDeleteCancel,
}) => {
  const handelConfirm = () => {
    onDeleteConfirm();
  };
  return (
    <Modal
      data-testid={testIds.announcements.deleteAnnouncementModal.container}
      width={470}
      open={showDeleteModal}
      title="Delete announcement"
      onOk={handelConfirm}
      onCancel={onDeleteCancel}
      closeIcon={<img src={CloseIcon} alt="icon" />}
      className="font-poppins"
      footer={
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="mr-[60px] inline-flex flex-1 items-center justify-center rounded-[10px] border-2 border-dPurple px-5 py-2.5 text-center font-medium text-dPurple"
            onClick={onDeleteCancel}
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
      maskClosable={false}
    >
      <p>Are you sure you want to delete the announcement ?</p>
    </Modal>
  );
};

export default DeleteAnnouncementModal;
