import { useState } from 'react';
import { DatePicker, Input, Form } from 'antd';
import dayjs from 'dayjs';

import xIcon from '../../../../../../assets/icons/x.svg';
import checkmarkIcon from '../../../../../../assets/icons/checkmark.svg';
import FormRules from '../../../../../../utils/FormRules';
import './style.scss';

function AnnouncementForm({ closeForm }) {
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

  // Validate start date making sure the selected date is after current time and start date when submitting
  const validateStartDate = (_, value, callback) => {
    if (value && value < dayjs()) {
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

  const onFinish = () => {
    setErrors([]);
    form.resetFields();
    closeForm();
  };

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
                disabledDate={handleDisabledDate}
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
          <button className="cursor-pointer" type="button" onClick={closeForm}>
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
