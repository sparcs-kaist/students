import { Injectable, Inject } from "@nestjs/common";
import {
  Team,
  TeamMember,
  TeamLeader,
  TeamT,
  TeamMemberT,
  TeamLeaderT,
} from "@sparcs-students/api/drizzle/schema";
import { ApiOrg007RequestBody } from "@sparcs-students/interface/api/organization/index";

import { and, eq, isNull, or, gte, lte } from "drizzle-orm";
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

  async selectTeam(target: Partial<TeamT>): Promise<TeamT[]> {
    const { id, organizationId, semesterId, name, detail } = target;

    let query = this.db.select().from(Team).$dynamic();

    const whereConditions = [];

    if (id) {
      whereConditions.push(eq(Team.id, id));
    }

    if (organizationId) {
      whereConditions.push(eq(Team.organizationId, organizationId));
    }

    if (semesterId) {
      whereConditions.push(eq(Team.semesterId, semesterId));
    }

    if (name) {
      whereConditions.push(eq(Team.name, name));
    }

    if (detail) {
      whereConditions.push(eq(Team.detail, detail));
    }

    // 삭제된 항목 제외
    whereConditions.push(isNull(Team.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 쿼리 실행
    const res = await query.execute();

    return res;
  }

  async selectTeamMember(target: Partial<TeamMemberT>) {
    const { id, userId, startTerm, endTerm, teamId } = target;
    let query = this.db.select().from(TeamMember).$dynamic();

    const whereConditions = [];

    if (id) {
      whereConditions.push(eq(TeamMember.id, id));
    }

    if (userId) {
      whereConditions.push(eq(TeamMember.userId, userId));
    }

    if (startTerm) {
      whereConditions.push(
        or(gte(TeamMember.endTerm, startTerm), isNull(TeamMember.endTerm)),
      );
    }

    if (endTerm) {
      whereConditions.push(lte(TeamMember.startTerm, endTerm));
    }

    if (teamId) {
      whereConditions.push(eq(TeamMember.teamId, teamId));
    }

    // 삭제된 항목 제외
    whereConditions.push(isNull(TeamMember.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 쿼리 실행
    const res = await query.execute();

    return res;
  }

  async selectTeamLeader(target: Partial<TeamLeaderT>) {
    const { id, userId, startTerm, endTerm, teamId, role } = target;
    let query = this.db.select().from(TeamLeader).$dynamic();

    const whereConditions = [];

    if (id) {
      whereConditions.push(eq(TeamLeader.id, id));
    }

    if (userId) {
      whereConditions.push(eq(TeamLeader.userId, userId));
    }

    if (startTerm) {
      whereConditions.push(
        or(gte(TeamLeader.endTerm, startTerm), isNull(TeamLeader.endTerm)),
      );
    }

    if (endTerm) {
      whereConditions.push(lte(TeamLeader.startTerm, endTerm));
    }

    if (teamId) {
      whereConditions.push(eq(TeamLeader.teamId, teamId));
    }

    if (role) {
      whereConditions.push(eq(TeamLeader.role, role));
    }

    // 삭제된 항목 제외
    whereConditions.push(isNull(TeamLeader.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 쿼리 실행
    const res = await query.execute();

    return res;
  }

  async insertTeamLeader(
    userId: number,
    teamId: number,
    role: string,
    startTerm: Date,
    endTerm: Date,
  ): Promise<number> {
    await this.db
      .insert(TeamLeader)
      .values({ userId, teamId, role, startTerm, endTerm })
      .execute();
    const res = await this.ckTeamLeaderBeforeCreate(userId, teamId);
    return res;
  }

  async ckTeamLeaderBeforeCreate(userId, teamId): Promise<number> {
    const res = await this.selectTeamLeader({ userId, teamId });
    if (res.length === 0) {
      return 0;
    }
    return res[0].id;
  }
}
