import { ProducerProps, Status } from 'react-async-states';

import { stompClientSource } from '../sources/ClientSource';
import { topics } from '../../../../api/paths';
import { Media } from '../../../types';

export const subscribeToPostVisibility = (
  props: ProducerProps<Media, Error, never, never>
): Promise<Media> => {
  const controller = new AbortController();
  const clientState = stompClientSource.getState();
  if (clientState.status !== Status.success) {
    throw new Error('Stomp client not connected yet');
  }
  const { subscribe } = clientState.data;

  const sub = subscribe(topics.MEDIA_VISIBILITY, (message: string) => {
    try {
      const newMedia = JSON.parse(message);
      props.emit(() => newMedia);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  props.onAbort((reason: any) => {
    controller.abort(reason);
    sub.unsubscribe();
  });
  return Promise.resolve({} as Media);
};
