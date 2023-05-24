import { createSource } from 'react-async-states';

import { getLoginProducer } from '../producers/LoginProducer';

export const loginSource = createSource('userData', getLoginProducer);
