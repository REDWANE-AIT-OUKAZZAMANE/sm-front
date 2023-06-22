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
    if (message !== 'NO_CURRENT_ANNOUNCEMENT_FOUND') {
      try {
        const newAnnouncement = JSON.parse(message);
        props.emit(() => newAnnouncement);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      props.emit(() => 'No announcement found');
    }
  });

  props.onAbort((reason: any) => {
    controller.abort(reason);
    sub.unsubscribe();
  });
  return API.get(apiPaths.CURRENT_ANNOUNCEMENT, {
    signal: controller.signal,
    params: props.args[0],
  })
    .then((res) => res.data)
    .catch(() => []);
};
