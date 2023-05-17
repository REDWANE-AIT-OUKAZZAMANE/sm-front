import { ProducerProps } from 'react-async-states';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import paths from '../../../../../../api/paths';
import { API } from '../../../../../../api';
import { Announcement } from '../../../../types';

dayjs.extend(utc);

export const fetchAnnouncement = async (
  props: ProducerProps<AxiosResponse<Announcement>, Error, never, never>
): Promise<AxiosResponse<Announcement>> => {
  const today = dayjs().format('YYYY-MM-DDTHH:mm:ss');
  const controller = new AbortController();
  props.onAbort(() => controller.abort());
  const Response = await API.get<AxiosResponse<Announcement>>(
    paths.ANNOUNCEMENT.concat(today)
  );
  return Response.data;
};
