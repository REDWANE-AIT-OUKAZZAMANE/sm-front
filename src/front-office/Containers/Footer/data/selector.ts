import { addBooleanStatus } from 'react-async-states-utils';

export default function defaultSelector(s) {
  return { footer: s.data, ...addBooleanStatus(s) };
}
