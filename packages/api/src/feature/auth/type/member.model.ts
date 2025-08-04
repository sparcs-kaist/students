import { InferSelectModel } from "drizzle-orm";
import { IMember } from "@sparcs-students/interface/api/user/type/user.type";

import {
  Department,
  Organization,
  OrganizationMember,
  Student,
  User,
} from "@sparcs-students/api/drizzle/schema";
// import { IOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
// import { MOrganization } from "@sparcs-students/api/feature/organization/type/organization.model";

export type RemoveOptional<T> = {
  [K in keyof T as Partial<Record<never, never>> extends Pick<T, K>
    ? never
    : K]: T[K];
};

export type MemberDbResult = {
  user: InferSelectModel<typeof User>;
  organization?: InferSelectModel<typeof Organization>;
  student?: InferSelectModel<typeof Student>;
  department?: InferSelectModel<typeof Department>;
  organizationMember?: InferSelectModel<typeof OrganizationMember>;
};

export class MMember implements IMember {
  id: IMember["id"];

  studentId: IMember["studentId"];

  organization?: IMember["organization"];

  user: IMember["user"];

  studentNumber?: IMember["studentNumber"];

  name: IMember["name"];

  email: IMember["email"];

  sid: IMember["sid"];

  uid: IMember["uid"];

  duration?: IMember["duration"];

  department?: IMember["department"];

  constructor(data: IMember) {
    Object.assign(this, data);
  }

  static fromDBResult(dbResult: MemberDbResult) {
    return new MMember({
      id: dbResult.user.id,
      studentId: dbResult.student?.id,
      organization: dbResult.organization
        ? { id: dbResult.organization.id }
        : undefined,
      user: {
        id: dbResult.user.id,
      },
      email: dbResult.user.email,
      sid: dbResult.user.sid,
      uid: dbResult.user.uid,
      studentNumber: dbResult.student?.studentNumber,
      name: dbResult.user.name,
      duration: dbResult.organizationMember
        ? {
            startTerm: dbResult.organizationMember.startTerm,
            endTerm: dbResult.organizationMember.endTerm,
          }
        : undefined,
      department: dbResult.department
        ? { id: dbResult.department.id }
        : undefined,
    });
  }
}
