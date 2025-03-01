import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { Announcement } from '../../../../../types';
import AnnouncementForm from '../AnnouncementForm';
import dots from '../../../../../../assets/icons/vertical_dots.svg';
import { ReactComponent as Pen } from '../../../../../../assets/icons/pen.svg';
import { ReactComponent as Bin } from '../../../../../../assets/icons/bin.svg';
import './style.scss';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import { deleteAnnouncement } from '../../../../data/sources/deleteAnnouncementSource';
import { testIds } from '../../../../../../tests/constants';
import {
  openErrorToast,
  openSuccessToast,
} from '../../../../utils/notifications';

type AnnouncementItemProps = {
  announcement: Announcement;
  runGetAnnouncemnets: () => void;
  setLoading: Function;
  editedAnnouncementId: string;
  setEditedAnnouncementId: Function;
  announcementFormVisible: boolean;
};

const dropdownMenu = (
  editAnnouncement,
  setIsdeleteModalOpen,
  setDropdownActionsOpen
) => (
  <div className="announcement-dropdown">
    <button
      onClick={() => editAnnouncement(true)}
      type="button"
      className="mb-2 flex items-center"
      data-testid={testIds.announcements.announcementItem.edit}
    >
      <span className="mr-4">
        <Pen className="icon" />
      </span>{' '}
      Edit announcement
    </button>
    <button
      onClick={() => {
        setIsdeleteModalOpen(true);
        setDropdownActionsOpen(false);
      }}
      type="button"
      className="mt-2 flex items-center"
      data-testid={testIds.announcements.announcementItem.delete}
    >
      <span className="mr-4">
        <Bin className="icon" />
      </span>{' '}
      Delete announcement
    </button>
  </div>
);

function AnnouncementItem({
  announcement,
  runGetAnnouncemnets,
  setLoading,
  editedAnnouncementId: editedAnnouncement,
  setEditedAnnouncementId: setEditedAnnouncement,
  announcementFormVisible: setAnnouncementFormVisible,
}: AnnouncementItemProps) {
  const {
    id: announcementId,
    title,
    description,
    startDate,
    endDate,
  } = announcement;
  const [isDeleteModalOpen, setIsdeleteModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dropdownActionsOpen, setDropdownActionsOpen] = useState(false);

  useEffect(() => {
    if (editedAnnouncement !== announcementId) {
      setEdit(false);
      setDropdownActionsOpen(false);
    }
  }, [editedAnnouncement]);

  function editAnnouncement() {
    setEdit(true);
    setEditedAnnouncement(announcementId);
  }

  function onDeleteSuccess() {
    openSuccessToast('The announcement has been successfully deleted');
    setIsdeleteModalOpen(false);
    runGetAnnouncemnets();
  }

  function onDeleteError() {
    openErrorToast('Failed to delete announcement');
    setIsdeleteModalOpen(false);
  }

  const handleDelete = () => {
    deleteAnnouncement.runc({
      onSuccess: onDeleteSuccess,
      onError: onDeleteError,
      args: [announcementId],
    });
  };

  const handleCancelDelete = () => {
    setIsdeleteModalOpen(false);
  };

  return edit ? (
    <AnnouncementForm
      closeForm={() => {
        setEdit(false);
        setEditedAnnouncement('');
      }}
      edit
      annoucementData={announcement}
      runGetAnnouncements={runGetAnnouncemnets}
      setLoading={setLoading}
    />
  ) : (
    <div
      className="rounded-2xl border border-[#E2E2E2] p-[20px]"
      data-testid={testIds.announcements.announcementItem.container}
    >
      <div className="flex gap-10">
        <div className="max-w-[126px]">
          <h1 className="mb-2 whitespace-nowrap text-lg font-bold text-[color:var(--border-grey)]">
            ANNOUNCMENT TITLE
          </h1>
          <p className="text-xl font-medium text-black">{title}</p>
        </div>
        <div className="flex-1">
          <h1 className="mb-2 whitespace-nowrap text-lg font-bold text-[color:var(--border-grey)]">
            ANNOUNCMENT DESCRIPTION
          </h1>
          <p className="break-all text-xl font-medium text-black">
            {description}
          </p>
        </div>
        <div className="w-[120px]">
          <h1 className="mb-2 whitespace-nowrap text-lg font-bold text-[color:var(--border-grey)]">
            START DATE & TIME
          </h1>
          <div>
            <p className=" text-xl font-medium text-black">
              {dayjs(startDate).format('MMMM D, YYYY')}
            </p>
            <p className=" text-xl font-medium text-black">
              {dayjs(startDate).format('h:mm A')}
            </p>
          </div>
        </div>
        <div className="w-[120px]">
          <h1 className="mb-2 whitespace-nowrap text-lg font-bold text-[color:var(--border-grey)]">
            END DATE & TIME
          </h1>
          <div>
            <p className="text-xl font-medium text-black">
              {dayjs(endDate).format('MMMM D, YYYY')}
            </p>
            <p className="text-xl font-medium text-black">
              {dayjs(endDate).format('h:mm A')}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Dropdown
            disabled={setAnnouncementFormVisible}
            trigger={['click']}
            open={dropdownActionsOpen}
            onOpenChange={(open) => setDropdownActionsOpen(open)}
            dropdownRender={() =>
              dropdownMenu(
                editAnnouncement,
                setIsdeleteModalOpen,
                setDropdownActionsOpen
              )
            }
          >
            <button
              className="h-[20px] px-[10px]"
              type="button"
              data-testid={testIds.announcements.announcementItem.dots}
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
        message="Are you sure you want to delete the announcement ?"
      />
    </div>
  );
}

export default AnnouncementItem;
