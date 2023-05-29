import { createSource } from 'react-async-states';

import { SubscribeToPinnedPost } from '../producers/PinnedPostProducer';

export const pinedPost = createSource('pinned-post', SubscribeToPinnedPost);
