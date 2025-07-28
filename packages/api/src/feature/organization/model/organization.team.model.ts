import { ITeam } from "@sparcs-students/interface/api/organization/type/organization.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface ITeamCreate {
  name: ITeam["name"];

  organization: ITeam["organization"];

  startTerm: ITeam["startTerm"];

  endTerm: ITeam["endTerm"];
}

export class MTeam extends MEntity implements ITeam {
  static modelName = "Organization";

  name: ITeam["name"];

  organization: ITeam["organization"];

  startTerm: ITeam["startTerm"];

  endTerm: ITeam["endTerm"];

  constructor(data: ITeam) {
    super();
    Object.assign(this, data);
  }
}
