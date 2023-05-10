import { createSource } from 'react-async-states';

import { getFooterProducer } from './producer';

export const footerSource = createSource('footer', getFooterProducer);
