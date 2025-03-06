import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { Team } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  ITeam,
  ITeamRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { MTeam } from "../type/team.model";

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
    teamId: ITeam["id"],
  ): Promise<MTeam | null> {
    const [result] = await tx
      .select()
      .from(Team)
      .where(eq(Team.id, teamId))
      .execute();

    return result ? MTeam.fromDBResult(result) : null;
  }

  async findAllTx(
    tx: DrizzleTransaction,
    teamIds: ITeam["id"][],
  ): Promise<MTeam[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MTeam[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    arg1: ITeam["id"][] | DurationFull,
  ): Promise<MTeam[]> {
    let query = tx.select().from(Team).$dynamic();
    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(Team.id, arg1));
    } else if ("startTerm" in arg1 && "endTerm" in arg1) {
      whereConditions.push(
        not(
          or(
            gt(Team.startTerm, arg1.endTerm),
            and(isNotNull(Team.endTerm), lt(Team.endTerm, arg1.startTerm)),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(Team.deletedAt));
    query = query.where(and(...whereConditions));

    const res = await query.execute();
    return res.map(r => MTeam.fromDBResult(r));
  }

  // fetch methods
  async fetchTx(tx: DrizzleTransaction, id: ITeam["id"]): Promise<MTeam> {
    const result = await this.findTx(tx, id);
    if (!result) {
      throw new HttpException("Team not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async fetch(id: ITeam["id"]): Promise<MTeam> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: ITeam["id"][] | DurationFull,
  ): Promise<MTeam[]> {
    if (Array.isArray(arg1)) {
      // arg1이 teamIds 배열인 경우
      // 요청한 ID를 Set으로 변환하여 중복 제거
      const uniqueIds = Array.from(new Set(arg1));

      const results = await this.findAllTx(tx, uniqueIds);
      // 반환된 ID를 Set으로 변환하여 중복 제거
      const returnedIds = new Set(results.map(org => org.id));

      if (returnedIds.size === uniqueIds.length) {
        throw new HttpException("No Teams found", HttpStatus.NOT_FOUND);
      }
      return results;
    }
    // arg1이 DurationFull인 경우
    const results = await this.findAllTx(tx, arg1);
    if (results.length === 0) {
      throw new HttpException("No Teams found", HttpStatus.NOT_FOUND);
    }
    return results;
  }

  async fetchAll(ids: ITeam["id"][]): Promise<MTeam[]>;
  async fetchAll(duration: DurationFull): Promise<MTeam[]>;
  async fetchAll(arg1: ITeam["id"][] | DurationFull): Promise<MTeam[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, arg1));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    data: ITeamRequestCreate,
  ): Promise<MTeam> {
    const result = await tx
      .insert(Team)
      .values({
        name: data.name,
        organizationId: data.organization.id,
        startTerm: data.duration.startTerm,
        endTerm: data.duration.endTerm,
      })
      .execute();
    const insertedId = result[0].insertId;
    const team = await this.findTx(tx, insertedId);
    if (!team) {
      throw new HttpException(
        "Failed to create team",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return team;
  }

  async insert(data: ITeamRequestCreate): Promise<MTeam> {
    return this.db.transaction(async tx => this.insertTx(tx, data));
  }
}
