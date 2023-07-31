import { ProducerProps, Status } from 'react-async-states';

import { stompClientSource } from '../sources/ClientSource';
import { topics } from '../../../../api/paths';
import { Media } from '../../../types';
import { contextPostsSource } from '../sources/ContextPostsSource';
import { displayedPostsFetchType } from '../../../utils/constants';

export const subscribeToPinnedPost = (
  props: ProducerProps<Media, Error, never, any>
): Promise<Media> => {
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
      contextPostsSource.run(displayedPostsFetchType.togglePin, newMedia);
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
