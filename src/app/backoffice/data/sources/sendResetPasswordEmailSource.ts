import { createSource } from 'async-states';

import { sendResetPasswordEmailProducer } from '../producers/sendResetPasswordEmailProducer';

export const sendResetPasswordEmail = createSource(
  'resetPassword',
  sendResetPasswordEmailProducer
);
