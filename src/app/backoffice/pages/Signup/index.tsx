import { Button, Form, Input } from 'antd';
import { useAsyncState, Status } from 'react-async-states';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import logo from '../../../../assets/LOGO.svg';
import FormRules from '../../../../utils/FormRules';
import './styles.scss';
import { errorCodeToMessage } from '../../../../api/errorCodeToMessage';
import { ErrorType } from '../../data/producers/LoginProducer';
import Spinner from '../../../landing/components/Spinner';
import { testIds } from '../../../../tests/constants';
import defaultSelector from '../../../../api/selector';
import { openErrorToast } from '../../utils/notifications';
import { getSignupProducer } from '../../data/producers/SignupProducer';

function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const location = useLocation();
  const email = queryParameters.get('email')?.substring(1);

  const {
    state: { isPending },
    run,
  } = useAsyncState({
    key: 'SignUp',
    producer: getSignupProducer,
    selector: defaultSelector,
    events: {
      change: [
        {
          status: Status.success,
          handler() {
            navigate('/admin-login');
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
    form.setFieldValue('email', email);
    form.setFieldValue('password', '');
  }, []);

  return (
    <div
      data-testid={testIds.signupPage}
      className="container flex h-screen w-full max-w-full items-center justify-center"
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="mb-12 w-1/4 min-w-[240px]"
      >
        <img src={logo} alt="Logo" className="mx-auto mb-6 scale-125" />
        <Form.Item
          name="email"
          rules={[FormRules.required(), FormRules.email()]}
          validateTrigger="onBlur"
        >
          <Input
            data-testid={testIds.signup.email}
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
            data-testid={testIds.signup.password}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="conirmPassword"
          rules={[
            FormRules.required(),
            FormRules.password(),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                }

                const password = getFieldValue('password');
                if (password !== value) {
                  return Promise.reject(new Error('passwords must match!'));
                }
                return Promise.resolve();
              },
            }),
          ]}
          validateTrigger="onBlur"
        >
          <Input
            data-testid={testIds.signup.passwordConfirm}
            type="password"
            placeholder="Confirm Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            className="w-full rounded-lg bg-btnPurple px-4 py-2 font-normal uppercase text-white"
            disabled={isPending}
            data-testid={testIds.signup.submitBtn}
          >
            {isPending ? (
              <Spinner className="mx-auto h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
            ) : location.pathname.includes('admin-reset-password') ? (
              'RESET PASSWORD'
            ) : (
              'SIGN UP'
            )}
          </Button>
        </Form.Item>
      </Form>
      <div className="absolute bottom-32 left-0 w-full py-2 text-center text-lg text-gray-500">
        All rights reserved @xHub
      </div>
    </div>
  );
}

export default Signup;
