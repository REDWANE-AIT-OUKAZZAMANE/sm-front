import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { setResetPassword } from '../api';

export type ErrorType = {
  code: number;
};
export type SignupData = {
  email: string;
  password: string;
};
export function setResetPasswordProducer(
  props: ProducerProps<
    AxiosResponse,
    AxiosError<ErrorType>,
    never,
    [SignupData]
  >
) {
  const { email, password } = props.args[0];
  return setResetPassword(email, password);
}
