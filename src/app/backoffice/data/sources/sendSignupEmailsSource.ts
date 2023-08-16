import { createSource } from 'async-states';

import { sendSignupEmailsProducer } from '../producers/sendSignupEmailsProducer';

export const sendSignupEmails = createSource(
  'sendEmails',
  sendSignupEmailsProducer
);
