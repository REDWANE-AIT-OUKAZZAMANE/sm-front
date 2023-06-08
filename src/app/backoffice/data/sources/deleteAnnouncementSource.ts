import { createSource } from 'async-states';

import { deleteAnnouncementProducer } from '../producers/deleteAnnouncementProducer';

export const deleteAnnouncement = createSource(
  'deleteAnnouncement',
  deleteAnnouncementProducer
);
