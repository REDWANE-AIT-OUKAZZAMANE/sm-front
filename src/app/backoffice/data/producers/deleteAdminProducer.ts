import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { deleteAdmin } from '../api';

export function deleteAdminProducer(
  props: ProducerProps<AxiosResponse<void, void>, Error, any, [string]>
) {
  const adminId = props.args[0];
  return deleteAdmin(adminId);
}
