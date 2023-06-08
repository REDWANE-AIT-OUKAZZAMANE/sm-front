import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { deleteAnnouncement } from '../api';

export function deleteAnnouncementProducer(
  props: ProducerProps<AxiosResponse<void, void>, Error, any, [string]>
) {
  const announcementId = props.args[0];
  return deleteAnnouncement(announcementId);
}
