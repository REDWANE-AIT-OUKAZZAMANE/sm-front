import { Button, Form, Input, Select, Image } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import resetIcon from '../../../../../assets/icons/resetIcon.svg';
import filterIcon from '../../../../../assets/icons/filterIcon.svg';
import selectIcon from '../../../../../assets/icons/selectIcon.svg';
import './styles.scss';

function PostsFilter() {
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
    <div className="form flex items-center justify-between bg-white pb-2 font-['Lato'] mb-12">
      <Form form={form} onFinish={onFinish} className="flex w-full">
        <Form.Item className="mb-0 mr-1" name="q">
          <Input
            placeholder="Search by user name, description"
            className="w-[351px]"
            size="large"
          />
        </Form.Item>
        <Form.Item className="mb-0 mr-1" name="source.eq">
          <Select
            placeholder="Source feed"
            suffixIcon={
              <img src={selectIcon} alt="selectIcon" className="pt-2" />
            }
            size="large"
            options={[
              { value: 'INSTAGRAM', label: 'Instagram feeds' },
              { value: 'YOUTUBE', label: 'youtube feeds' },
            ]}
          />
        </Form.Item>
        <Form.Item className="mb-0" name="hidden.eq">
          <Select
            placeholder="Visibility"
            suffixIcon={
              <img src={selectIcon} alt="selectIcon" className="pt-2" />
            }
            size="large"
            options={[
              { value: false, label: 'Visible post' },
              { value: true, label: 'Hidden post' },
            ]}
          />
        </Form.Item>
        <div className="flex items-center space-x-1 ml-auto">
          <Button
            icon={
              <img src={filterIcon} alt="filterIcon" className="inline-block" />
            }
            className="w-60 bg-dPurple font-['Lato'] text-center text-white hover:bg-[#492E65] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
            size="large"
            htmlType="submit"
          >
            <span className="text-white">Filter</span>
          </Button>
          <Button
            className="bg-dPurple w-[40px] text-center text-white hover:bg-[#492E65] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center "
            size="large"
            htmlType="button"
            onClick={handleResetFields}
          >
            <Image src={resetIcon} preview={false} />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PostsFilter;
