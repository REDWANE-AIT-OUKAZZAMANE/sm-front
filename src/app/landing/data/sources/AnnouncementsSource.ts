import { createSource } from 'react-async-states';

import { fetchAnnouncementAndSubscribe } from '../producers/AnnouncementsProducer';

export const announcements = createSource(
  'announcements',
  fetchAnnouncementAndSubscribe
);
