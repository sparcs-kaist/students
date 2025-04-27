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
import { Meeting } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IMeetingRequestCreate,
  IMeetingRequestUpdate,
} from "@sparcs-students/interface/api/meeting/type/meeting.type";
import { MMeeting } from "../type/meeting.model";

type IMeetingQuery = {
  id?: number;
  ids?: number[];
  duration?: DurationFull;
  name?: string;
};

@Injectable()
export class MeetingRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  async withTransaction<T>(
    callback: (tx: DrizzleTransaction) => Promise<T>,
  ): Promise<T> {
    return this.db.transaction(callback);
  }

  // find methods
  async findTx(
    tx: DrizzleTransaction,
    param: IMeetingQuery,
  ): Promise<MMeeting[]> {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(Meeting.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(Meeting.id, param.ids));
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(Meeting.startTerm, param.duration.endTerm),
            and(
              isNotNull(Meeting.endTerm),
              lt(Meeting.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }
    if (param.name) {
      whereClause.push(eq(Meeting.name, param.name));
    }
    whereClause.push(isNotNull(Meeting.deletedAt));

    const result = await tx
      .select()
      .from(Meeting)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MMeeting.fromDBResult(row));
  }

  async find(param: IMeetingQuery): Promise<MMeeting[] | null> {
    return this.withTransaction(tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IMeetingRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(Meeting).values({
      ...param,
      name: param.name,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === 0) {
      throw new HttpException(
        "Failed to insert meeting",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async insert(param: IMeetingRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IMeetingRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(Meeting)
      .set({
        name: param.name,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(and(eq(Meeting.id, param.id), isNull(Meeting.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to update meeting",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(param: IMeetingRequestUpdate): Promise<void> {
    await this.withTransaction(tx => this.updateTx(tx, param));
  }

  // delete methods
  async deleteTx(tx: DrizzleTransaction, param: IMeetingQuery): Promise<void> {
    const [result] = await tx
      .update(Meeting)
      .set({ deletedAt: new Date() })
      .where(and(eq(Meeting.id, param.id), isNull(Meeting.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to delete meeting",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(param: IMeetingQuery): Promise<void> {
    await this.withTransaction(tx => this.deleteTx(tx, param));
  }
}
