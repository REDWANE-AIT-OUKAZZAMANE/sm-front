import { Button, Form, Input, notification } from 'antd';
import { useAsyncState, Status } from 'react-async-states';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../../assets/LOGO.svg';
import FormRules from '../../../../utils/FormRules';
import './styles.scss';
import { getLoginProducer } from '../../data/producer';
import { errorCodeToMessage } from '../../../../api/errorCodeToMessage';
import errorIcon from '../../../../assets/icons/errorIcon.svg';

function Login() {
  const navigate = useNavigate();

  const { state, run } = useAsyncState({
    key: 'Login',
    producer: getLoginProducer,
  });
  const { status, data } = state;
  const onFinish = (values) => {
    run(values);
  };

  useEffect(() => {
    if (status === Status.success) {
      navigate('/admin');
    }
    if (status === Status.error) {
      notification.open({
        message: `error`,
        description: errorCodeToMessage(data.response?.data?.code),
        placement: 'bottomRight',
        icon: <img src={errorIcon} alt="errorIcon" />,
      });
    }
  }, [status, data, navigate]);

  return (
    <div className="container flex h-screen w-full justify-center items-center max-w-full">
      <Form onFinish={onFinish} className="w-1/4 min-w-[240px] mb-12">
        <img src={logo} alt="Logo" className="mb-6 mx-auto scale-125" />
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
            className="bg-[#66328E] text-white font-normal py-2 px-4 w-full rounded-lg uppercase"
            disabled={status === Status.pending}
          >
            LOGIN
          </Button>
        </Form.Item>
      </Form>
      <div className="absolute bottom-48 left-0 w-full text-center text-gray-500 text-lg py-2">
        All rights reserved @xHub
      </div>
    </div>
  );
}

export default Login;
