import { IOrganizationMember } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { InferSelectModel } from "drizzle-orm";

import { OrganizationMember } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type OrganizationDBResult = InferSelectModel<typeof OrganizationMember>;

export class MOrganizationMember implements IOrganizationMember {
  id: IOrganizationMember["id"];

  organization: IOrganizationMember["organization"];

  student: IOrganizationMember["student"];

  duration: IOrganizationMember["duration"];

  constructor(data: IOrganizationMember) {
    Object.assign(this, data);
  }

  static fromDBResult(data: OrganizationDBResult) {
    return new MOrganizationMember({
      ...data,
      id: data.id,
      organization: { id: data.organizationId },
      student: { id: data.studentId },
      duration: {
        startTerm: data.startTerm,
        endTerm: data.endTerm,
      },
    });
  }
}
