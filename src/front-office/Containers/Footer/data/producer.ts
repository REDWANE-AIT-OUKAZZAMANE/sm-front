import { getFooter } from './api';

export function getFooterProducer() {
  return getFooter().then(({ data }) => data);
}
