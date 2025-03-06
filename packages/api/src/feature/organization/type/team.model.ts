import { ITeam } from "@sparcs-students/interface/api/organization/type/organization.type";

import { InferSelectModel } from "drizzle-orm";

import { Team } from "@sparcs-students/api/drizzle/schema/organization.schema";

export type TeamDBResult = InferSelectModel<typeof Team>;

export class MTeam implements ITeam {
  id: ITeam["id"];

  organization: ITeam["organization"];

  name: ITeam["name"];

  duration: ITeam["duration"];

  constructor(data: ITeam) {
    Object.assign(this, data);
  }

  static fromDBResult(result: TeamDBResult) {
    return new MTeam({
      ...result,
      id: result.id,
      organization: { id: result.organizationId },
      name: result.name,
      duration: {
        startTerm: result.startTerm,
        endTerm: result.endTerm,
      },
    });
  }
}
