import { AxiosResponse } from 'axios';

import apiPaths from '../../../../api/paths';
import { API } from '../../../../api/index';
import { HeaderData } from '../../../../types/index';

export const getFooter = (): Promise<AxiosResponse<HeaderData>> =>
  API.get<HeaderData>(apiPaths.HEADER);
