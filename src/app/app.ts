import { api, createApplication } from 'react-async-states';
import { AxiosResponse } from 'axios';

import { Media, Page, QueryParams, WallSettings } from './types';
import { WallSettingsCommande } from './backoffice/data/api';

const myApp = {
  media: {
    search: api<Page<Media>, Error, never, [QueryParams]>(),
    toggle_media: api<AxiosResponse<any, any>, Error, any, [string]>(),
    media_visibility: api<AxiosResponse<any, any>, Error, any, [string]>(),
  },
  wall: {
    add_wall_settings: api<
      AxiosResponse<WallSettings>,
      Error,
      never,
      [WallSettingsCommande]
    >(),
  },
};

export const app = createApplication<typeof myApp>(myApp);
