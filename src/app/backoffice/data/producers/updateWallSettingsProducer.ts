import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { WallSettingsCommand, updateWallSettings } from '../api';
import { WallSettings } from '../../../types';

export function updateWallSettingsProducer(
  props: ProducerProps<
    AxiosResponse<WallSettings>,
    Error,
    never,
    [string, WallSettingsCommand]
  >
) {
  const wallSettingsId = props.args[0];
  const wallSettingsCommand = props.args[1];
  return updateWallSettings(wallSettingsId, wallSettingsCommand);
}
