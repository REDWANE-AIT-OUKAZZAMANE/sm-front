import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import AdminItem from '../AdminItem';
import { UserData } from '../../../../../types';
import AdminsFilter from '../FilterForm';
import { getAdminsProducer } from '../../../../data/producers/getAdmins';
import { app } from '../../../../../app';
import defaultSelector from '../../../../../../api/selector';
import Spinner from '../../../../../landing/components/Spinner';
import { defaultAdminsQueryParams } from '../../../../../utils/constants';
import AdminForm from '../AdminForm/AdminForm';
import './style.scss';

function AdminManagement() {
  const location = useLocation();
  const [adminFormVisible, setAdminFormVisible] = useState<boolean>(false);

  const {
    state: { responseData: adminsData, isSuccess, isPending },
    run: runGetAdmins,
  } = app.wall.getAdmins.inject(getAdminsProducer).useAsyncState({
    selector: defaultSelector,
  });

  useEffect(() => {
    const parsedQueryParams = queryString.parse(location.search.slice(1), {
      parseBooleans: true,
    });

    runGetAdmins({
      ...defaultAdminsQueryParams,
      ...parsedQueryParams,
    });
  }, [location]);

  return (
    <div className="admin-container card-shaddow mx-[32px] mb-[17px]  flex h-full flex-1 flex-col py-6 pl-[32px] pr-[32px]">
      <AdminsFilter
        adminFormVisible={adminFormVisible}
        setAdminFormVisible={setAdminFormVisible}
      />
      <div className="custom-scrollbar flex flex-1 flex-col gap-[10px] overflow-auto pr-[5px]">
        {isPending && (
          <div className="grid w-full flex-1 place-items-center">
            <Spinner className="mb-[22px] mr-2 h-12 w-12 animate-spin fill-dPurple text-gray-200 dark:text-gray-600" />
          </div>
        )}

        {adminFormVisible && (
          <AdminForm
            closeForm={() => setAdminFormVisible(false)}
            runGetAdmins={runGetAdmins}
          />
        )}
        {isSuccess &&
          adminsData.data.content.map((admin: UserData) => (
            <AdminItem
              admin={admin}
              key={admin.id}
              runGetAdmins={runGetAdmins}
            />
          ))}
      </div>
    </div>
  );
}

export default AdminManagement;
