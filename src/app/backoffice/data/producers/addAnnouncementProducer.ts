import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { Announcement } from '../../../types';
import { AnnouncementCommand, addAnnouncement } from '../api';

type ErrorType = {
  code: number;
};

export function addAnnouncementProducer(
  props: ProducerProps<
    AxiosResponse<Announcement>,
    AxiosError<ErrorType>,
    never,
    [AnnouncementCommand]
  >
) {
  return addAnnouncement(props.args[0]);
}
