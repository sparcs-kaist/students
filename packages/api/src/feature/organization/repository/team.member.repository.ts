import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { TeamMember } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  ITeamMember,
  ITeamMemberRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MTeamMember } from "../type/team.member.model";

@Injectable()
export class TeamRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  // WARD: Transaction
  async withTransaction<T>(
    callback: (tx: DrizzleTransaction) => Promise<T>,
  ): Promise<T> {
    return this.db.transaction(callback);
  }

  // find methods
  async findTx(
    tx: DrizzleTransaction,
    team: ITeamMember["team"],
  ): Promise<MTeamMember | null>;
  async findTx(
    tx: DrizzleTransaction,
    id: ITeamMember["id"],
  ): Promise<MTeamMember | null>;
  async findTx(
    tx: DrizzleTransaction,
    arg1: ITeamMember["team"] | ITeamMember["id"],
  ): Promise<MTeamMember | null> {
    let query = tx.select().from(TeamMember).$dynamic();

    if (typeof arg1 === "number") {
      query = query.where(eq(TeamMember.id, arg1));
    } else {
      query = query.where(eq(TeamMember.teamId, arg1.id));
    }

    const [result] = await query.execute();

    return result ? MTeamMember.fromDBResult(result) : null;
  }

  async findAllTx(
    tx: DrizzleTransaction,
    teamMemberIds: ITeamMember["id"][],
  ): Promise<MTeamMember[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MTeamMember[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    arg1: ITeamMember["id"][] | DurationFull,
  ): Promise<MTeamMember[]> {
    let query = tx.select().from(TeamMember).$dynamic();
    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(TeamMember.id, arg1));
    } else if ("startTerm" in arg1 && "endTerm" in arg1) {
      whereConditions.push(
        not(
          or(
            gt(TeamMember.startTerm, arg1.endTerm),
            and(
              isNotNull(TeamMember.endTerm),
              lt(TeamMember.endTerm, arg1.startTerm),
            ),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(TeamMember.deletedAt));
    query = query.where(and(...whereConditions));

    const res = await query.execute();
    return res.map(r => MTeamMember.fromDBResult(r));
  }

  // fetch methods
  async fetchTx(
    tx: DrizzleTransaction,
    id: ITeamMember["id"],
  ): Promise<MTeamMember> {
    const result = await this.findTx(tx, id);
    if (!result) {
      throw new HttpException("Team member not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async fetch(id: ITeamMember["id"]): Promise<MTeamMember> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: ITeamMember["id"][] | DurationFull,
  ): Promise<MTeamMember[]> {
    if (Array.isArray(arg1)) {
      // arg1이 teamMemberIds 배열인 경우
      // 요청한 ID를 Set으로 변환하여 중복 제거
      const uniqueIds = Array.from(new Set(arg1));

      const results = await this.findAllTx(tx, uniqueIds);
      // 반환된 ID를 Set으로 변환하여 중복 제거
      const returnedIds = new Set(results.map(org => org.id));

      if (returnedIds.size === uniqueIds.length) {
        throw new HttpException("No Team members found", HttpStatus.NOT_FOUND);
      }
      return results;
    }
    // arg1이 DurationFull인 경우
    const results = await this.findAllTx(tx, arg1);
    if (results.length === 0) {
      throw new HttpException("No Team members found", HttpStatus.NOT_FOUND);
    }
    return results;
  }

  async fetchAll(ids: ITeamMember["id"][]): Promise<MTeamMember[]>;
  async fetchAll(duration: DurationFull): Promise<MTeamMember[]>;
  async fetchAll(
    arg1: ITeamMember["id"][] | DurationFull,
  ): Promise<MTeamMember[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, arg1));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    data: ITeamMemberRequestCreate,
  ): Promise<MTeamMember> {
    const result = await tx
      .insert(TeamMember)
      .values({
        teamId: data.team.id,
        studentId: data.student.id,
        startTerm: data.duration.startTerm,
        endTerm: data.duration.endTerm,
      })
      .execute();
    const insertedId = result[0].insertId;
    const team = await this.findTx(tx, insertedId);
    if (!team) {
      throw new HttpException(
        "Failed to create team member",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return team;
  }

  async insert(data: ITeamMemberRequestCreate): Promise<MTeamMember> {
    return this.db.transaction(async tx => this.insertTx(tx, data));
  }
}
