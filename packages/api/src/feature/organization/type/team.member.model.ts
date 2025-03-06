import { ITeamMember } from "@sparcs-students/interface/api/organization/type/organization.student.type";

import { InferSelectModel } from "drizzle-orm";

import { TeamMember } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type TeamDBResult = InferSelectModel<typeof TeamMember>;

export class MTeamMember implements ITeamMember {
  id: ITeamMember["id"];

  team: ITeamMember["team"];

  student: ITeamMember["student"];

  duration: ITeamMember["duration"];

  constructor(data: ITeamMember) {
    Object.assign(this, data);
  }

  static fromDBResult(result: TeamDBResult) {
    return new MTeamMember({
      ...result,
      id: result.id,
      team: { id: result.teamId },
      student: { id: result.studentId },
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
    });
  }
}
