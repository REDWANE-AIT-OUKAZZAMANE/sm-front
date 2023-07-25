import { Button } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { Status } from 'async-states';
import classNames from 'classnames';

import AnnouncementForm from '../AnnouncementForm';
import AnnouncementItem from '../AnnoucemenItem';
import { Announcement } from '../../../../../types';
import { app } from '../../../../../app';
import { getAnnouncementsProducer } from '../../../../data/producers/getAnnouncements';
import { useScrollbarVisible } from '../../../../hooks/useScrollbarVisible';
import './style.scss';
import Spinner from '../../../../../landing/components/Spinner';
import { testIds } from '../../../../../../tests/constants';

function AnnouncementsSettings() {
  const [announcementFormVisible, setAnnouncementFormVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editedAnnouncement, setEditedAnnouncement] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  const { state: announcementsState, run: runGetAnnouncements } =
    app.wall.getAnnouncements.inject(getAnnouncementsProducer).useAsyncState();

  const openAnnouncementForm = () => {
    setAnnouncementFormVisible(true);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  const scrollbarVisible = useScrollbarVisible(
    containerRef,
    announcementsState.status,
    openAnnouncementForm
  );

  useEffect(() => {
    // @ts-ignore
    runGetAnnouncements();
  }, [runGetAnnouncements]);

  return (
    <div
      className="announcement-container card-shaddow flex flex-1 flex-col py-6 pl-[32px] pr-[32px]"
      data-testid={testIds.announcements.container}
    >
      <div className="mb-[22px] flex h-[40px] items-center justify-between">
        <h1 className="text-[20px] font-semibold">Annoucements</h1>
        {announcementsState.status === Status.success &&
          announcementsState.data.data.content.length > 0 && (
            <Button
              size="large"
              htmlType="button"
              onClick={openAnnouncementForm}
              disabled={announcementFormVisible || editedAnnouncement !== ''}
              className="w-[244px] rounded-lg bg-btnPurple  px-4 py-2 font-normal text-white"
              data-testid={testIds.announcements.addButton}
            >
              Add announcement
            </Button>
          )}
      </div>
      {announcementsState.status === Status.pending || loading ? (
        <div
          className="grid w-full flex-1 place-items-center"
          data-testid={testIds.announcements.Spinner}
        >
          <Spinner className="mb-[22px] mr-2 h-12 w-12 animate-spin fill-dPurple text-gray-200 dark:text-gray-600" />
        </div>
      ) : (
        announcementsState.status === Status.success &&
        (announcementsState.data.data.content.length === 0 &&
        !announcementFormVisible ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-10">
            <p className="text-[16px] text-[color:var(--border-grey)]">
              Please click on the button bellow to start creating the
              announcements.
            </p>
            <Button
              size="large"
              htmlType="button"
              onClick={openAnnouncementForm}
              className="w-[264px] rounded-lg bg-btnPurple  px-4 py-2 font-normal text-white"
              data-testid={testIds.announcements.addButtonEmpty}
            >
              Add announcement
            </Button>
          </div>
        ) : (
          <div
            ref={containerRef}
            className={classNames(
              'custom-scrollbar container-scroll flex grow flex-col gap-[12px] overflow-auto rounded-xl',
              {
                'pr-[12px]': scrollbarVisible,
                'pr-[0px]': !scrollbarVisible,
              }
            )}
          >
            {announcementFormVisible && (
              <AnnouncementForm
                runGetAnnouncements={runGetAnnouncements}
                closeForm={() => setAnnouncementFormVisible(false)}
                setLoading={setLoading}
              />
            )}

            {announcementsState.data.data.content.map(
              (announcement: Announcement) => (
                <AnnouncementItem
                  announcement={announcement}
                  key={announcement.id}
                  runGetAnnouncemnets={runGetAnnouncements}
                  setLoading={setLoading}
                  editedAnnouncementId={editedAnnouncement}
                  setEditedAnnouncementId={setEditedAnnouncement}
                  announcementFormVisible={announcementFormVisible}
                />
              )
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AnnouncementsSettings;
