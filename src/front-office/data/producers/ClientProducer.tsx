import Sockjs from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';

import { API_BACKEND } from '../../../utils/constants';

export function stompClientProducer(props: any): Promise<{
  client: any;
  subscribe(
    topic: string,
    onMessage: Function
  ): { id: string; unsubscribe: () => void };
}> {
  return new Promise((resolve, reject) => {
    const socket = new Sockjs(API_BACKEND);
    const client = Stomp.over(() => socket);

    client.debug = console.log;

    client.connect(
      {},
      () => {
        console.log('Connected to server');
        const subscriptions: Record<string, { id; unsubscribe: Function }> = {};
        socket.onclose = () => {
          Object.values(subscriptions).forEach((sub) => {
            sub?.unsubscribe?.();
          });
          reject(new Error('Connection closed'));
        };
        socket.onerror = (error) => {
          reject(error);
        };

        resolve({
          client,
          subscribe: (topic, onMessage) => {
            const subscription = client.subscribe(topic, (frame) => {
              console.log('frame', frame);
              onMessage(frame.body);
            });

            const { id } = subscription;
            const unsubscribe = () => {
              subscriptions[id]?.unsubscribe?.();
              delete subscriptions[id];
            };

            subscriptions[id] = subscription;

            return {
              id,
              unsubscribe,
            };
          },
        });
      },
      (error) => {
        console.log('failed to connect to ws server because of', error);
        reject(error);
      }
    );
    props.onAbort(() => client.disconnect());
  });
}
