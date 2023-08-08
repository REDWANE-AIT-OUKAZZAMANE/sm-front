import AdminItem from '../AdminItem';
import { UserData } from '../../../../../types';
import { admins } from '../data';
import './style.scss';
import AdminsFilter from '../FilterForm';

function AdminManagement() {
  return (
    <div className="admin-container card-shaddow mx-[32px] mb-[17px]  flex h-full flex-1 flex-col py-6 pl-[32px] pr-[32px]">
      <AdminsFilter />
      <div className="listadmin flex flex-1 flex-col gap-[10px] pr-[5px]">
        {admins.map((admin: UserData) => (
          <AdminItem admin={admin} key={admin.id} />
        ))}
      </div>
    </div>
  );
}

export default AdminManagement;
