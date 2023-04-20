import { createSource } from 'react-async-states';

import { stompClientProducer } from '../producers/ClientProducer';

export const stompClientSource = createSource(
  'stomp-client',
  stompClientProducer
);
