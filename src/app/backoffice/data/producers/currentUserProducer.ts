import { getCurrentUser } from '../api';
import { UserData } from '../../../types';

export function currentUserProducer(): Promise<UserData | null> {
  return getCurrentUser();
}
