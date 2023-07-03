import { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, notification } from 'antd';
import { Status } from 'async-states';

import FormRules from '../../../../../../utils/FormRules';
import successIcon from '../../../../../../assets/icons/successIcon.svg';
import errorIcon from '../../../../../../assets/icons/errorIcon.svg';
import { addWallSettingsProducer } from '../../../../data/producers/addWallSettingsProducer';
import { app } from '../../../../../app';
import { updateWallSettingsProducer } from '../../../../data/producers/updateWallSettingsProducer';
import { getWallSettingsProducer } from '../../../../data/producers/getWallSettingsProducer';
import Spinner from '../../../../../landing/components/Spinner';
import './style.scss';

type WallSettingsType = {
  id: string;
  title: string | undefined;
  logo: File | null;
  logoName: string;
};
const staticWallSettings = { id: '', title: '', logo: null, logoName: '' };

export default function WallSettingss() {
  const [form] = Form.useForm();
  const { getFieldsError } = form;

  const { runc: runcAddWallSettings } = app.wall.addWallSettings
    .inject(addWallSettingsProducer)
    .useAsyncState();

  const { runc: runcUpdateWallSettings } = app.wall.updateWallSettings
    .inject(updateWallSettingsProducer)
    .useAsyncState();

  const [wallSettings, setWallSetings] =
    useState<WallSettingsType>(staticWallSettings);

  function onGettingSuccess(result) {
    const currentWallSettings = result.state.data.data;
    form.setFieldValue('title', currentWallSettings.title);
    form.setFieldValue('logo', currentWallSettings.filename);
    setWallSetings({
      id: currentWallSettings.id,
      logo: null,
      logoName: currentWallSettings.filename,
      title: currentWallSettings.title,
    });
  }
  const { state: wallSettingsState } = app.wall.getWallSettings
    .inject(getWallSettingsProducer)
    .useAsyncState({
      lazy: false,
      events: {
        change: [
          {
            status: Status.success,
            handler: onGettingSuccess,
          },
        ],
      },
    });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [fileErrorMessage, setFileErrorMessage] = useState('');

  const handleInputChange = () => {
    form
      .validateFields()
      .then(({ title, logo }) => {
        const isFieldsEmpty = !title;
        const hasErrors = Object.values(getFieldsError()).some(
          (error) => error.errors.length > 0
        );

        setIsButtonDisabled(
          (wallSettings.id === '' && !form.isFieldsTouched()) ||
            fileErrorMessage !== '' ||
            isFieldsEmpty ||
            hasErrors ||
            (logo === wallSettings.logoName && title === wallSettings.title)
        );
      })
      .catch(() => {
        setIsButtonDisabled(true);
      });
  };
  const handelChangeSuccess = (addedwallSettings) => {
    notification.open({
      message: `Success`,
      description: `The wall setting has been successfully ${
        wallSettings.id ? 'updated' : 'added'
      }`,
      placement: 'bottomRight',
      icon: <img src={successIcon} alt="successIcon" />,
    });
    setWallSetings({
      id: addedwallSettings.id,
      title: addedwallSettings.title,
      logoName: addedwallSettings.filename,
      logo: wallSettings.logo,
    });
    handleInputChange();
  };

  function onUpdatingSuccess(result: any): void {
    if (result.data) {
      const addedwallSettings = result.data.data;
      handelChangeSuccess(addedwallSettings);
    }
  }

  function onUpdatingError(): void {
    notification.open({
      message: `Error`,
      description: 'error while updating wall settings',
      placement: 'bottomRight',
      icon: <img src={errorIcon} alt="errorIcon" />,
    });
  }

  function onAddingError(): void {
    notification.open({
      message: `Error`,
      description: 'error while adding wall settings',
      placement: 'bottomRight',
      icon: <img src={errorIcon} alt="errorIcon" />,
    });
  }

  const onFinish = (values: any) => {
    if (wallSettings.id !== '') {
      runcUpdateWallSettings({
        onSuccess: onUpdatingSuccess,
        onError: onUpdatingError,
        args: [
          wallSettings.id,
          {
            title: values.title,
            logo: wallSettings.logo as File,
          },
        ],
      });
    } else {
      runcAddWallSettings({
        onSuccess: onUpdatingSuccess,
        onError: onAddingError,
        args: [
          {
            title: values.title,
            logo: wallSettings.logo as File,
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (form.isFieldsTouched()) handleInputChange();
  }, [wallSettings, fileErrorMessage]);

  const beforeUpload = (file) => {
    form.setFieldValue('logo', file.name);
    setWallSetings((prev) => ({ ...prev, logo: file }));
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
    if (!form.isFieldsTouched()) handleInputChange();

    return false;
  };

  return (
    <div className="wallSettings w-[100%] p-[30px]">
      <h4 className="mb-[20px] text-[20px] font-semibold text-textBlack">
        Wall Settings
      </h4>
      {wallSettingsState.status === Status.pending ? (
        <div className="grid w-full place-items-center">
          <Spinner className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
        </div>
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          className="flex w-full"
          onValuesChange={handleInputChange}
        >
          <div className="flex w-[80%]  gap-2">
            <div className="w-[50%]">
              <h2 className="font-backoffice mb-[5px] text-[12px] font-semibold text-textBlack">
                Wall title *
              </h2>
              <Form.Item
                className="mb-0 mr-1"
                name="title"
                rules={[FormRules.required(), FormRules.wallTitle()]}
                validateTrigger="onBlur"
              >
                <Input
                  className="w-[100%] p-[6px] font-Lato text-[12px]"
                  placeholder="Enter your wall title here"
                />
              </Form.Item>
            </div>
            <div className="w-[50%]">
              <h2 className="font-backoffice mb-[5px] text-[12px] font-semibold text-textBlack">
                Wall logo *
              </h2>
              <Form.Item
                className="mb-0 mr-1"
                name="logo"
                rules={[FormRules.required()]}
                validateStatus={fileErrorMessage !== '' ? 'error' : ''}
                help={fileErrorMessage}
              >
                <Input
                  placeholder="Upload  your logo here"
                  className="w-[100%] p-[6px] font-Lato text-[12px]"
                  value={wallSettings?.logoName ? wallSettings.logoName : ''}
                />
              </Form.Item>
            </div>
          </div>

          <div className="mt-[24px] grow">
            <Upload
              showUploadList={false}
              accept=".png,.jpeg,.svg"
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              <Button className="h-100 mb-[15px] inline-flex w-[100%] items-center justify-center rounded-lg  bg-dPurple p-[14px]  text-center font-Lato text-[12px] font-semibold text-white hover:bg-darkPurple focus:outline-none">
                <span className="text-white">Upload logo</span>
              </Button>
            </Upload>
            <Button
              className="h-100 inline-flex  w-[100%] items-center justify-center  rounded-lg bg-dPurple p-[14px]  text-center font-Lato text-[12px] font-semibold text-white hover:bg-darkPurple focus:outline-none"
              htmlType="submit"
              disabled={isButtonDisabled}
            >
              <span className="text-white">Save changes</span>
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
