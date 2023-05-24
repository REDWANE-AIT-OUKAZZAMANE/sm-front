import { createSource } from 'async-states';

import { logoutProducer } from '../producers/logoutProducer';

export const logoutSource = createSource('logout', logoutProducer);
