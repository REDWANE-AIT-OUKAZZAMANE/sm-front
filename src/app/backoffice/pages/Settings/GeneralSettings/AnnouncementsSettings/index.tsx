import { Button } from 'antd';
import { useState, useRef } from 'react';

import AnnouncementForm from '../AnnounecementForm';
import AnnounecementItem from '../AnnoucemenItem';
import { Announcement } from '../../../../../types';
import './style.scss';

function AnnouncementsSettings() {
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);
  const [announcementFormVisible, setAnnouncementFormVisible] =
    useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const openAnnouncementForm = () => {
    setAnnouncementFormVisible(true);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="announcement-container card-shaddow flex flex-col min-h-[300px] py-6 pl-[32px] pr-[32px] flex-1">
      <div className="flex items-center justify-between h-[40px] mb-[22px]">
        <h1 className="text-[16px] font-semibold">Annoucements</h1>
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
      {announcementList.length === 0 && !announcementFormVisible ? (
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
          className="custom-scrollbar pr-[12px] flex flex-col overflow-auto gap-[12px]"
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
