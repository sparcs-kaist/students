import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { TeamLeader } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  ITeamLeader,
  ITeamLeaderRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MTeamLeader } from "../type/team.leader.model";

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
    team: ITeamLeader["team"],
  ): Promise<MTeamLeader | null>;
  async findTx(
    tx: DrizzleTransaction,
    id: ITeamLeader["id"],
  ): Promise<MTeamLeader | null>;
  async findTx(
    tx: DrizzleTransaction,
    arg1: ITeamLeader["team"] | ITeamLeader["id"],
  ): Promise<MTeamLeader | null> {
    let query = tx.select().from(TeamLeader).$dynamic();

    if (typeof arg1 === "number") {
      query = query.where(eq(TeamLeader.id, arg1));
    } else {
      query = query.where(eq(TeamLeader.teamId, arg1.id));
    }

    const [result] = await query.execute();

    return result ? MTeamLeader.fromDBResult(result) : null;
  }

  async findAllTx(
    tx: DrizzleTransaction,
    teamLeaderIds: ITeamLeader["id"][],
  ): Promise<MTeamLeader[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MTeamLeader[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    arg1: ITeamLeader["id"][] | DurationFull,
  ): Promise<MTeamLeader[]> {
    let query = tx.select().from(TeamLeader).$dynamic();
    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(TeamLeader.id, arg1));
    } else if ("startTerm" in arg1 && "endTerm" in arg1) {
      whereConditions.push(
        not(
          or(
            gt(TeamLeader.startTerm, arg1.endTerm),
            and(
              isNotNull(TeamLeader.endTerm),
              lt(TeamLeader.endTerm, arg1.startTerm),
            ),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(TeamLeader.deletedAt));
    query = query.where(and(...whereConditions));

    const res = await query.execute();
    return res.map(r => MTeamLeader.fromDBResult(r));
  }

  // fetch methods
  async fetchTx(
    tx: DrizzleTransaction,
    id: ITeamLeader["id"],
  ): Promise<MTeamLeader> {
    const result = await this.findTx(tx, id);
    if (!result) {
      throw new HttpException("Team leader not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async fetch(id: ITeamLeader["id"]): Promise<MTeamLeader> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: ITeamLeader["id"][] | DurationFull,
  ): Promise<MTeamLeader[]> {
    if (Array.isArray(arg1)) {
      // arg1이 teamLeaderIds 배열인 경우
      // 요청한 ID를 Set으로 변환하여 중복 제거
      const uniqueIds = Array.from(new Set(arg1));

      const results = await this.findAllTx(tx, uniqueIds);
      // 반환된 ID를 Set으로 변환하여 중복 제거
      const returnedIds = new Set(results.map(org => org.id));

      if (returnedIds.size === uniqueIds.length) {
        throw new HttpException("No Team leaders found", HttpStatus.NOT_FOUND);
      }
      return results;
    }
    // arg1이 DurationFull인 경우
    const results = await this.findAllTx(tx, arg1);
    if (results.length === 0) {
      throw new HttpException("No Team leaders found", HttpStatus.NOT_FOUND);
    }
    return results;
  }

  async fetchAll(ids: ITeamLeader["id"][]): Promise<MTeamLeader[]>;
  async fetchAll(duration: DurationFull): Promise<MTeamLeader[]>;
  async fetchAll(
    arg1: ITeamLeader["id"][] | DurationFull,
  ): Promise<MTeamLeader[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, arg1));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    data: ITeamLeaderRequestCreate,
  ): Promise<MTeamLeader> {
    const result = await tx
      .insert(TeamLeader)
      .values({
        teamId: data.team.id,
        studentId: data.student.id,
        title: data.title,
        startTerm: data.duration.startTerm,
        endTerm: data.duration.endTerm,
      })
      .execute();
    const insertedId = result[0].insertId;
    const team = await this.findTx(tx, insertedId);
    if (!team) {
      throw new HttpException(
        "Failed to create team leader",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return team;
  }

  async insert(data: ITeamLeaderRequestCreate): Promise<MTeamLeader> {
    return this.db.transaction(async tx => this.insertTx(tx, data));
  }
}
