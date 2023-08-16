import { createSource } from 'async-states';

import { resetPasswordProducer } from '../producers/resetPasswordProducer';

export const resetPassword = createSource(
  'resetPassword',
  resetPasswordProducer
);
