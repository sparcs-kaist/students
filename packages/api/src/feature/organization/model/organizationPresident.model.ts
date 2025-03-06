import { InferSelectModel } from "drizzle-orm";

import { OrganizationPresident } from "@sparcs-students/api/drizzle/schema/organization.schema";
import { IOrganizationPresident } from "@sparcs-students/interface/api/organization/type/organization.student.type";

export type OrganizationPresidentDBResult = InferSelectModel<
  typeof OrganizationPresident
>;

export class MOrganizationPresident implements IOrganizationPresident {
  id: IOrganizationPresident["id"];

  duration: IOrganizationPresident["duration"];

  organization: IOrganizationPresident["organization"];

  organizationPresidentTypeEnum: IOrganizationPresident["organizationPresidentTypeEnum"];

  title: IOrganizationPresident["title"];

  student: IOrganizationPresident["student"];

  phoneNumber: IOrganizationPresident["phoneNumber"];

  constructor(data: IOrganizationPresident) {
    Object.assign(this, data);
  }

  static fromDBResult(result: OrganizationPresidentDBResult) {
    return new MOrganizationPresident({
      ...result,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
      organization: {
        id: result.organizationId,
      },
      organizationPresidentTypeEnum: result.organizationPresidentTypeEnum,
      student: {
        id: result.studentId,
      },
      phoneNumber: result.phoneNumber,
    });
  }
}
