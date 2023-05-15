import { addBooleanStatus } from 'react-async-states-utils';

export default function defaultSelector(s) {
  return { header: s.data, ...addBooleanStatus(s) };
}
