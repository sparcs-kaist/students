import { IOrganizationPresident } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOrganizationPresidentCreate {
  organization: IOrganizationPresident["organization"];

  organizationPresidentTypeEnum: IOrganizationPresident["organizationPresidentTypeEnum"];

  title: IOrganizationPresident["title"];

  student: IOrganizationPresident["student"];

  phoneNumber: IOrganizationPresident["phoneNumber"];

  duration: IOrganizationPresident["duration"];
}

export class MOrganizationPresident
  extends MEntity
  implements IOrganizationPresident
{
  static modelName = "OrganizationPresident";

  organization: IOrganizationPresident["organization"];

  organizationPresidentTypeEnum: IOrganizationPresident["organizationPresidentTypeEnum"];

  title: IOrganizationPresident["title"];

  student: IOrganizationPresident["student"];

  phoneNumber: IOrganizationPresident["phoneNumber"];

  duration: IOrganizationPresident["duration"];

  constructor(data: IOrganizationPresident) {
    super();
    Object.assign(this, data);
  }
}
