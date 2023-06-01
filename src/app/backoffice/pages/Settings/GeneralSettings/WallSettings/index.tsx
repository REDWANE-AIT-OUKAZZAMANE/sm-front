import { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Upload, notification } from 'antd';
import { Status } from 'async-states';

import FormRules from '../../../../../../utils/FormRules';
import successIcon from '../../../../../../assets/icons/successIcon.svg';
import errorIcon from '../../../../../../assets/icons/errorIcon.svg';
import { addWallSettingsProducer } from '../../../../data/producers/addWallSettingsProducer';
import { app } from '../../../../../app';
import './style.scss';

export type WallSettingsType = {
  title: string | undefined;
  logo: File | null;
  logoName: string;
};
const staticWallSettings = { title: '', logo: null, logoName: '' };

export default function WallSettings() {
  const [form] = Form.useForm();
  const { getFieldsError } = form;

  const { state: addingState, run: runAddWallSettings } =
    app.wall.add_wall_settings.inject(addWallSettingsProducer).useAsyncState();

  const [wallSettings, setWallSetings] =
    useState<WallSettingsType>(staticWallSettings);

  const currentSettingsValue = useRef<WallSettingsType>(staticWallSettings);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [fileErrorMessage, setFileErrorMessage] = useState('');

  const handleInputChange = () => {
    form.validateFields().then(({ title }) => {
      const isFieldsEmpty = !title;
      const hasErrors = Object.values(getFieldsError()).some(
        (error) => error.errors.length > 0
      );

      setIsButtonDisabled(
        !form.isFieldsTouched() ||
          fileErrorMessage !== '' ||
          isFieldsEmpty ||
          hasErrors ||
          wallSettings.logoName === '' ||
          (wallSettings.logoName === currentSettingsValue.current.logoName &&
            title === currentSettingsValue.current.title)
      );
    });
  };

  const onFinish = (values: any) => {
    runAddWallSettings({
      title: values.title,
      logo: wallSettings.logo as File,
    });
  };

  useEffect(() => {
    if (addingState.status === Status.success) {
      if (addingState.data) {
        const AddedwallSettings = addingState.data.data;
        notification.open({
          message: `Success`,
          description: 'The wall setting has been successfully  added',
          placement: 'bottomRight',
          icon: <img src={successIcon} alt="successIcon" />,
        });
        currentSettingsValue.current = {
          title: AddedwallSettings.title,
          logoName: AddedwallSettings.filename,
          logo: null,
        };
      }
    }
    if (addingState.status === Status.error) {
      notification.open({
        message: `Error`,
        description: 'error while adding wall settings',
        placement: 'bottomRight',
        icon: <img src={errorIcon} alt="errorIcon" />,
      });
    }
  }, [addingState]);

  useEffect(() => {
    if (form.isFieldTouched('title')) handleInputChange();
  }, [wallSettings, fileErrorMessage]);

  const beforeUpload = (file) => {
    setWallSetings((prev) => ({ ...prev, logo: file, logoName: file.name }));
    const maxSize = 2 * 1024 * 1024;
    const isAcceptableType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/svg' ||
      file.type === 'image/svg+xml';
    if (!isAcceptableType) {
      setFileErrorMessage('You can only upload PNG, SVG, JPEG files!');
      return false;
    }
    if (file.size > maxSize) {
      setFileErrorMessage('File size exceeds the limit of 2MB!');
      return false;
    }
    setFileErrorMessage('');
    return false;
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
              validateTrigger="onBlur"
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
            <Form.Item
              className="mb-0 mr-1"
              rules={[FormRules.required()]}
              validateStatus={fileErrorMessage !== '' ? 'error' : ''}
              help={fileErrorMessage}
            >
              <Input
                placeholder="Upload  your logo here"
                className="font-Lato text-[10px] w-[100%] p-[10px]"
                value={wallSettings?.logoName ? wallSettings.logoName : ''}
              />
            </Form.Item>
          </div>
        </div>

        <div className="grow mt-[24px]" style={{ alignSelf: 'end' }}>
          <Upload
            showUploadList={false}
            // accept=".png,.jpeg,.svg"
            maxCount={1}
            beforeUpload={beforeUpload}
          >
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
