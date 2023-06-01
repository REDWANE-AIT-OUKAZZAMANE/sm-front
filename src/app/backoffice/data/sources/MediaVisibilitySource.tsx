import { createSource } from 'react-async-states';

import { MediaVisibilityProducer } from '../producers/MediaVisibilityProducer';

export const MediaVisibilitySource = createSource(
  'MediaVisibilityStatus',
  MediaVisibilityProducer
);
