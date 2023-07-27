import { addBooleanStatus } from 'react-async-states-utils';

export default function defaultSelector(s) {
  const { data, ...rest } = s;
  return { currentState: s, responseData: data, ...addBooleanStatus(rest) };
}
