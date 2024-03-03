import { UserRole } from '../enums/user-roles';

export interface User {
  email: 'programarcdev@gmail.com';
  username: string;
  access_token: string;
  role: UserRole;
}
