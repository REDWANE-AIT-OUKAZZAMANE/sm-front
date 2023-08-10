import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { UserCommand, updateUser } from '../api';
import { UserData } from '../../../types';

export function updateUserProducer(
  props: ProducerProps<
    AxiosResponse<UserData>,
    Error,
    never,
    [string, UserCommand]
  >
) {
  return updateUser(props.args[0], props.args[1]);
}
