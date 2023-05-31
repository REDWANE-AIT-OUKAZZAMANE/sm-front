import { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, UploadProps, notification } from 'antd';

import FormRules from '../../../../../../utils/FormRules';
import successIcon from '../../../../../../assets/icons/successIcon.svg';
import './style.scss';

export type WallSettingsType = {
  title: string | undefined;
  logo: File | null;
};

const staticWallSettings = { title: '', logo: null };

export default function WallSettings() {
  const [form] = Form.useForm();
  const { getFieldsValue, getFieldsError } = form;
  const [wallSettings, setWallSetings] =
    useState<WallSettingsType>(staticWallSettings);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = () => {
    const values = getFieldsValue();
    const errors = getFieldsError();
    const isFieldsEmpty = Object.values(values).some((value) => !value);
    const hasErrors = Object.values(errors).some(
      (error) => error.errors.length !== 0
    );
    setIsButtonDisabled(
      !form.isFieldsTouched() ||
        isFieldsEmpty ||
        hasErrors ||
        wallSettings.logo === null
    );
  };

  const onFinish = (values: any) => {
    notification.open({
      message: `Success`,
      description: `The wall setting has been successfully ${
        wallSettings?.title !== '' ? 'updated' : 'added'
      }`,
      placement: 'bottomRight',
      icon: <img src={successIcon} alt="successIcon" />,
    });
    setWallSetings((prev) => ({ ...prev, title: values.title }));
  };

  useEffect(() => {
    handleInputChange();
  }, [wallSettings]);

  const uploadProps: UploadProps = {
    showUploadList: false,
    accept: '.png,.jpeg,.svg',
    beforeUpload: (file) => {
      setWallSetings((prev) => ({ ...prev, logo: file }));
      return false; // Prevent automatic upload
    },
  };

  return (
    <div className="p-[30px] wallSettings w-[100%]">
      <h4 className="text-textBlack text-[20px] font-semibold mb-[20px]">
        Wall Settings
      </h4>
      <Form
        form={form}
        onFinish={onFinish}
        className="flex w-full"
        onValuesChange={handleInputChange}
      >
        <div className="flex w-[80%]  gap-2">
          <div className="w-[50%]">
            <h2 className="font-backoffice text-textBlack text-[12px] font-semibold mb-[5px]">
              Wall title *
            </h2>
            <Form.Item
              className="mb-0 mr-1"
              name="title"
              rules={[FormRules.required(), FormRules.wallTitle()]}
            >
              <Input
                className="font-Lato text-[10px] w-[100%] p-[10px]"
                placeholder="Enter your wall title here"
              />
            </Form.Item>
          </div>
          <div className="w-[50%]">
            <h2 className="font-backoffice text-textBlack text-[12px] font-semibold mb-[5px]">
              Wall logo *
            </h2>
            <Form.Item className="mb-0 mr-1" rules={[FormRules.required()]}>
              <Input
                placeholder="Upload  your logo here"
                className="font-Lato text-[10px] w-[100%] p-[10px]"
                value={wallSettings?.logo ? wallSettings.logo.name : ''}
              />
            </Form.Item>
          </div>
        </div>

        <div className="grow mt-[24px]" style={{ alignSelf: 'end' }}>
          <Upload {...uploadProps}>
            <Button className="w-[100%] h-100 mb-[15px] font-semibold font-Lato hover:bg-[#492E65] focus:outline-none  bg-dPurple p-[18px]  text-center text-white rounded-lg text-[12px] inline-flex items-center justify-center">
              <span className="text-white">Upload logo</span>
            </Button>
          </Upload>
          <Button
            className="w-[100%] h-100  bg-dPurple font-semibold font-Lato  hover:bg-[#492E65] focus:outline-none p-[18px]  text-center text-white rounded-lg text-[12px] inline-flex items-center justify-center"
            htmlType="submit"
            disabled={isButtonDisabled}
          >
            <span className="text-white">Save changes</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}
