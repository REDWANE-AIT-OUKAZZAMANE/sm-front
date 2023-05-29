import { createSource } from 'react-async-states';

import { togglePinMediaProducer } from '../producers/pinnedPostProducer';

export const togglePinMediaSource = createSource(
  'pinningStatus',
  togglePinMediaProducer
);
