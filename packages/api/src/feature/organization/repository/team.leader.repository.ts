import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import {
  and,
  gt,
  inArray,
  isNotNull,
  lt,
  not,
  or,
  eq,
  SQL,
  isNull,
} from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { TeamLeader } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  ITeamLeaderRequestCreate,
  ITeamLeaderRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MTeamLeader } from "../type/team.leader.model";

type ITeamLeaderQuery = {
  id?: number;
  ids?: number[];
  teamId?: number;
  duration?: DurationFull;
};

@Injectable()
export class TeamLeaderRepository {
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
    param: ITeamLeaderQuery,
  ): Promise<MTeamLeader[] | null> {
    const whereClause: SQL[] = [];

    if (param.id) {
      whereClause.push(eq(TeamLeader.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(TeamLeader.id, param.ids));
    }
    if (param.teamId) {
      whereClause.push(eq(TeamLeader.teamId, param.teamId));
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(TeamLeader.startTerm, param.duration.endTerm),
            and(
              isNotNull(TeamLeader.endTerm),
              lt(TeamLeader.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNull(TeamLeader.deletedAt));

    const result = await tx
      .select()
      .from(TeamLeader)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MTeamLeader.fromDBResult(row));
  }

  async find(param: ITeamLeaderQuery): Promise<MTeamLeader[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: ITeamLeaderRequestCreate,
  ): Promise<MTeamLeader> {
    const [result] = await tx.insert(TeamLeader).values({
      ...param,
      title: param.title,
      studentId: param.student.id,
      teamId: param.team.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    const insertedId = result[0].insertId;
    const teamLeader = await this.findTx(tx, insertedId);
    if (!teamLeader) {
      throw new HttpException(
        "Failed to create team",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return teamLeader[0];
  }

  async insert(param: ITeamLeaderRequestCreate): Promise<MTeamLeader> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: ITeamLeaderRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(TeamLeader)
      .set({
        title: param.title,
        studentId: param.student.id,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(and(eq(TeamLeader.id, param.id), isNull(TeamLeader.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: ITeamLeaderRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(
    tx: DrizzleTransaction,
    param: ITeamLeaderQuery,
  ): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(TeamLeader)
      .set({ deletedAt: cur })
      .where(and(eq(TeamLeader.id, param.id), isNull(TeamLeader.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: ITeamLeaderQuery): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
