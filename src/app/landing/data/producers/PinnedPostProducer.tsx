import { ProducerProps, Status } from 'react-async-states';

import { stompClientSource } from '../sources/ClientSource';
import { topics } from '../../../../api/paths';
import { Media } from '../../../types';

export function SubscribeToPinnedPost(
  props: ProducerProps<Media, Error, never, never>
) {
  const controller = new AbortController();
  const clientState = stompClientSource.getState();
  if (clientState.status !== Status.success) {
    throw new Error('Stomp client isnt connected yet');
  }
  const { subscribe } = clientState.data;

  const sub = subscribe(topics.PINNEDPOST, (message) => {
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
}
