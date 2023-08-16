import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { sendResetPasswordEmail } from '../api';

export function sendResetPasswordEmailProducer(
  props: ProducerProps<AxiosResponse, Error, never, [string]>
) {
  const userEmail = props.args[0];
  return sendResetPasswordEmail(userEmail);
}
