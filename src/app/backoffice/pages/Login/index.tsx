import { Button, Form, Input } from 'antd';

import logo from '../../../../assets/LOGO.svg';
import FormRules from '../../../../utils/FormRules';
import './styles.scss';

function Login() {
  const onFinish = (values) => console.log(values);

  return (
    <div className="container flex h-screen w-full justify-center items-center max-w-full">
      <Form onFinish={onFinish} className="w-1/4 min-w-[240px] mb-12">
        <img src={logo} alt="Logo" className="mb-6 mx-auto scale-125" />
        <Form.Item
          name="email"
          rules={[FormRules.required(), FormRules.email()]}
        >
          <Input placeholder="Email_address@google.ma" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[FormRules.required(), FormRules.password()]}
        >
          <Input type="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            htmlType="submit"
            className="bg-[#66328E] text-white font-normal py-2 px-4 w-full rounded-lg uppercase"
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
