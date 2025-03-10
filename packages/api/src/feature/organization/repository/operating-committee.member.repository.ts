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
import { OperatingCommitteeMember } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOperatingCommitteeMemberRequestCreate,
  IOperatingCommitteeMemberRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MOperatingCommitteeMember } from "../type/operating-committee.member.model";

type IOperatingCommitteeMemberQuery = {
  id?: number;
  ids?: number[];
  studentId?: number;
  operatingCommitteeId?: number;
  duration?: DurationFull;
};

@Injectable()
export class OperatingCommitteeMemberRepository {
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
    param: IOperatingCommitteeMemberQuery,
  ): Promise<MOperatingCommitteeMember[] | null> {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(OperatingCommitteeMember.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(OperatingCommitteeMember.id, param.ids));
    }
    if (param.studentId) {
      whereClause.push(eq(OperatingCommitteeMember.studentId, param.studentId));
    }
    if (param.operatingCommitteeId) {
      whereClause.push(
        eq(
          OperatingCommitteeMember.operatingCommitteeId,
          param.operatingCommitteeId,
        ),
      );
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(OperatingCommitteeMember.startTerm, param.duration.endTerm),
            and(
              isNotNull(OperatingCommitteeMember.endTerm),
              lt(OperatingCommitteeMember.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNotNull(OperatingCommitteeMember.deletedAt));

    const result = await tx
      .select()
      .from(OperatingCommitteeMember)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MOperatingCommitteeMember.fromDBResult(row));
  }

  async find(
    param: IOperatingCommitteeMemberQuery,
  ): Promise<MOperatingCommitteeMember[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IOperatingCommitteeMemberRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(OperatingCommitteeMember).values({
      ...param,
      operatingCommitteeId: param.operatingCommittee.id,
      studentId: param.student.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: IOperatingCommitteeMemberRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IOperatingCommitteeMemberRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(OperatingCommitteeMember)
      .set({
        title: param.title,
        legalBasis: param.legalBasis,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(
        and(
          eq(OperatingCommitteeMember.id, param.id),
          eq(OperatingCommitteeMember.studentId, param.student.id),
          eq(
            OperatingCommitteeMember.operatingCommitteeId,
            param.operatingCommittee.id,
          ),
          isNull(OperatingCommitteeMember.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: IOperatingCommitteeMemberRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(
    tx: DrizzleTransaction,
    param: IOperatingCommitteeMemberQuery,
  ): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(OperatingCommitteeMember)
      .set({ deletedAt: cur })
      .where(
        and(
          eq(OperatingCommitteeMember.id, param.id),
          eq(OperatingCommitteeMember.studentId, param.studentId),
          eq(
            OperatingCommitteeMember.operatingCommitteeId,
            param.operatingCommitteeId,
          ),
          isNull(OperatingCommitteeMember.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: IOperatingCommitteeMemberQuery): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
