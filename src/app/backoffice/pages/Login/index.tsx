import { Button, Form, Input, notification } from 'antd';
import { useAsyncState, Status } from 'react-async-states';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../../assets/LOGO.svg';
import FormRules from '../../../../utils/FormRules';
import './styles.scss';
import { errorCodeToMessage } from '../../../../api/errorCodeToMessage';
import errorIcon from '../../../../assets/icons/errorIcon.svg';
import { getLoginProducer } from '../../data/producers/LoginProducer';
import { currentUserSource } from '../../data/sources/currentUserSource';
import Spinner from '../../../landing/components/Spinner';
import { testIds } from '../../../../tests/constants';

function Login() {
  const navigate = useNavigate();
  const { state, run } = useAsyncState({
    key: 'Login',
    producer: getLoginProducer,
  });
  const { state: currentUserState, run: getCurrentUser } =
    useAsyncState(currentUserSource);

  const { status, data } = state;
  const onFinish = (values) => {
    run(values);
  };
  useEffect(() => {
    if (
      currentUserState.status === Status.success &&
      currentUserState.data !== null
    ) {
      navigate('/admin');
    }
  }, [currentUserState, navigate]);
  useEffect(() => {
    if (status === Status.success) {
      getCurrentUser();
    }
    if (status === Status.error) {
      notification.open({
        message: `error`,
        description: errorCodeToMessage(data.response?.data?.code),
        placement: 'bottomRight',
        icon: <img src={errorIcon} alt="errorIcon" />,
      });
    }
  }, [status, data]);

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
          <Input placeholder="Email_address@google.ma" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[FormRules.required(), FormRules.password()]}
          validateTrigger="onBlur"
        >
          <Input type="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            className="w-full rounded-lg bg-btnPurple px-4 py-2 font-normal uppercase text-white"
            disabled={status === Status.pending}
          >
            {status === Status.pending ? (
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
