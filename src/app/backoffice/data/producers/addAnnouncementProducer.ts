import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { Announcement } from '../../../types';
import { AnnouncementCommand, addAnnouncement } from '../api';

export function addAnnouncementProducer(
  props: ProducerProps<
    AxiosResponse<Announcement>,
    Error,
    never,
    [AnnouncementCommand]
  >
) {
  return addAnnouncement(props.args[0]);
}
