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
import { TeamMember } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  ITeamMemberRequestCreate,
  ITeamMemberRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MTeamMember } from "../type/team.member.model";

type ITeamMemberQuery = {
  id?: number;
  ids?: number[];
  teamId?: number;
  duration?: DurationFull;
};

@Injectable()
export class TeamMemberRepository {
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
    param: ITeamMemberQuery,
  ): Promise<MTeamMember[] | null> {
    const whereClause: SQL[] = [];

    if (param.id) {
      whereClause.push(eq(TeamMember.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(TeamMember.id, param.ids));
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(TeamMember.startTerm, param.duration.endTerm),
            and(
              isNotNull(TeamMember.endTerm),
              lt(TeamMember.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNull(TeamMember.deletedAt));

    const result = await tx
      .select()
      .from(TeamMember)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MTeamMember.fromDBResult(row));
  }

  async find(param: ITeamMemberQuery): Promise<MTeamMember[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: ITeamMemberRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(TeamMember).values({
      ...param,
      studentId: param.student.id,
      teamId: param.team.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: ITeamMemberRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: ITeamMemberRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(TeamMember)
      .set({
        studentId: param.student.id,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(and(eq(TeamMember.id, param.id), isNull(TeamMember.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: ITeamMemberRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(
    tx: DrizzleTransaction,
    param: ITeamMemberQuery,
  ): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(TeamMember)
      .set({ deletedAt: cur })
      .where(and(eq(TeamMember.id, param.id), isNull(TeamMember.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: ITeamMemberQuery): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
