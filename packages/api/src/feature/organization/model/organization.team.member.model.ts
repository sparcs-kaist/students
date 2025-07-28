import { ITeamMember } from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface ITeamMemberCreate {
  team: ITeamMember["team"];

  student: ITeamMember["student"];

  duration: ITeamMember["duration"];
}

export class MTeamMember extends MEntity implements ITeamMember {
  static modelName = "TeamMember";

  team: ITeamMember["team"];

  student: ITeamMember["student"];

  duration: ITeamMember["duration"];

  constructor(data: ITeamMember) {
    super();
    Object.assign(this, data);
  }
}
