import { Button } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { Status } from 'async-states';
import classNames from 'classnames';

import AnnouncementForm from '../AnnounecementForm';
import AnnouncementItem from '../AnnoucemenItem';
import { Announcement } from '../../../../../types';
import { app } from '../../../../../app';
import { getAnnouncementsProducer } from '../../../../data/producers/getAnnouncements';
import { useScrollbarVisible } from '../../../../hooks/useScrollbarVisible';
import './style.scss';
import Spinner from '../../../../../landing/components/Spinner';

function AnnouncementsSettings() {
  const [announcementFormVisible, setAnnouncementFormVisible] =
    useState<boolean>(false);

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
    runGetAnnouncements();
  }, [runGetAnnouncements]);

  return (
    <div className="announcement-container card-shaddow flex flex-col py-6 pl-[32px] pr-[32px] flex-1">
      <div className="flex items-center justify-between h-[40px] mb-[22px]">
        <h1 className="text-[20px] font-semibold">Annoucements</h1>
        {announcementsState.status === Status.success &&
          announcementsState.data.data.content.length > 0 && (
            <Button
              size="large"
              htmlType="button"
              onClick={openAnnouncementForm}
              disabled={announcementFormVisible}
              className="bg-btnPurple text-white font-normal  py-2 px-4 w-[244px] rounded-lg"
            >
              Add announcement
            </Button>
          )}
      </div>
      {announcementsState.status === Status.pending ? (
        <div className="w-full grid place-items-center flex-1">
          <Spinner className="w-12 h-12 mr-2 mb-[22px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
        </div>
      ) : (
        announcementsState.status === Status.success &&
        (announcementsState.data.data.content.length === 0 &&
        !announcementFormVisible ? (
          <div className="flex-1 flex flex-col gap-10 items-center justify-center">
            <p className="text-[color:var(--border-grey)] text-[16px]">
              Please click on the button bellow to start creating the
              announcements.
            </p>
            <Button
              size="large"
              htmlType="button"
              onClick={openAnnouncementForm}
              className="bg-btnPurple text-white font-normal  py-2 px-4 w-[264px] rounded-lg"
            >
              Add announcement
            </Button>
          </div>
        ) : (
          <div
            ref={containerRef}
            className={classNames(
              'custom-scrollbar flex flex-col overflow-auto gap-[12px]',
              {
                'pr-[12px]': scrollbarVisible,
                'pr-[0px]': !scrollbarVisible,
              }
            )}
          >
            {announcementFormVisible && (
              <AnnouncementForm
                refetchAnnouncement={() => runGetAnnouncements}
                closeForm={() => setAnnouncementFormVisible(false)}
              />
            )}

            {announcementsState.data.data.content.map(
              (announcement: Announcement) => (
                <AnnouncementItem
                  announcement={announcement}
                  key={announcement.id}
                  runGetAnnouncemnets={runGetAnnouncements}
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
