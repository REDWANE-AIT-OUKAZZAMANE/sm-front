import { createSource } from 'async-states';

import { fetchAnnouncement } from '../producers/AnnoucementProducer';

export const announcement = createSource('announcement', fetchAnnouncement);
