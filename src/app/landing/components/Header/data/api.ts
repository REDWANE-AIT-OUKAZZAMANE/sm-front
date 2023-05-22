import { AxiosResponse } from 'axios';

import apiPaths from '../../../../../api/paths';
import { API } from '../../../../../api';
import { HeaderData } from '../../../../types/index';

export const getHeader = (): Promise<AxiosResponse<HeaderData>> =>
  API.get<HeaderData>(apiPaths.HEADER);
