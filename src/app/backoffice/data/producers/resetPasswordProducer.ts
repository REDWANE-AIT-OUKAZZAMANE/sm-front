import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { resetPassword } from '../api';

export function resetPasswordProducer(
  props: ProducerProps<AxiosResponse, Error, never, [string]>
) {
  const userEmail = props.args[0];
  return resetPassword(userEmail);
}
