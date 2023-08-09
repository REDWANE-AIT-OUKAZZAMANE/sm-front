import { ProducerProps } from 'async-states';
import { AxiosError, AxiosResponse } from 'axios';

import { UserData } from '../../../types';
import { UserCommand, addUser } from '../api';

type ErrorType = {
  code: number;
};

export function addUserProducer(
  props: ProducerProps<
    AxiosResponse<UserData>,
    AxiosError<ErrorType>,
    never,
    [UserCommand]
  >
) {
  return addUser(props.args[0]);
}
