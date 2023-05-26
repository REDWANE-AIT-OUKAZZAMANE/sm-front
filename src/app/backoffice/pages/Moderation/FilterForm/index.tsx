import { Button, Form, Input, Select, Image } from 'antd';

import resetIcon from '../../../../../assets/icons/resetIcon.svg';
import filterIcon from '../../../../../assets/icons/filterIcon.svg';
import selectIcon from '../../../../../assets/icons/selectIcon.svg';
import './styles.scss';

function PostsFilter() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleResetFields = () => {
    form.resetFields();
  };

  return (
    <div className="form flex items-center justify-between bg-white py-4 font-['Lato'] mb-12">
      <Form form={form} onFinish={onFinish} className="flex w-full">
        <Form.Item className="mb-0 mr-1" name="keyword">
          <Input
            placeholder="Search by user name, description"
            className="w-[351px]"
            size="large"
          />
        </Form.Item>
        <Form.Item className="mb-0 mr-1" name="feedSource">
          <Select
            placeholder="Source feed"
            suffixIcon={
              <img src={selectIcon} alt="selectIcon" className="pt-2" />
            }
            size="large"
            options={[
              { value: 'Instagram', label: 'Instagram feeds' },
              { value: 'youtube', label: 'youtube feeds' },
            ]}
          />
        </Form.Item>
        <Form.Item className="mb-0" name="visibility">
          <Select
            placeholder="Visibility"
            suffixIcon={
              <img src={selectIcon} alt="selectIcon" className="pt-2" />
            }
            size="large"
            options={[
              { value: 'visible', label: 'Visible poste' },
              { value: 'hidden', label: 'Hidden post' },
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
