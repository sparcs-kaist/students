import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = "permission";

export enum UserPermissionType {
  StudentCouncilPresident = "StudentCouncilPresident",
  OrganizationPresident = "OrganizationPresident",
  OrganizationManager = "OrganizationManager",
  Any = "Any",
}

export const Permission = (perm: UserPermissionType) =>
  SetMetadata(PERMISSION_KEY, perm);
export const StudentCouncilPresident = () =>
  Permission(UserPermissionType.StudentCouncilPresident);
export const OrganizationPresident = () =>
  Permission(UserPermissionType.OrganizationPresident);
export const OrganizationManager = () =>
  Permission(UserPermissionType.OrganizationManager);
export const AnyUser = () => Permission(UserPermissionType.Any);
