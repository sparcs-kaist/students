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
import { Petition } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IPetition,
  IPetitionRequestCreate,
  IPetitionRequestUpdate,
} from "@sparcs-students/interface/api/petition/type/petition.type";
import { MPetition } from "../type/Petition.model";

type IPetitionQuery = {
  id?: number;
  ids?: number[];
  duration?: DurationFull;
};

@Injectable()
export class PetitionRepository {
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
    param: IPetitionQuery,
  ): Promise<MPetition[] | null> {
    const whereClause: SQL[] = [];

    if (param.id) {
      whereClause.push(eq(Petition.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(Petition.id, param.ids));
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(Petition.startTerm, param.duration.endTerm),
            and(
              isNotNull(Petition.endTerm),
              lt(Petition.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNull(Petition.deletedAt));

    const result = await tx
      .select()
      .from(Petition)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MPetition.fromDBResult(row));
  }

  async find(param: IPetitionQuery): Promise<MPetition[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IPetitionRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(Petition).values({
      ...param,
      title: param.title,
      userId: param.user.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: IPetitionRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IPetitionRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(Petition)
      .set({
        title: param.title,
        userId: param.user.id,
        detail: param.detail,
        petitionStatusEnumId: param.petitionStatusEnumId,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(and(eq(Petition.id, param.id), isNull(Petition.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: IPetitionRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(tx: DrizzleTransaction, param: IPetitionQuery): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(Petition)
      .set({ deletedAt: cur })
      .where(and(eq(Petition.id, param.id), isNull(Petition.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: IPetition): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
