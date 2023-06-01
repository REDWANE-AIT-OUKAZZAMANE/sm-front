import { api, createApplication } from 'react-async-states';
import { AxiosResponse } from 'axios';

import { Media, Page, QueryParams } from './types';

const myApp = {
  media: {
    search: api<Page<Media>, Error, never, [QueryParams]>(),
    toggle_media: api<AxiosResponse<any, any>, Error, any, [string]>(),
    media_visibility: api<AxiosResponse<any, any>, Error, any, [string]>(),
  },
};

export const app = createApplication<typeof myApp>(myApp);
