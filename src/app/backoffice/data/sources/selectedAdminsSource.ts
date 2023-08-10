import { createSource } from 'async-states';

import { getSelectedAdminsPostsSource } from '../producers/SelectedAdminsProducer';

export const selectedAdmins = createSource(
  'selectedAdmins',
  getSelectedAdminsPostsSource
);
