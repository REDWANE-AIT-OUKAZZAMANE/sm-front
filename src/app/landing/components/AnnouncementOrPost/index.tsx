import { useAsyncState, Status } from 'react-async-states';
import { useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AxiosResponse } from 'axios';

import Announcements from './Anouncments';
import qrcode from '../../../../assets/qrcode.svg';
import { announcement } from './data/sources/AnnouncementSource';
import Card from '../CardsGrid/Card';
import { getSocialMediaType } from '../../../utils';
import { Announcement } from '../../../types';
import AnimationContext, {
  AnimationContextProps,
} from '../../contexts/animationContext';

dayjs.extend(utc);

interface Test extends AxiosResponse<Announcement> {
  content: Announcement[];
}

const AnnoucementOrPost = () => {
  const { state: announcementState } = useAsyncState(announcement);
  const [showAnnouncement, setShowAnnoumcement] = useState(false);
  const [showAnnouncementNow, setShowAnnoumcementNow] = useState(false);
  const animationProps: AnimationContextProps | null =
    useContext(AnimationContext);

  const { maxCards, postsList } = animationProps!;
  const post = postsList[postsList.length - 1];
  const announcemntExist = useRef(false);

  useEffect(() => {
    if (announcemntExist.current) {
      setShowAnnoumcementNow(false);
    } else {
      setShowAnnoumcementNow(true);
    }
  }, [postsList]);

  useEffect(() => {
    announcemntExist.current =
      announcementState.status !== Status.success ||
      !announcementState.data ||
      !showAnnouncement;
  }, [announcementState, showAnnouncement]);

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
    <div className="flex flex-col justify-between items-center ml-auto">
      {!showAnnouncementNow ? (
        post && (
          <Card
            key={post?.id}
            media={post}
            type={getSocialMediaType(post?.text || '', post?.source)}
            maxCards={maxCards}
            delay={0}
            variantIsTall
          />
        )
      ) : (
        <Announcements data={(announcementState?.data as Test)?.content?.[0]} />
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

export default AnnoucementOrPost;
