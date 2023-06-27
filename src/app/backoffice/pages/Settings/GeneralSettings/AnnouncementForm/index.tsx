import { useEffect, useState } from 'react';
import { DatePicker, Input, Form, notification } from 'antd';
import dayjs from 'dayjs';

import xIcon from '../../../../../../assets/icons/x.svg';
import checkmarkIcon from '../../../../../../assets/icons/checkmark.svg';
import FormRules from '../../../../../../utils/FormRules';
import successIcon from '../../../../../../assets/icons/successIcon.svg';
import errorIcon from '../../../../../../assets/icons/errorIcon.svg';
import './style.scss';
import { app } from '../../../../../app';
import { addAnnouncementProducer } from '../../../../data/producers/addAnnouncementProducer';
import { updateAnnouncementProducer } from '../../../../data/producers/updateAnnouncementsProducer';
import { errorCodeToMessage } from '../../../../../../api/errorCodeToMessage';

interface AnnouncementFormProps {
  closeForm: Function;
  edit?: boolean;
  annoucementData?: any;
  runGetAnnouncements: Function;
  setLoading: Function;
}

function AnnouncementForm({
  closeForm,
  edit,
  annoucementData,
  runGetAnnouncements,
  setLoading,
}: AnnouncementFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [form] = Form.useForm();

  const onFinishFailed = ({ errorFields }) => {
    const errorStrings: string[] = [];
    errorFields.forEach((error) => {
      errorStrings.push(...error.errors);
    });
    setErrors([...new Set(errorStrings)]);
  };

  // Disable dates in the date picker callendar that are in the past before current day
  const handleDisabledDate = (current) =>
    current && current < dayjs().startOf('day');

  const handleDisabledEndDate = (current) => {
    if (form.getFieldValue('startDate')) {
      return (
        current &&
        current < dayjs(form.getFieldValue('startDate')).startOf('day')
      );
    }
    return current && current < dayjs().startOf('day');
  };
  // Validate start date making sure the selected date is after current time and start date when submitting
  const validateStartDate = (_, value, callback) => {
    if (edit) {
      callback();
    } else if (value && value < dayjs()) {
      callback('Start date must be in the future.');
    } else {
      callback();
    }
  };

  // Validate end date making sure the selected date is after current time when submitting
  const validateEndDate = (_, value, callback) => {
    const startDate = form.getFieldValue('startDate');
    if (value && value < dayjs()) {
      callback('End date must be in the future.');
    } else if (value && value <= startDate) {
      callback('End date must be after start date.');
    } else {
      callback();
    }
  };

  function openErrorNotification(code) {
    notification.open({
      message: 'Error',
      description: errorCodeToMessage(code),
      placement: 'bottomRight',
      duration: 3,
      icon: <img src={errorIcon} alt="errorIcon" />,
    });
  }
  function openSuccessNotification(message) {
    notification.open({
      message: 'Success',
      description: message,
      placement: 'bottomRight',
      duration: 3,
      icon: <img src={successIcon} alt="successIcon" />,
    });
  }

  function onAddSuccess(result: any): void {
    if (result.data) {
      openSuccessNotification(
        `The announcement has been successfully ${edit ? 'updated' : 'added'}`
      );
      runGetAnnouncements();
      setLoading(false);
      form.resetFields();
      closeForm();
    }
  }

  function onAddingError({ data }): void {
    setLoading(false);
    openErrorNotification(data?.response?.data?.code);
  }

  const onFinish = (values) => {
    setErrors([]);
    setLoading(true);
    if (edit) {
      app.wall.updateAnnouncement
        .inject(updateAnnouncementProducer)()
        .runc({
          onSuccess: onAddSuccess,
          onError: onAddingError,
          args: [
            annoucementData.id,
            {
              title: values.title,
              description: values.description,
              ...(dayjs(annoucementData.startDate) > dayjs() && {
                startDate: dayjs(values.endDate).toISOString(),
              }),
              endDate: dayjs(values.endDate).toISOString(),
            },
          ],
        });
    } else {
      app.wall.addAnnouncement
        .inject(addAnnouncementProducer)()
        .runc({
          onSuccess: onAddSuccess,
          onError: onAddingError,
          args: [
            {
              ...values,
              startDate: dayjs(values.startDate).toISOString(),
              endDate: dayjs(values.endDate).toISOString(),
            },
          ],
        });
    }
  };

  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        title: annoucementData.title,
        description: annoucementData.description,
        startDate: dayjs(annoucementData.startDate),
        endDate: dayjs(annoucementData.endDate),
      });
    }
  }, [annoucementData, edit, form]);

  return (
    <div className="border-[#E2E2E2] rounded-2xl border p-[20px]">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="annoucement-form flex w-full gap-[9px] "
      >
        <div className="flex-1 flex flex-col gap-[9px]">
          <Form.Item
            name="title"
            rules={[FormRules.allRequired(), FormRules.announcementTitle()]}
            validateTrigger="onSubmit"
          >
            <Input autoComplete="off" placeholder="Announcement title" />
          </Form.Item>
          <div className="flex gap-[9px]">
            <Form.Item
              name="startDate"
              className="flex-1"
              rules={[
                FormRules.allRequired(),
                {
                  validator: validateStartDate,
                },
              ]}
              validateTrigger="onSubmit"
            >
              <DatePicker
                placeholder="Start Date & Time"
                showTime={{ format: 'HH:mm', showSecond: false }}
                disabled={edit && dayjs(annoucementData.startDate) < dayjs()}
                disabledDate={handleDisabledDate}
              />
            </Form.Item>
            <Form.Item
              name="endDate"
              className="flex-1"
              rules={[
                FormRules.allRequired(),
                {
                  validator: validateEndDate,
                },
              ]}
              validateTrigger="onSubmit"
            >
              <DatePicker
                placeholder="End Date & Time"
                showTime={{ format: 'HH:mm', showSecond: false }}
                disabledDate={handleDisabledEndDate}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex-1">
          <Form.Item
            name="description"
            rules={[
              FormRules.allRequired(),
              FormRules.announcementDescription(),
            ]}
            validateTrigger="onSubmit"
          >
            <Input.TextArea
              placeholder="Announcement description"
              autoSize={{ minRows: 2.85, maxRows: 3 }}
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
      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error) => (
            <p className="text-[#ff4d4f] text-xl" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
export default AnnouncementForm;
