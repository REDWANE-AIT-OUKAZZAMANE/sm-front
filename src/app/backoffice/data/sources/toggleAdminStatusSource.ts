import { createSource } from 'async-states';

import { toggleAdminStatusProducer } from '../producers/toggleAdminStatusProducer';

export const toggleAdminStatus = createSource(
  'toggleAdminStatus',
  toggleAdminStatusProducer
);
