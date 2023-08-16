import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { sendEmails } from '../api';

export type ErrorType = {
  code: number;
};
export function sendEmailsProducer(
  props: ProducerProps<AxiosResponse, AxiosError<ErrorType>, never, [string[]]>
) {
  const ids = props.args[0];
  return sendEmails(ids);
}
