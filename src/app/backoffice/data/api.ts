import { AxiosResponse } from 'axios';

import apiPaths from '../../../api/paths';
import { API } from '../../../api/index';
import { UserData, WallSettings } from '../../types';

export type WallSettingsCommande = {
  title: string;
  logo: File;
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
  wallSettings: WallSettingsCommande
): Promise<AxiosResponse<WallSettings>> => {
  const formData = new FormData();

  formData.append('logo', wallSettings.logo);
  formData.append('title', wallSettings.title);
  return API.post(apiPaths.WALL_SETTINGS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
