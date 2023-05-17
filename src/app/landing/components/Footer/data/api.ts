import { AxiosResponse } from 'axios';

import apiPaths from '../../../../../api/paths';
import { API } from '../../../../../api/index';
import { FooterData } from '../../../types/index';

export const getFooter = (): Promise<AxiosResponse<FooterData>> =>
  API.get<FooterData>(apiPaths.FOOTER);
