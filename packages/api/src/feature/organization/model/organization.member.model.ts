import { IOrganizationMember } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOrganizationMemberCreate {
  organization: IOrganizationMember["organization"];

  student: IOrganizationMember["student"];

  duration: IOrganizationMember["duration"];
}

export class MOrganizationMember
  extends MEntity
  implements IOrganizationMember
{
  static modelName = "OrganizationMember";

  organization: IOrganizationMember["organization"];

  student: IOrganizationMember["student"];

  duration: IOrganizationMember["duration"];

  constructor(data: IOrganizationMember) {
    super();
    Object.assign(this, data);
  }
}
