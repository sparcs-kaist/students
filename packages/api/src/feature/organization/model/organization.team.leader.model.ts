import { ITeamLeader } from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface ITeamLeaderCreate {
  team: ITeamLeader["team"];

  student: ITeamLeader["student"];

  // title: ITeamLeader["title"];

  duration: ITeamLeader["duration"];
}

export class MTeamLeader extends MEntity implements ITeamLeader {
  static modelName = "TeamLeader";

  team: ITeamLeader["team"];

  student: ITeamLeader["student"];

  // title: ITeamLeader["title"];

  duration: ITeamLeader["duration"];

  constructor(data: ITeamLeader) {
    super();
    Object.assign(this, data);
  }
}
