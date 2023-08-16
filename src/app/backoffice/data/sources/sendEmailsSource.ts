import { createSource } from 'async-states';

import { sendEmailsProducer } from '../producers/sendEmailsProducer';

export const sendEmails = createSource('sendEmails', sendEmailsProducer);
