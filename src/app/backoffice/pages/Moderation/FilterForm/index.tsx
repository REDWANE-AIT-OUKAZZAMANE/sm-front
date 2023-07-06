import { Button, Form, Input, Select, Image } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import resetIcon from '../../../../../assets/icons/resetIcon.svg';
import filterIcon from '../../../../../assets/icons/filterIcon.svg';
import selectIcon from '../../../../../assets/icons/selectIcon.svg';
import './styles.scss';
import { testIds } from '../../../../../tests/constants';

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
    <div
      data-testid={testIds.moderation.postsFilter}
      className="form mb-12 flex items-center justify-between bg-white pb-2 font-['Lato']"
    >
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
        <div className="ml-auto flex items-center space-x-1">
          <Button
            icon={
              <img src={filterIcon} alt="filterIcon" className="inline-block" />
            }
            className="inline-flex w-60 items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-sm font-medium text-white hover:bg-darkPurple focus:outline-none"
            size="large"
            htmlType="submit"
          >
            <span className="text-white">Filter</span>
          </Button>
          <Button
            className="inline-flex w-[40px] items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-darkPurple focus:outline-none "
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
