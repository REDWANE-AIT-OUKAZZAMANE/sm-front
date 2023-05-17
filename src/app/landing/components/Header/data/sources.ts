import { createSource } from 'react-async-states';

import { getHeaderProducer } from './producer';

export const headerSource = createSource('header', getHeaderProducer);
