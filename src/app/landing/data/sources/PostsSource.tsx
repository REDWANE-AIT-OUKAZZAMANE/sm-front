import { createSource } from 'react-async-states';

import { fetchMediaAndSubscribe } from '../producers/PostsProducer';

export const mediaPosts = createSource('media-posts', fetchMediaAndSubscribe);
