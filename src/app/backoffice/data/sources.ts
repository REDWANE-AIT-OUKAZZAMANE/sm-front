import { createSource } from 'react-async-states';

import { getLoginProducer } from './producer';

export const loginSource = createSource('userData', getLoginProducer);
