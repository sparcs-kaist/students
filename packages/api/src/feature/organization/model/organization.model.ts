import { IOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOrganizationCreate {
  name: IOrganization["name"];

  nameEng: IOrganization["nameEng"];

  organizationTypeEnum: IOrganization["organizationTypeEnum"];

  foundingYear: IOrganization["foundingYear"];

  organizationStateEnum: IOrganization["organizationStateEnum"];

  startTerm: IOrganization["startTerm"];

  endTerm: IOrganization["endTerm"];
}

export class MOrganization extends MEntity implements IOrganization {
  static modelName = "Organization";

  name: IOrganization["name"];

  nameEng: IOrganization["nameEng"];

  startTerm: IOrganization["startTerm"];

  endTerm: IOrganization["endTerm"];

  organizationTypeEnum: IOrganization["organizationTypeEnum"];

  foundingYear: IOrganization["foundingYear"];

  organizationStateEnum: IOrganization["organizationStateEnum"];

  constructor(data: IOrganization) {
    super();
    Object.assign(this, data);
  }
}
