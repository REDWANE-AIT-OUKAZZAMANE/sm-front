import { AxiosResponse } from 'axios';

import apiPaths from '../../../api/paths';
import { API } from '../../../api/index';
import { Announcement, UserData, WallSettings } from '../../types';

type AnnouncementResponse = {
  content: Announcement[];
};

export type WallSettingsCommand = {
  title: string;
  logo?: File;
};
export type AnnouncementCommand = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
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
> => API.get(apiPaths.ANNOUNCEMENTS_LIST);

export const addAnnouncement = (
  announcement: AnnouncementCommand
): Promise<AxiosResponse<Announcement>> =>
  API.post(apiPaths.ANNOUNCEMENTS_LIST, announcement);

export const deleteAnnouncement = (
  announcementId: string
): Promise<AxiosResponse<void>> =>
  API.delete(apiPaths.DELETE_ANNOUNCEMENT(announcementId));
