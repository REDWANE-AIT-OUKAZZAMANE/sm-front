import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { AdminResponse, getAdmins } from '../api';
import { QueryParams } from '../../../types';

export function getAdminsProducer(
  props: ProducerProps<
    AxiosResponse<AdminResponse>,
    Error,
    never,
    [QueryParams]
  >
) {
  const queryParams = props.args[0];
  return getAdmins(queryParams);
}
