import { IOrganizationManager } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOrganizationManagerCreate {
  organization: IOrganizationManager["organization"];

  student: IOrganizationManager["student"];

  duration: IOrganizationManager["duration"];
}

export class MOrganizationManager
  extends MEntity
  implements IOrganizationManager
{
  static modelName = "OrganizationManager";

  organization: IOrganizationManager["organization"];

  student: IOrganizationManager["student"];

  duration: IOrganizationManager["duration"];

  constructor(data: IOrganizationManager) {
    super();
    Object.assign(this, data);
  }
}
