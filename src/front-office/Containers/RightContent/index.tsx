import { useAsyncState, Status } from 'react-async-states';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AxiosResponse } from 'axios';

import Announcements from '../../components/Anouncements';
import qrcode from '../../../assets/qrcode.svg';
import { announcement } from '../../data/sources/AnnouncementSource';
import { mediaPosts } from '../../data/sources/PostsSource';
import Card from '../../components/Card';
import { getSocialMediaType } from '../../../utils';
import Spinner from '../../components/Spinner';
import { Announcement } from '../../../types';

dayjs.extend(utc);

interface Test extends AxiosResponse<Announcement> {
  content: Announcement[];
}

const RightContent = () => {
  const { state: postState } = useAsyncState.auto(mediaPosts);
  const { state: announcementState } = useAsyncState.auto(announcement);
  const [showAnnouncement, setShowAnnoumcement] = useState(false);

  useEffect(() => {
    let startTimerId;
    let endTimerId;

    if (announcementState.data && !('message' in announcementState.data)) {
      const { content } = announcementState.data as Test;
      if (content && content.length > 0) {
        const { startDate, endDate } = content[0];
        const startTimer = dayjs().diff(startDate) * -1;
        const endTimer = dayjs().diff(endDate) * -1;

        startTimerId = setTimeout(() => {
          setShowAnnoumcement(true);
        }, startTimer);
        endTimerId = setTimeout(() => {
          setShowAnnoumcement(false);
        }, endTimer);
      }
    }

    return () => {
      clearTimeout(startTimerId);
      clearTimeout(endTimerId);
    };
  }, [announcementState.data]);

  return (
    <div className="grid gap-10 h-max flex-col justify-between items-center ml-auto">
      {announcementState.status !== Status.success ||
      !announcementState.data ||
      !showAnnouncement ? (
        postState.status !== Status.success || postState.data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Spinner className="w-12 h-12 animate-spin dark:text-gray-600 fill-blue-600" />
          </div>
        ) : (
          <Card
            media={postState.data[0]}
            type={getSocialMediaType(
              postState.data[0].text || '',
              postState.data[0].source
            )}
            variantIsTall
          />
        )
      ) : (
        <Announcements data={(announcementState.data as Test).content[0]} />
      )}

      <div className="flex items-center justify-center flex-col w-[25vh] mx-auto">
        <p className="text-[2.2vh]">Engage with us</p>
        <div className="max-w-[70%] flex items-center aspect-square rounded-2xl">
          <img className="" src={qrcode} alt="qrcode" />
        </div>
      </div>
    </div>
  );
};
export default RightContent;
