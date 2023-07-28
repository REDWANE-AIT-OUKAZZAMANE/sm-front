import { notification } from 'antd';

import successIcon from '../../../assets/icons/successIcon.svg';
import errorIcon from '../../../assets/icons/errorIcon.svg';

export const openSuccessToast = (message: string) => {
  notification.open({
    message: `Success`,
    description: message,
    placement: 'bottomRight',
    icon: <img src={successIcon} alt="successIcon" />,
  });
};

export const openErrorToast = (message: string) => {
  notification.open({
    message: `Error`,
    description: message,
    placement: 'bottomRight',
    icon: <img src={errorIcon} alt="errorIcon" />,
  });
};
