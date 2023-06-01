import { ProducerProps } from 'async-states';
import { AxiosResponse } from 'axios';

import { WallSettingsCommande, addWallSettings } from '../api';
import { WallSettings } from '../../../types';

export function addWallSettingsProducer(
  props: ProducerProps<
    AxiosResponse<WallSettings>,
    Error,
    never,
    [WallSettingsCommande]
  >
) {
  const wallSettingsCommande = props.args[0];
  return addWallSettings(wallSettingsCommande);
}
