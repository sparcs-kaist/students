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
import { OperatingCommittee } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOperatingCommitteeRequestCreate,
  IOperatingCommitteeRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { MOperatingCommittee } from "../type/operating-committee.model";

type IOperatingCommitteeQuery = {
  id?: number;
  ids?: number[];
  duration?: DurationFull;
};

@Injectable()
export class OperatingCommitteeRepository {
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
    param: IOperatingCommitteeQuery,
  ): Promise<MOperatingCommittee[] | null> {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(OperatingCommittee.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(OperatingCommittee.id, param.ids));
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(OperatingCommittee.startTerm, param.duration.endTerm),
            and(
              isNotNull(OperatingCommittee.endTerm),
              lt(OperatingCommittee.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNotNull(OperatingCommittee.deletedAt));

    const result = await tx
      .select()
      .from(OperatingCommittee)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MOperatingCommittee.fromDBResult(row));
  }

  async find(
    param: IOperatingCommitteeQuery,
  ): Promise<MOperatingCommittee[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IOperatingCommitteeRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(OperatingCommittee).values({
      ...param,
      organizationId: param.organization.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: IOperatingCommitteeRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IOperatingCommitteeRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(OperatingCommittee)
      .set({
        name: param.name,
        nameEng: param.nameEng,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(
        and(
          eq(OperatingCommittee.id, param.id),
          isNull(OperatingCommittee.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: IOperatingCommitteeRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(
    tx: DrizzleTransaction,
    param: IOperatingCommitteeQuery,
  ): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(OperatingCommittee)
      .set({ deletedAt: cur })
      .where(
        and(
          eq(OperatingCommittee.id, param.id),
          isNull(OperatingCommittee.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: IOperatingCommitteeQuery): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
