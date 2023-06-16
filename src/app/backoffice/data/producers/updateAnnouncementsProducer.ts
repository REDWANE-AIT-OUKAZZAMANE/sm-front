import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { AnnouncementUpdateCommand, updateAnnouncement } from '../api';
import { Announcement } from '../../../types';

export function updateAnnouncementProducer(
  props: ProducerProps<
    AxiosResponse<Announcement>,
    Error,
    never,
    [string, AnnouncementUpdateCommand]
  >
) {
  return updateAnnouncement(props.args[0], props.args[1]);
}
