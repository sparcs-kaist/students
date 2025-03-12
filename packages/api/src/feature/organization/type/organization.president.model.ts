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

  static fromDBResult(result: OrganizationPresidentDBResult) {
    return new MOrganizationPresident({
      ...result,
      organization: { id: result.organizationId },
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
    });
  }
}
