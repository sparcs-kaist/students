import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = "permission";
export type UserPermissionType =
  | "StudentCouncilPresident"
  | "OrganizationPresident"
  | "OrganizationManager"
  | "Any";

export const Permission = (perm: UserPermissionType) =>
  SetMetadata(PERMISSION_KEY, perm);
export const StudentCouncilPresident = () =>
  Permission("StudentCouncilPresident");
export const OrganizationPresident = () => Permission("OrganizationPresident");
export const OrganizationManager = () => Permission("OrganizationManager");
export const AnyUser = () => Permission("Any");
