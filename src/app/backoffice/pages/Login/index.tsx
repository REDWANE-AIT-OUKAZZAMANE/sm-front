import { Button, Form, Input } from 'antd';
import { useAsyncState, Status } from 'react-async-states';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import logo from '../../../../assets/LOGO.svg';
import FormRules from '../../../../utils/FormRules';
import './styles.scss';
import { errorCodeToMessage } from '../../../../api/errorCodeToMessage';
import {
  ErrorType,
  getLoginProducer,
} from '../../data/producers/LoginProducer';
import { currentUserSource } from '../../data/sources/currentUserSource';
import Spinner from '../../../landing/components/Spinner';
import { testIds } from '../../../../tests/constants';
import defaultSelector from '../../../../api/selector';
import { openErrorToast } from '../../utils/notifications';

function Login() {
  const navigate = useNavigate();
  const {
    state: { responseData: currentUserData, isSuccess: isCurrentUserSuccess },
    run: getCurrentUser,
  } = useAsyncState({
    source: currentUserSource,
    selector: defaultSelector,
  });

  const {
    state: { isPending },
    run,
  } = useAsyncState({
    key: 'Login',
    producer: getLoginProducer,
    selector: defaultSelector,
    events: {
      change: [
        {
          status: Status.success,
          handler() {
            getCurrentUser();
          },
        },
        {
          status: Status.error,
          handler(result) {
            const data = result.state.data as AxiosError<ErrorType, any>;
            openErrorToast(errorCodeToMessage(data.response?.data?.code));
          },
        },
      ],
    },
  });

  const onFinish = (values) => {
    run(values);
  };
  useEffect(() => {
    if (isCurrentUserSuccess && currentUserData !== null) {
      navigate('/admin');
    }
  }, [currentUserData, isCurrentUserSuccess, navigate]);

  return (
    <div
      data-testid={testIds.loginPage}
      className="container flex h-screen w-full max-w-full items-center justify-center"
    >
      <Form onFinish={onFinish} className="mb-12 w-1/4 min-w-[240px]">
        <img src={logo} alt="Logo" className="mx-auto mb-6 scale-125" />
        <Form.Item
          name="email"
          rules={[FormRules.required(), FormRules.email()]}
          validateTrigger="onBlur"
        >
          <Input
            data-testid={testIds.auth.email}
            placeholder="email@domain.com"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[FormRules.required(), FormRules.password()]}
          validateTrigger="onBlur"
        >
          <Input
            data-testid={testIds.auth.password}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            className="w-full rounded-lg bg-btnPurple px-4 py-2 font-normal uppercase text-white"
            disabled={isPending}
            data-testid={testIds.auth.submitBtn}
          >
            {isPending ? (
              <Spinner className="mx-auto h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
            ) : (
              'LOGIN'
            )}
          </Button>
        </Form.Item>
      </Form>
      <div className="absolute bottom-48 left-0 w-full py-2 text-center text-lg text-gray-500">
        All rights reserved @xHub
      </div>
    </div>
  );
}

export default Login;
