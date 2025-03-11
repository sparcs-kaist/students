import { IOrganizationPresident } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { InferSelectModel } from "drizzle-orm";

import { OrganizationPresident } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type OrganizationPresidentDBResult = InferSelectModel<
  typeof OrganizationPresident
>;

export class MOrganizationPresident implements IOrganizationPresident {
  id: IOrganizationPresident["id"];

  organization: IOrganizationPresident["organization"];

  organizationPresidentTypeEnum: IOrganizationPresident["organizationPresidentTypeEnum"];

  title: IOrganizationPresident["title"];

  student: IOrganizationPresident["student"];

  phoneNumber: IOrganizationPresident["phoneNumber"];

  duration: IOrganizationPresident["duration"];

  constructor(data: IOrganizationPresident) {
    Object.assign(this, data);
  }

  static fromDBResult(data: OrganizationPresidentDBResult) {
    return new MOrganizationPresident({
      ...data,
      id: data.id,
      organization: { id: data.organizationId },
      organizationPresidentTypeEnum: data.organizationPresidentTypeEnum,
      title: data.title,
      student: { id: data.studentId },
      phoneNumber: data.phoneNumber,
      duration: {
        startTerm: data.startTerm,
        endTerm: data.endTerm,
      },
    });
  }
}
