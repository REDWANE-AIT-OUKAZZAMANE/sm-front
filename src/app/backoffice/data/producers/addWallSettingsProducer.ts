import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { WallSettingsCommand, addWallSettings } from '../api';
import { WallSettings } from '../../../types';

export function addWallSettingsProducer(
  props: ProducerProps<
    AxiosResponse<WallSettings>,
    Error,
    never,
    [WallSettingsCommand]
  >
) {
  const wallSettingsCommand = props.args[0];
  return addWallSettings(wallSettingsCommand);
}
