import { Injectable, Inject } from "@nestjs/common";
import { Team, TeamMember, TeamT } from "@sparcs-students/api/drizzle/schema";
import { ApiOrg007RequestBody } from "@sparcs-students/interface/api/organization/index";

import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class TeamRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  async ckTeamBeforeCreate(body: ApiOrg007RequestBody): Promise<number> {
    const res = await this.db
      .select()
      .from(Team)
      .where(
        and(
          eq(Team.name, body.name),
          eq(Team.semesterId, body.semesterId),
          eq(Team.organizationId, body.organizationId),
          isNull(Team.deletedAt),
        ),
      )
      .execute();
    if (res.length === 0) {
      return 0;
    }
    return res[0].id;
  }

  async insertTeam(body: ApiOrg007RequestBody): Promise<number> {
    await this.db.insert(Team).values(body).execute();
    const res = await this.ckTeamBeforeCreate(body);
    return res;
  }

  async ckTeamMemberBeforeCreate(userId, teamId): Promise<number> {
    const res = await this.db
      .select()
      .from(TeamMember)
      .where(
        and(
          eq(TeamMember.teamId, teamId),
          eq(TeamMember.userId, userId),
          isNull(TeamMember.deletedAt),
        ),
      )
      .execute();
    if (res.length === 0) {
      return 0;
    }
    return res[0].id;
  }

  async insertTeamMember(
    userId: number,
    teamId: number,
    startTerm: Date,
    endTerm: Date,
  ): Promise<number> {
    await this.db
      .insert(TeamMember)
      .values({ userId, teamId, startTerm, endTerm })
      .execute();
    const res = await this.ckTeamMemberBeforeCreate(userId, teamId);
    return res;
  }

  async selectTeamById(teamId: number): Promise<TeamT[]> {
    const res = await this.db
      .select()
      .from(Team)
      .where(and(eq(Team.id, teamId), isNull(Team.deletedAt)))
      .execute();
    return res;
  }
}
