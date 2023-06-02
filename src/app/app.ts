import { api, createApplication } from 'react-async-states';
import { AxiosResponse } from 'axios';

import { Media, Page, QueryParams, WallSettings } from './types';
import { WallSettingsCommand } from './backoffice/data/api';

const myApp = {
  media: {
    search: api<Page<Media>, Error, never, [QueryParams]>(),
    toggle_media: api<AxiosResponse<any, any>, Error, any, [string]>(),
    media_visibility: api<AxiosResponse<any, any>, Error, any, [string]>(),
  },
  wall: {
    addWallSettings: api<
      AxiosResponse<WallSettings>,
      Error,
      never,
      [WallSettingsCommand]
    >(),
    updateWallSettings: api<
      AxiosResponse<WallSettings>,
      Error,
      never,
      [string, WallSettingsCommand]
    >(),
    getWallSettings: api<AxiosResponse<WallSettings>, Error, never, never>(),
  },
};

export const app = createApplication<typeof myApp>(myApp);
