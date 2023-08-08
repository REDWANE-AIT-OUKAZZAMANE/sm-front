import { Button, Form, Input, Select, Image } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import resetIcon from '../../../../../../assets/icons/resetIcon.svg';
import filterIcon from '../../../../../../assets/icons/filterIcon.svg';
import sendArrow from '../../../../../../assets/icons/sendArrow.svg';
import selectIcon from '../../../../../../assets/icons/selectIcon.svg';
import './styles.scss';

function AdminsFilter() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const parsedQueryParams = queryString.parse(location.search.slice(1), {
    parseBooleans: true,
  });

  form.setFieldsValue(parsedQueryParams);

  const onFinish = (values: any) => {
    navigate(`?${queryString.stringify(values)}`);
  };

  const handleResetFields = () => {
    form.resetFields();
    navigate('');
  };

  return (
    <div className="form mb-12 flex flex-col items-center justify-between bg-white pb-2 font-['Lato']">
      <div className="mb-[10px] flex w-full items-center justify-between">
        <h1 className="items-center justify-between text-[18px] ">
          Admin list
        </h1>
        <Button
          className="inline-flex w-[192px] items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-lg  text-white hover:bg-darkPurple focus:outline-none"
          size="middle"
          htmlType="submit"
        >
          <span className="text-white">Add Admin</span>
        </Button>
      </div>
      <div className="flex w-full items-center justify-between">
        <Button
          icon={
            <img src={sendArrow} alt="sendArrowIcon" className="inline-block" />
          }
          className="inline-flex w-60 items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-lg  text-white hover:bg-darkPurple focus:outline-none"
          size="middle"
        >
          <span className="text-white">send Login Token</span>
        </Button>
        <Form
          form={form}
          onFinish={onFinish}
          className="ml-auto flex items-center space-x-1"
        >
          <Form.Item className="mb-0 mr-1" name="q">
            <Input
              placeholder="Search by name"
              className="w-[351px]"
              size="middle"
            />
          </Form.Item>

          <Form.Item className="mb-0 w-[100px]" name="role.eq">
            <Select
              placeholder="Role"
              suffixIcon={
                <img src={selectIcon} alt="selectIcon" className="pt-2" />
              }
              size="middle"
              options={[
                { value: 'ADMIN', label: 'Admin' },
                { value: 'MODERATOR', label: 'Moderator' },
              ]}
            />
          </Form.Item>

          <Button
            icon={
              <img src={filterIcon} alt="filterIcon" className="inline-block" />
            }
            className="inline-flex w-60 items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-lg  text-white hover:bg-darkPurple focus:outline-none"
            size="middle"
            htmlType="submit"
          >
            <span className="text-white">Filter</span>
          </Button>
          <Button
            className="inline-flex w-[40px] items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center text-lg  text-white hover:bg-darkPurple focus:outline-none "
            size="middle"
            htmlType="button"
            onClick={handleResetFields}
          >
            <Image src={resetIcon} preview={false} />
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminsFilter;
