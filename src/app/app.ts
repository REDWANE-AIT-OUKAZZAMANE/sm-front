import { api, createApplication } from 'react-async-states';

import { Media, Page, QueryParams } from './types';

const myApp = {
  media: {
    search: api<Page<Media>, Error, never, [QueryParams]>(),
  },
};

export const app = createApplication<typeof myApp>(myApp);
