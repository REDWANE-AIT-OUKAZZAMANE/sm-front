import { api, createApplication } from 'react-async-states';
import { AxiosError, AxiosResponse } from 'axios';

import {
  Media,
  Page,
  QueryParams,
  WallSettings,
  Announcement,
  UserData,
} from './types';
import {
  WallSettingsCommand,
  AnnouncementAddCommand,
  AnnouncementUpdateCommand,
  AuthoritieResponse,
  UserCommand,
} from './backoffice/data/api';

type AnnouncementResponse = {
  content: Announcement[];
};
type AdminResponse = {
  content: UserData[];
};
type ErrorType = {
  code: number;
};

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

    getAnnouncements: api<
      AxiosResponse<AnnouncementResponse>,
      Error,
      never,
      never
    >(),

    addAnnouncement: api<
      AxiosResponse<Announcement>,
      AxiosError<ErrorType>,
      never,
      [AnnouncementAddCommand]
    >(),

    deleteAnnouncement: api<AxiosResponse<void>, Error, any, [string]>(),
    updateAnnouncement: api<
      AxiosResponse<Announcement>,
      Error,
      never,
      [string, AnnouncementUpdateCommand]
    >(),
    getAdmins: api<AxiosResponse<AdminResponse>, Error, never, [QueryParams]>(),
    getAuthorities: api<
      AxiosResponse<AuthoritieResponse>,
      Error,
      never,
      never
    >(),
    addUser: api<
      AxiosResponse<UserData>,
      AxiosError<ErrorType>,
      never,
      [UserCommand]
    >(),
  },
};

export const app = createApplication<typeof myApp>(myApp);
