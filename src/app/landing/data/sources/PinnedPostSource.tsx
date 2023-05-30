import { createSource } from 'react-async-states';

import { subscribeToPinnedPost } from '../producers/PinnedPostProducer';

export const pinedPost = createSource('pinned-post', subscribeToPinnedPost);
