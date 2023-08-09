import { AxiosResponse } from 'axios';

import apiPaths from '../../../api/paths';
import { API } from '../../../api/index';
import { Announcement, Role, UserData, WallSettings } from '../../types';

type AnnouncementResponse = {
  content: Announcement[];
};

export type AdminResponse = {
  content: UserData[];
};
export type AuthoritieResponse = {
  content: Role[];
};

export type WallSettingsCommand = {
  title: string;
  logo?: File;
};
export type AnnouncementAddCommand = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};
export type AnnouncementUpdateCommand = {
  title: string;
  description: string;
  endDate: string;
  startDate: string;
};

export type UserCommand = {
  firsName: string;
  lastName: string;
  email: string;
  authorities: Role[];
};

export const getData = (email, password): Promise<AxiosResponse> =>
  API.post(apiPaths.LOGIN, {
    email,
    password,
  });

export const logout = (): Promise<AxiosResponse> => API.post(apiPaths.LOGOUT);

export const getCurrentUser = (): Promise<UserData | null> =>
  API.get(apiPaths.CURRENT_USER);

export const togglePinMedia = (mediaId: string): Promise<AxiosResponse<void>> =>
  API.put(apiPaths.TOGGLE_PIN(mediaId));

export const updateMediaVisibility = (
  mediaId: string
): Promise<AxiosResponse<void>> => API.put(apiPaths.MEDIA_VISIBILITY(mediaId));

export const addWallSettings = (
  wallSettings: WallSettingsCommand
): Promise<AxiosResponse<WallSettings>> => {
  const formData = new FormData();

  formData.append('logo', wallSettings.logo as Blob);
  formData.append('title', wallSettings.title);
  return API.post(apiPaths.WALL_SETTINGS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateWallSettings = (
  wallSettingsId: string,
  wallSettings: WallSettingsCommand
): Promise<AxiosResponse<WallSettings>> => {
  const formData = new FormData();

  if (wallSettings.logo !== undefined && wallSettings.logo !== null) {
    formData.append('logo', wallSettings.logo);
  }

  if (wallSettings.title) formData.append('title', wallSettings.title);
  return API.patch(apiPaths.WALL_SETTINGS_UPDATE(wallSettingsId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getWallSettings = (): Promise<AxiosResponse<WallSettings>> =>
  API.get(apiPaths.WALL_SETTINGS_LATEST);

export const getAnnouncements = (): Promise<
  AxiosResponse<AnnouncementResponse>
> => {
  const currentDate = new Date();

  const queryParameters = {
    'endDate.after': currentDate.toISOString(),
    sort: 'startDate,asc',
  };
  return API.get(apiPaths.ANNOUNCEMENTS_LIST, {
    params: queryParameters,
  });
};

export const addAnnouncement = (
  announcement: AnnouncementAddCommand
): Promise<AxiosResponse<Announcement>> =>
  API.post(apiPaths.ANNOUNCEMENTS_LIST, announcement);

export const deleteAnnouncement = (
  announcementId: string
): Promise<AxiosResponse<void>> =>
  API.delete(apiPaths.DELETE_ANNOUNCEMENT(announcementId));

export const updateAnnouncement = (
  announcementId: string,
  announcement: AnnouncementUpdateCommand
): Promise<AxiosResponse<Announcement>> =>
  API.patch(apiPaths.ANNOUNCEMENT_UPDATE(announcementId), announcement);

export const getAdmins = (
  queryParameters
): Promise<AxiosResponse<AdminResponse>> =>
  API.get(apiPaths.USERS, {
    params: queryParameters,
  });
export const getAuthorities = (): Promise<AxiosResponse<AuthoritieResponse>> =>
  API.get(apiPaths.AUTHORITIES);

export const addUser = (user: UserCommand): Promise<AxiosResponse<UserData>> =>
  API.post(apiPaths.USERS, user);
