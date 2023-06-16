import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { Announcement } from '../../../types';
import { AnnouncementAddCommand, addAnnouncement } from '../api';

type ErrorType = {
  code: number;
};

export function addAnnouncementProducer(
  props: ProducerProps<
    AxiosResponse<Announcement>,
    AxiosError<ErrorType>,
    never,
    [AnnouncementAddCommand]
  >
) {
  return addAnnouncement(props.args[0]);
}
