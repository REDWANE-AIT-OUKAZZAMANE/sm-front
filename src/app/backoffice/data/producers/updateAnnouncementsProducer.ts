import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { AnnouncementCommand, updateAnnouncement } from '../api';
import { Announcement } from '../../../types';

export function updateAnnouncementProducer(
  props: ProducerProps<
    AxiosResponse<Announcement>,
    Error,
    never,
    [string, AnnouncementCommand]
  >
) {
  return updateAnnouncement(props.args[0], props.args[1]);
}
