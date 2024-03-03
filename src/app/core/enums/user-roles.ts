export enum UserRole {
  Admin = 'admin',
  Reviewer = 'reviewer',
}
export const UserRolesValues: Record<UserRole, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Reviewer]: 'Reviewer',
};
