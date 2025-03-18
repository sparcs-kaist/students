import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, inArray, eq, SQL, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { Agenda } from "src/drizzle/schema";
import {
  IAgendaRequestCreate,
  IAgendaRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/meeting.type";
import { MAgenda } from "../type/agenda.model";

type IAgendaQuery = {
  id?: number;
  ids?: number[];
  meetingId?: number;
  accepted?: boolean;
};

@Injectable()
export class AgendaRepository {
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
    param: IAgendaQuery,
  ): Promise<MAgenda[]> {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(Agenda.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(Agenda.id, param.ids));
    }
    if (param.meetingId) {
      whereClause.push(eq(Agenda.meetingId, param.meetingId));
    }
    if (param.accepted !== undefined) {
      whereClause.push(eq(Agenda.accepted, param.accepted));
    }
    whereClause.push(isNull(Agenda.deletedAt));

    const result = await tx
      .select()
      .from(Agenda)
      .where(and(...whereClause))
      .execute();

    return result.map(row => MAgenda.fromDBResult(row));
  }

  async find(param: IAgendaQuery): Promise<MAgenda[]> {
    return this.withTransaction(tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IAgendaRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(Agenda).values({
      ...param,
      meetingId: param.meeting.id,
      accepted: null,
      submittedAt: null,
      postedAt: null,
    });
    if (result.insertId === 0) {
      throw new HttpException(
        "Failed to insert agenda",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async insert(param: IAgendaRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  // update methods
  async updateTx(
    tx: DrizzleTransaction,
    param: IAgendaRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(Agenda)
      .set({
        submittedAt: param.submittedAt,
        postedAt: param.postedAt,
        accepted: param.accepted,
        updatedAt: new Date(),
      })
      .where(eq(Agenda.id, param.id))
      .execute();
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to update agenda",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(param: IAgendaRequestUpdate): Promise<void> {
    return this.db.transaction(async tx => this.updateTx(tx, param));
  }

  // delete methods
  async deleteTx(tx: DrizzleTransaction, param: IAgendaQuery): Promise<void> {
    const [result] = await tx
      .update(Agenda)
      .set({
        deletedAt: new Date(),
      })
      .where(and(eq(Agenda.id, param.id), isNull(Agenda.deletedAt)));
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to delete agenda",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(param: IAgendaQuery): Promise<void> {
    return this.withTransaction(tx => this.deleteTx(tx, param));
  }
}
