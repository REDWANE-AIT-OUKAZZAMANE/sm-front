import { createSource } from 'react-async-states';

import { mediaPostsProducer } from '../producers/PostsProducer';

export const mediaPosts = createSource('media-posts', mediaPostsProducer);
