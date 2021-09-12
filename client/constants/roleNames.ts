import { UserRole } from 'types';

export const roleNames: Record<UserRole, string> = {
  [UserRole.CLIENT]: '',
  [UserRole.REALTOR]: 'Realtor',
  [UserRole.ADMIN]: 'Admin'
};
