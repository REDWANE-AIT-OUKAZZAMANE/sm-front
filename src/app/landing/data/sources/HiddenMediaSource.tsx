import { createSource } from 'react-async-states';

import { subscribeToPostVisibility } from '../producers/HiddenMediaProducer';

export const hiddenPost = createSource('hiddenpost', subscribeToPostVisibility);
