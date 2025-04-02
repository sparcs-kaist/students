import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const Student = () => Roles("undergraduate", "master", "doctor");
export const Executive = () => Roles("executive");
export const Professor = () => Roles("professor");
export const Employeee = () => Roles("employee");
