import { createSource } from 'react-async-states';

import {
  fetchAnnouncementAndSubscribe,
  closestAnnouncementProducer,
} from '../producers/AnnouncementsProducer';

export const announcements = createSource(
  'announcements',
  fetchAnnouncementAndSubscribe
);

export const closestAnnouncement = createSource(
  'closestAnnouncement',
  closestAnnouncementProducer
);
