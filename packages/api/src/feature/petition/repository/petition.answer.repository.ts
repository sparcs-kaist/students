import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, inArray, isNotNull, eq, SQL, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { PetitionAnswer } from "src/drizzle/schema";
import {
  IPetitionAnswer,
  IPetitionAnswerRequestCreate,
  IPetitionAnswerRequestUpdate,
} from "@sparcs-students/interface/api/petition/type/petition.type";
import { MPetitionAnswer } from "../type/petition.answer.model";

type IPetitionAnswerQuery = {
  id?: number;
  ids?: number[];
  petitionId?: number;
};

@Injectable()
export class PetitionAnswerRepository {
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
    param: IPetitionAnswerQuery,
  ): Promise<MPetitionAnswer[] | null> {
    const whereClause: SQL[] = [];

    if (param.id) {
      whereClause.push(eq(PetitionAnswer.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(PetitionAnswer.id, param.ids));
    }
    if (param.petitionId) {
      whereClause.push(eq(PetitionAnswer.petition_id, param.petitionId));
    }

    whereClause.push(isNotNull(PetitionAnswer.deletedAt));

    const result = await tx
      .select()
      .from(PetitionAnswer)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MPetitionAnswer.fromDBResult(row));
  }

  async find(param: IPetitionAnswerQuery): Promise<MPetitionAnswer[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IPetitionAnswerRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(PetitionAnswer).values({
      ...param,
      petition_id: param.petition.id,
      user_id: param.user.id,
      team_id: param.team.id,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: IPetitionAnswerRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IPetitionAnswerRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(PetitionAnswer)
      .set({
        petition_id: param.petition.id,
        user_id: param.user.id,
      })
      .where(
        and(eq(PetitionAnswer.id, param.id), isNull(PetitionAnswer.deletedAt)),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: IPetitionAnswerRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(
    tx: DrizzleTransaction,
    param: IPetitionAnswerQuery,
  ): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(PetitionAnswer)
      .set({ deletedAt: cur })
      .where(
        and(eq(PetitionAnswer.id, param.id), isNull(PetitionAnswer.deletedAt)),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: IPetitionAnswer): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
