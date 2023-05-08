import { ProducerProps, Status } from 'react-async-states';

import { stompClientSource } from '../sources/ClientSource';
import { topics } from '../../../utils/constants';
import { API } from '../../../api';
import { QueryParams, Media } from '../../../types';
import apiPaths from '../../../api/paths';

export const fetchMediaAndSubscribe = (
  props: ProducerProps<Media[], Error, never, [QueryParams]>
) => {
  const controller = new AbortController();
  const clientState = stompClientSource.getState();
  if (clientState.status !== Status.success) {
    throw new Error('Stomp client isnt connected yet');
  }
  const { subscribe } = clientState.data;

  const sub = subscribe(topics.POSTS, (message) => {
    try {
      const newMedia = JSON.parse(message);
      props.emit((prev: any) => [...newMedia, ...prev.data]);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  props.onAbort((reason: any) => {
    controller.abort(reason);
    sub.unsubscribe();
  });

  return API.get(apiPaths.MEDIA, {
    signal: controller.signal,
    params: props.args[0],
  })
    .then((res) => res.data.content)
    .catch(() => []);
};
