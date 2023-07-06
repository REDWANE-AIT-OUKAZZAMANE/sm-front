import { Status, useAsyncState } from 'react-async-states';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import Announcements from './Anouncments';
import Card from '../CardsGrid/Card';
import { getSocialMediaType } from '../../../utils';
import { Announcement } from '../../../types';
import useAnimationContext, {
  AnimationContextProps,
} from '../../contexts/animationContext';
import {
  announcements,
  closestAnnouncement,
} from '../../data/sources/AnnouncementsSource';

dayjs.extend(utc);

const AnnoucementOrPost = () => {
  const [announcementToDisplay, setAnnouncementToDisplay] = useState<
    string | Announcement
  >('');

  const { state: announcementState } = useAsyncState(announcements) as any;
  const { state: closestAnnouncementState, run } = useAsyncState(
    closestAnnouncement
  ) as any;

  const [showAnnouncement, setShowAnnoumcement] = useState(false);
  const animationProps: AnimationContextProps | null = useAnimationContext();

  const { maxCards, postsList } = animationProps!;
  const post = postsList[postsList.length - 1];

  useEffect(() => {
    let startTimerId;
    let endTimerId;

    if (announcementToDisplay) {
      if (typeof announcementToDisplay === 'string') setShowAnnoumcement(false);
      if (typeof announcementToDisplay !== 'string') {
        const { startDate, endDate } = announcementToDisplay;
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
  }, [announcementToDisplay]);

  useEffect(() => {
    if (closestAnnouncementState.status === Status.success) {
      setAnnouncementToDisplay(closestAnnouncementState.data.content[0]);
    }
  }, [closestAnnouncementState]);

  useEffect(() => {
    if (announcementState.data) {
      const content = announcementState.data as Announcement | string;
      setAnnouncementToDisplay(content);
    }
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
