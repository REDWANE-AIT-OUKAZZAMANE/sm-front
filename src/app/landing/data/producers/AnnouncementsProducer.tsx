import dayjs from 'dayjs';
import { ProducerProps, Status } from 'react-async-states';

import { stompClientSource } from '../sources/ClientSource';
import apiPaths, { topics } from '../../../../api/paths';
import { API } from '../../../../api';
import { Announcement } from '../../../types';

export const fetchAnnouncementAndSubscribe = (
  props: ProducerProps<Announcement | string, Error, never, never>
) => {
  const controller = new AbortController();
  const clientState = stompClientSource.getState();
  if (clientState.status !== Status.success) {
    throw new Error('Stomp client isnt connected yet');
  }
  const { subscribe } = clientState.data;

  const sub = subscribe(topics.ANNOUNCEMENTS, (message) => {
    try {
      const newAnnouncement = JSON.parse(message);
      if (newAnnouncement.data) props.emit(() => newAnnouncement.data);
      else props.emit(() => 'No announcement found');
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  props.onAbort((reason: any) => {
    controller.abort(reason);
    sub.unsubscribe();
  });

  return API.get(apiPaths.ANNOUNCEMENT + dayjs().toISOString(), {
    signal: controller.signal,
    params: props.args[0],
  })
    .then((res) => res.data?.content[0])
    .catch(() => []);
};

export function closestAnnouncementProducer() {
  return API.get(apiPaths.ANNOUNCEMENT + dayjs().toISOString())
    .then((res) => res.data)
    .catch(() => []);
}
