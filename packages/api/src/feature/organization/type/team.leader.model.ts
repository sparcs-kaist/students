import { ITeamLeader } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { InferSelectModel } from "drizzle-orm";

import { TeamLeader } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type TeamDBResult = InferSelectModel<typeof TeamLeader>;

export class MTeamLeader implements ITeamLeader {
  id: ITeamLeader["id"];

  team: ITeamLeader["team"];

  student: ITeamLeader["student"];

  title: ITeamLeader["title"];

  duration: ITeamLeader["duration"];

  constructor(data: ITeamLeader) {
    Object.assign(this, data);
  }

  static fromDBResult(result: TeamDBResult) {
    return new MTeamLeader({
      ...result,
      id: result.id,
      team: { id: result.teamId },
      student: { id: result.studentId },
      title: result.title,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
    });
  }
}
