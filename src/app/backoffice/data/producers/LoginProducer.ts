import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { getData } from '../api';

export type ErrorType = {
  code: number;
};
export type LoginData = {
  email: string;
  password: string;
};
export function getLoginProducer(
  props: ProducerProps<AxiosResponse, AxiosError<ErrorType>, never, [LoginData]>
) {
  const { email, password } = props.args[0];
  return getData(email, password);
}
