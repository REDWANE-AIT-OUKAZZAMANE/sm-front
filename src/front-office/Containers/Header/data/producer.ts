import { getHeader } from './api';

export function getHeaderProducer() {
  return getHeader().then(({ data }) => data);
}
