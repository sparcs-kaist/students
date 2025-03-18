import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, inArray, isNotNull, eq, SQL, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { PetitionAgree } from "src/drizzle/schema";
import {
  IPetitionAgree,
  IPetitionAgreeRequestCreate,
  IPetitionAgreeRequestUpdate,
} from "@sparcs-students/interface/api/petition/type/petition.type";
import { MPetitionAgree } from "../type/petition.agree.model";

type IPetitionAgreeQuery = {
  id?: number;
  ids?: number[];
  petitionId?: number;
};

@Injectable()
export class PetitionAgreeRepository {
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
    param: IPetitionAgreeQuery,
  ): Promise<MPetitionAgree[] | null> {
    const whereClause: SQL[] = [];

    if (param.id) {
      whereClause.push(eq(PetitionAgree.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(PetitionAgree.id, param.ids));
    }
    if (param.petitionId) {
      whereClause.push(eq(PetitionAgree.petition_id, param.petitionId));
    }

    whereClause.push(isNotNull(PetitionAgree.deletedAt));

    const result = await tx
      .select()
      .from(PetitionAgree)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MPetitionAgree.fromDBResult(row));
  }

  async find(param: IPetitionAgreeQuery): Promise<MPetitionAgree[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IPetitionAgreeRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(PetitionAgree).values({
      ...param,
      petition_id: param.petition.id,
      user_id: param.user.id,
    });
    if (result.insertId === undefined) {
      throw new HttpException("Failed to insert", HttpStatus.BAD_REQUEST);
    }
  }

  async insert(param: IPetitionAgreeRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IPetitionAgreeRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(PetitionAgree)
      .set({
        petition_id: param.petition.id,
        user_id: param.user.id,
      })
      .where(
        and(eq(PetitionAgree.id, param.id), isNull(PetitionAgree.deletedAt)),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to update", HttpStatus.BAD_REQUEST);
    }
  }

  async update(param: IPetitionAgreeRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete method
  async deleteTx(
    tx: DrizzleTransaction,
    param: IPetitionAgreeQuery,
  ): Promise<void> {
    const cur = new Date();
    const [result] = await tx
      .update(PetitionAgree)
      .set({ deletedAt: cur })
      .where(
        and(eq(PetitionAgree.id, param.id), isNull(PetitionAgree.deletedAt)),
      );
    if (result.affectedRows === 0) {
      throw new HttpException("Failed to delete", HttpStatus.BAD_REQUEST);
    }
  }

  async delete(param: IPetitionAgree): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
