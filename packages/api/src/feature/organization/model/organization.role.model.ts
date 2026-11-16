import { IOrganizationRole } from "@sparcs-students/interface/api/organization/type/organization.role.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOrganizationRoleCreate {
  organization: IOrganizationRole["organization"];
  student: IOrganizationRole["student"];
  roleName: IOrganizationRole["roleName"];
  duration: IOrganizationRole["duration"];
}

export class MOrganizationRole extends MEntity implements IOrganizationRole {
  static modelName = "OrganizationRole";

  organization: IOrganizationRole["organization"];

  student: IOrganizationRole["student"];

  roleName: IOrganizationRole["roleName"];

  duration: IOrganizationRole["duration"];

  constructor(data: IOrganizationRole) {
    super();
    Object.assign(this, data);
  }
}
