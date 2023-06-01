import { AxiosResponse } from 'axios';

import apiPaths from '../../../api/paths';
import { API } from '../../../api/index';
import { UserData } from '../../types';

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
