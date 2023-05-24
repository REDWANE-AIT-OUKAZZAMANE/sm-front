import { createSource } from 'async-states';

import { currentUserProducer } from '../producers/currentUserProducer';

export const currentUserSource = createSource(
  'currentUser',
  currentUserProducer
);
