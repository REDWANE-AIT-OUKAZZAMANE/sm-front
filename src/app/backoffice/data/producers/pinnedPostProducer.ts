import { AxiosResponse } from 'axios';
import { ProducerProps } from 'async-states';

import { togglePinMedia } from '../api';

export function togglePinMediaProducer(
  props: ProducerProps<AxiosResponse<void, void>, Error, any, [string]>
) {
  const mediaId = props.args[0];
  return togglePinMedia(mediaId);
}
