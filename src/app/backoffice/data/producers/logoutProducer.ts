import { logout } from '../api';
import { currentUserSource } from '../sources/currentUserSource';

export function logoutProducer() {
  logout().then(({ status }) => {
    if (status === 200) {
      currentUserSource.setState(null);
    } else {
      throw new Error('error while login out');
    }
  });
}
