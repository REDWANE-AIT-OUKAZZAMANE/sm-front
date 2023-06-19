import { useAsyncState } from 'react-async-states';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import Announcements from './Anouncments';
import Card from '../CardsGrid/Card';
import { getSocialMediaType } from '../../../utils';
import { Announcement } from '../../../types';
import AnimationContext, {
  AnimationContextProps,
} from '../../contexts/animationContext';
import { announcements } from '../../data/sources/AnnouncementsSource';

dayjs.extend(utc);

const AnnoucementOrPost = () => {
  const { state: announcementState, run } = useAsyncState(announcements) as any;
  const [showAnnouncement, setShowAnnoumcement] = useState(false);
  const animationProps: AnimationContextProps | null =
    useContext(AnimationContext);

  const { maxCards, postsList } = animationProps!;
  const post = postsList[postsList.length - 1];

  useEffect(() => {
    let startTimerId;
    let endTimerId;

    if (announcementState.data && !('message' in announcementState.data)) {
      const content = announcementState.data as Announcement;
      if (content) {
        const { startDate, endDate } = content;
        const startTimer = dayjs().diff(startDate) * -1;
        const endTimer = dayjs().diff(endDate) * -1;

        if (startTimer < 0 && endTimer > 0) {
          setShowAnnoumcement(true);
        } else {
          setShowAnnoumcement(false);
        }

        startTimerId = setTimeout(() => {
          setShowAnnoumcement(true);
        }, startTimer);
        endTimerId = setTimeout(() => {
          setShowAnnoumcement(false);
          run();
        }, endTimer);
      }
    }

    return () => {
      clearTimeout(startTimerId);
      clearTimeout(endTimerId);
    };
  }, [announcementState.data]);

  return !showAnnouncement ? (
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
    <Announcements data={announcementState?.data as Announcement} />
  );
};

export default AnnoucementOrPost;
