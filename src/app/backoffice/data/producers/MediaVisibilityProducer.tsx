import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { updateMediaVisibility } from '../api';

export function MediaVisibilityProducer(
  props: ProducerProps<AxiosResponse<void, void>, Error, any, [string]>
) {
  const mediaId = props.args[0];
  return updateMediaVisibility(mediaId);
}
