import { useEffect, useState } from 'react';
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
import { getAuthoritiesProducer } from '../../../../data/producers/getAuthorities';
import defaultSelector from '../../../../../../api/selector';
import { roleNames } from '../utils';
import { UserData } from '../../../../../types';
import { updateUserProducer } from '../../../../data/producers/updateUserProducer';

interface AdminFormProps {
  closeForm: Function;
  runGetAdmins: Function;
  edit?: Boolean;
  adminData?: UserData;
}

function AdminForm({
  closeForm,
  runGetAdmins,
  edit,
  adminData,
}: AdminFormProps) {
  const [form] = Form.useForm();
  const [roleError, setRoleError] = useState(false);
  const location = useLocation();

  const {
    state: { responseData: authoritiesData, isSuccess },
  } = app.wall.getAuthorities.inject(getAuthoritiesProducer).useAsyncState({
    selector: defaultSelector,
  });

  function onAddSuccess(result: any): void {
    if (result.data) {
      openSuccessToast(
        `The admin has been successfully ${edit ? 'updated' : 'added'}`
      );
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
    if (edit && adminData) {
      app.wall.updateUser
        .inject(updateUserProducer)()
        .runc({
          onSuccess: onAddSuccess,
          onError: onAddingError,
          args: [
            adminData.id,
            {
              ...values,
              authorities: values.authorities.map((role) => JSON.parse(role)),
            },
          ],
        });
    } else {
      app.wall.addUser
        .inject(addUserProducer)()
        .runc({
          onSuccess: onAddSuccess,
          onError: onAddingError,
          args: [
            {
              ...values,
              authorities: values.authorities.map((role) => JSON.parse(role)),
            },
          ],
        });
    }
  };

  useEffect(() => {
    if (edit && adminData) {
      form.setFieldsValue({
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        email: adminData.email,
        authorities: adminData.authorities.map((role) => JSON.stringify(role)),
        // authorities: roleNames[adminData.authorities[0]?.name]?.toUpperCase(),
      });
    }
  }, [adminData, edit, form]);

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
              mode="multiple"
              options={
                isSuccess &&
                authoritiesData.data.map((role) => ({
                  label: roleNames[role.name],
                  value: JSON.stringify(role),
                }))
              }
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
