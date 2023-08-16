import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { sendSignupEmails } from '../api';

export type ErrorType = {
  code: number;
};
export function sendSignupEmailsProducer(
  props: ProducerProps<AxiosResponse, AxiosError<ErrorType>, never, [string[]]>
) {
  const ids = props.args[0];
  return sendSignupEmails(ids);
}
