import { createSource } from 'react-async-states';

import { fetchDisplayedPostsSource } from '../producers/ContextPostsProducer';

export const contextPostsSource = createSource(
  'contextPosts',
  fetchDisplayedPostsSource
);
