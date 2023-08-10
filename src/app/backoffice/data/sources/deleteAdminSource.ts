import { createSource } from 'async-states';

import { deleteAdminProducer } from '../producers/deleteAdminProducer';

export const deleteAdmin = createSource('deleteAdmin', deleteAdminProducer);
