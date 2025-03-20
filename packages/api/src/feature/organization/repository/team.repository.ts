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
import { Team } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  ITeam,
  ITeamRequestCreate,
  ITeamRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { MTeam } from "../type/team.model";

type ITeamQuery = {
  id?: number;
  ids?: number[];
  duration?: DurationFull;
};

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
    param: ITeamQuery,
  ): Promise<MTeam[] | null> {
    const whereClause: SQL[] = [];

    if (param.id) {
      whereClause.push(eq(Team.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(Team.id, param.ids));
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(Team.startTerm, param.duration.endTerm),
            and(
              isNotNull(Team.endTerm),
              lt(Team.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNotNull(Team.deletedAt));

    const result = await tx
      .select()
      .from(Team)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MTeam.fromDBResult(row));
  }

  async find(param: ITeamQuery): Promise<MTeam[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: ITeamRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(Team).values({
      ...param,
      name: param.name,
      organizationId: param.organization.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: ITeamRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: ITeamRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(Team)
      .set({
        name: param.name,
        organizationId: param.organization.id,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(and(eq(Team.id, param.id), isNull(Team.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: ITeamRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(tx: DrizzleTransaction, param: ITeamQuery): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(Team)
      .set({ deletedAt: cur })
      .where(and(eq(Team.id, param.id), isNull(Team.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: ITeam): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
