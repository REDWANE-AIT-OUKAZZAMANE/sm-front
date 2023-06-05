import { Button } from 'antd';
import { useState, useRef } from 'react';
import { Status } from 'async-states';
import classNames from 'classnames';

import AnnouncementForm from '../AnnounecementForm';
import AnnounecementItem from '../AnnoucemenItem';
import { Announcement } from '../../../../../types';
import { app } from '../../../../../app';
import { getAnnouncementsProducer } from '../../../../data/producers/getAnnouncements';
import { useScrollbarVisible } from '../../../../hooks/useScrollbarVisible';
import './style.scss';
import Spinner from '../../../../../landing/components/Spinner';

function AnnouncementsSettings() {
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);
  const [announcementFormVisible, setAnnouncementFormVisible] =
    useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const onGettingSuccess = (result) => {
    const currentAnnouncements = result.state.data.data.content;
    setAnnouncementList([...currentAnnouncements]);
  };

  const { state: announcementsState } = app.wall.getAnnouncements
    .inject(getAnnouncementsProducer)
    .useAsyncState({
      lazy: false,
      events: {
        change: [
          {
            status: Status.success,
            handler: onGettingSuccess,
          },
        ],
      },
    });

  const scrollbarVisible = useScrollbarVisible(
    containerRef,
    announcementsState.status
  );

  const openAnnouncementForm = () => {
    setAnnouncementFormVisible(true);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="announcement-container card-shaddow flex flex-col min-h-[300px] py-6 pl-[32px] pr-[32px] flex-1">
      <div className="flex items-center justify-between h-[40px] mb-[22px]">
        <h1 className="text-[20px] font-semibold">Annoucements</h1>
        {announcementList.length > 0 && (
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
      ) : announcementList.length === 0 && !announcementFormVisible ? (
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
            'custom-scrollbar pr-[12px] flex flex-col overflow-auto gap-[12px]',
            {
              'pr-0': !scrollbarVisible,
            }
          )}
        >
          {announcementFormVisible && (
            <AnnouncementForm
              setAnnouncementList={setAnnouncementList}
              closeForm={() => setAnnouncementFormVisible(false)}
            />
          )}

          {announcementList.map((announcement: Announcement) => (
            <AnnounecementItem
              announcement={announcement}
              key={announcement.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementsSettings;
