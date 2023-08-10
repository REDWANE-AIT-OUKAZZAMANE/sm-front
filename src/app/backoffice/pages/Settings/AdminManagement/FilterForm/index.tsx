import { useEffect } from 'react';
import { Button, Form, Input, Select, Image } from 'antd';
import { Option } from 'antd/es/mentions';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useAsyncState } from 'react-async-states';

import resetIcon from '../../../../../../assets/icons/resetIcon.svg';
import filterIcon from '../../../../../../assets/icons/filterIcon.svg';
import sendArrow from '../../../../../../assets/icons/sendArrow.svg';
import selectIcon from '../../../../../../assets/icons/selectIcon.svg';
import './styles.scss';
import { app } from '../../../../../app';
import { getAuthoritiesProducer } from '../../../../data/producers/getAuthorities';
import defaultSelector from '../../../../../../api/selector';
import { testIds } from '../../../../../../tests/constants';
import { selectedAdmins } from '../../../../data/sources/selectedAdminsSource';

interface AdminFilterProps {
  setAdminFormVisible: Function;
  adminFormVisible: boolean;
  adminToEdit: string;
}

function AdminsFilter({
  setAdminFormVisible,
  adminFormVisible,
  adminToEdit,
}: AdminFilterProps) {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    state: { responseData: selectedAdminsList },
  } = useAsyncState.auto({
    source: selectedAdmins,
    selector: defaultSelector,
  });

  const {
    state: { responseData: authoritiesData, isSuccess },
  } = app.wall.getAuthorities.inject(getAuthoritiesProducer).useAsyncState({
    selector: defaultSelector,
    lazy: false,
  });

  const onFinish = (values: any) => {
    navigate(`?${queryString.stringify(values)}`);
  };

  const handleResetFields = () => {
    form.resetFields();
    navigate('');
  };

  useEffect(() => {
    const parsedQueryParams = queryString.parse(location.search.slice(1), {
      parseBooleans: true,
    });

    form.setFieldsValue(parsedQueryParams);
  }, []);

  return (
    <div
      className="form mb-12 flex flex-col items-center justify-between bg-white pb-2 font-['Lato']"
      data-testid={testIds.users.FilterForm.container}
    >
      <div className="mb-[10px] flex w-full items-center justify-between">
        <h1 className="items-center justify-between text-[18px] ">
          Admin list
        </h1>
        <Button
          className="inline-flex w-[192px] items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-lg  text-white hover:bg-darkPurple focus:outline-none"
          size="middle"
          htmlType="submit"
          data-testid={testIds.users.FilterForm.addButton}
          disabled={adminFormVisible || adminToEdit !== ''}
          onClick={() => setAdminFormVisible(true)}
        >
          <span className="text-white">Add Admin</span>
        </Button>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        className="flex w-full items-center justify-between"
      >
        <Button
          icon={
            <img src={sendArrow} alt="sendArrowIcon" className="inline-block" />
          }
          className="inline-flex w-60 items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-lg  text-white hover:bg-darkPurple focus:outline-none"
          size="middle"
          disabled={selectedAdminsList && selectedAdminsList.length === 0}
          data-testid={testIds.users.FilterForm.sendTokenButton}
        >
          <span className="text-white">send Login Token</span>
        </Button>
        <div className="ml-auto flex items-center space-x-1">
          <Form.Item className="mb-0 mr-1" name="q">
            <Input
              placeholder="Search by name"
              className="w-[351px]"
              size="middle"
              data-testid={testIds.users.FilterForm.searchInput}
            />
          </Form.Item>

          <Form.Item className="mb-0 w-[100px]" name="authorities.eq">
            <Select
              placeholder="Role"
              suffixIcon={
                <img src={selectIcon} alt="selectIcon" className="pt-2" />
              }
              size="middle"
            >
              {isSuccess &&
                authoritiesData.data.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {' '}
                    {role.name.substring(5).toLowerCase()}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Button
            icon={
              <img src={filterIcon} alt="filterIcon" className="inline-block" />
            }
            className="inline-flex w-60 items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center font-['Lato'] text-lg  text-white hover:bg-darkPurple focus:outline-none"
            size="middle"
            htmlType="submit"
            data-testid={testIds.users.FilterForm.submitButton}
          >
            <span className="text-white">Filter</span>
          </Button>
          <Button
            className="inline-flex w-[40px] items-center justify-center rounded-lg bg-dPurple px-5 py-2.5 text-center text-lg  text-white hover:bg-darkPurple focus:outline-none "
            size="middle"
            htmlType="button"
            onClick={handleResetFields}
            data-testid={testIds.users.FilterForm.resetButton}
          >
            <Image src={resetIcon} preview={false} />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminsFilter;
