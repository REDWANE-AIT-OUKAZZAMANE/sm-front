import { Status } from 'react-async-states';

import { stompClientSource } from '../sources/ClientSource';
import { topics } from '../../../utils/constants';

export function mediaPostsProducer(props: any) {
  const clientState = stompClientSource.getState();
  if (clientState.status !== Status.success) {
    throw new Error('Stomp client isnt connected yet');
  }
  const { subscribe } = clientState.data;

  const sub = subscribe(topics.POSTS, (msg) => {
    console.log('msg', msg);
    const posts = JSON.parse(msg);
    props.emit((prev) => {
      if (prev.status !== Status.success) {
        return prev;
      }
      return posts;
    });
  });

  props.onAbort(() => sub.unsubscribe());
  return [];
}
