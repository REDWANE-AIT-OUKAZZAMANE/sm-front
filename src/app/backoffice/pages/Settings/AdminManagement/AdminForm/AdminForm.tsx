import { useState } from 'react';
import { Input, Form, Select } from 'antd';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import xIcon from '../../../../../../assets/icons/x.svg';
import checkmarkIcon from '../../../../../../assets/icons/checkmark.svg';
import selectIcon from '../../../../../../assets/icons/selectIcon.svg';
import './styles.scss';
import FormRules from '../../../../../../utils/FormRules';
import { app } from '../../../../../app';
import { addUserProducer } from '../../../../data/producers/addUserProducer';
import {
  openErrorToast,
  openSuccessToast,
} from '../../../../utils/notifications';
import { errorCodeToMessage } from '../../../../../../api/errorCodeToMessage';
import { defaultAdminsQueryParams } from '../../../../../utils/constants';

const roleAuthorities = {
  ADMIN: {
    id: '1',
    name: 'ROLE_ADMIN',
  },
  MODERATOR: {
    id: '2',
    name: 'ROLE_MODERATOR',
  },
};

interface AdminFormProps {
  closeForm: Function;
  runGetAdmins: Function;
}

function AdminForm({ closeForm, runGetAdmins }: AdminFormProps) {
  const [form] = Form.useForm();
  const [roleError, setRoleError] = useState(false);
  const location = useLocation();

  function onAddSuccess(result: any): void {
    if (result.data) {
      openSuccessToast(`The user has been successfully added`);
      form.resetFields();
      const parsedQueryParams = queryString.parse(location.search.slice(1), {
        parseBooleans: true,
      });

      runGetAdmins({
        ...defaultAdminsQueryParams,
        ...parsedQueryParams,
      });
      closeForm();
    }
  }

  function onAddingError({ data }): void {
    openErrorToast(errorCodeToMessage(data?.response?.data?.code));
  }

  const onFinishFailed = () => {
    setRoleError(form.getFieldError('authorities').length > 0);
  };

  const onFinish = (values) => {
    setRoleError(false);
    app.wall.addUser
      .inject(addUserProducer)()
      .runc({
        onSuccess: onAddSuccess,
        onError: onAddingError,
        args: [
          {
            ...values,
            authorities: [roleAuthorities[values.authorities]],
          },
        ],
      });
  };

  return (
    <div className="admin-form form flex items-center rounded-2xl border border-[#E2E2E2] p-[20px]">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="annoucement-form flex w-full gap-[16px] "
      >
        <div className="flex flex-1">
          <Form.Item
            name="firstName"
            rules={[
              FormRules.required(),
              FormRules.alphanumericDashApostrophe(),
            ]}
            validateTrigger="onSubmit"
          >
            <Input autoComplete="off" placeholder="First name" />
          </Form.Item>
        </div>
        <div className="flex flex-1">
          <Form.Item
            name="lastName"
            rules={[
              FormRules.required(),
              FormRules.alphanumericDashApostrophe(),
            ]}
            validateTrigger="onSubmit"
          >
            <Input autoComplete="off" placeholder="Last name" />
          </Form.Item>
        </div>
        <div className="flex flex-1">
          <Form.Item
            name="email"
            rules={[FormRules.required(), FormRules.email()]}
            validateTrigger="onSubmit"
          >
            <Input autoComplete="off" placeholder="Email" />
          </Form.Item>
        </div>

        <div className="flex flex-1">
          <Form.Item
            name="authorities"
            rules={[FormRules.required()]}
            validateTrigger="onSubmit"
          >
            <Select
              placeholder="Role"
              suffixIcon={<img src={selectIcon} alt="selectIcon" />}
              className={`${roleError && 'select-error'}`}
              size="small"
              options={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'MODERATOR', label: 'Moderator' },
              ]}
            />
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <button className="ml-[6px] cursor-pointer" type="submit">
            <img
              className="w-[15px]"
              src={checkmarkIcon}
              alt="checkmark_icon"
            />
          </button>
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => closeForm()}
          >
            <img className="w-5" src={xIcon} alt="x_icon" />
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminForm;
