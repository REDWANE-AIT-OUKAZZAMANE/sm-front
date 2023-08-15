import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { toggleAdminStatus } from '../api';

export function toggleAdminStatusProducer(
  props: ProducerProps<AxiosResponse, Error, never, [string]>
) {
  return toggleAdminStatus(props.args[0]);
}
