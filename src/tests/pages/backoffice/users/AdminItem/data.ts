import { UserData } from '../../../../../app/types';

export const ADMIN: UserData = {
  id: 'user001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  authorities: [{ id: '1', name: 'ADMIN' }],
  activated: true,
  createdAt: new Date('2023-01-01'),
  lastModifiedAt: new Date('2023-01-15'),
};
