import { IOperatingCommittee } from "@sparcs-students/interface/api/organization/type/organization.type";

import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IOperatingCommitteeCreate {
  organization: IOperatingCommittee["organization"];

  name: IOperatingCommittee["name"];

  nameEng: IOperatingCommittee["nameEng"];

  committeeTypeEnum: IOperatingCommittee["committeeTypeEnum"];

  startTerm: IOperatingCommittee["startTerm"];

  endTerm: IOperatingCommittee["endTerm"];
}

export class MOperatingCommittee
  extends MEntity
  implements IOperatingCommittee
{
  static modelName = "OperatingCommittee";

  organization: IOperatingCommittee["organization"];

  name: IOperatingCommittee["name"];

  nameEng: IOperatingCommittee["nameEng"];

  committeeTypeEnum: IOperatingCommittee["committeeTypeEnum"];

  startTerm: IOperatingCommittee["startTerm"];

  endTerm: IOperatingCommittee["endTerm"];

  constructor(data: IOperatingCommittee) {
    super();
    Object.assign(this, data);
  }
}
