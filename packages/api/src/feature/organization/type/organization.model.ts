import { IOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { InferSelectModel } from "drizzle-orm";

import { Organization } from "@sparcs-students/api/drizzle/schema/organization.schema";
import {
  OrganizationStateEnum,
  OrganizationTypeEnum,
} from "@sparcs-students/interface/common/enum/organization.enum";

export type OrganizationDBResult = InferSelectModel<typeof Organization>;

export class MOrganization implements IOrganization {
  id: IOrganization["id"];

  name: IOrganization["name"];

  duration: IOrganization["duration"];

  nameEng: IOrganization["nameEng"];

  organizationTypeEnum: IOrganization["organizationTypeEnum"];

  foundingYear: IOrganization["foundingYear"];

  organizationStateEnum: IOrganization["organizationStateEnum"];

  constructor(data: IOrganization) {
    Object.assign(this, data);
  }

  static fromDBResult(result: OrganizationDBResult) {
    return new MOrganization({
      ...result,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
      organizationTypeEnum: result.organizationTypeEnum as OrganizationTypeEnum,
      organizationStateEnum:
        result.organizationStateEnum as OrganizationStateEnum,
    });
  }
}
