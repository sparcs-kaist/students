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
import { OrganizationMember } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOrganizationMemberRequestCreate,
  IOrganizationMemberRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MOrganizationMember } from "../type/organization.member.model";

type IOrganizationMemberQuery = {
  id?: number;
  ids?: number[];
  studentId?: number;
  organizationId?: number;
  duration?: DurationFull;
};

@Injectable()
export class OrganizationMemberRepository {
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
    param: IOrganizationMemberQuery,
  ): Promise<MOrganizationMember[] | null> {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(OrganizationMember.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(OrganizationMember.id, param.ids));
    }
    if (param.studentId) {
      whereClause.push(eq(OrganizationMember.studentId, param.studentId));
    }
    if (param.organizationId) {
      whereClause.push(
        eq(OrganizationMember.organizationId, param.organizationId),
      );
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(OrganizationMember.startTerm, param.duration.endTerm),
            and(
              isNotNull(OrganizationMember.endTerm),
              lt(OrganizationMember.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNotNull(OrganizationMember.deletedAt));

    const result = await tx
      .select()
      .from(OrganizationMember)
      .where(and(...whereClause))
      .execute();

    if (result.length === 0) {
      return null;
    }
    return result.map(r => MOrganizationMember.fromDBResult(r));
  }

  async find(
    param: IOrganizationMemberQuery,
  ): Promise<MOrganizationMember[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IOrganizationMemberRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(OrganizationMember).values({
      ...param,
      organizationId: param.organization.id,
      studentId: param.student.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException(
        "Failed to insert organizationMember",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async insert(param: IOrganizationMemberRequestCreate): Promise<void> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  async updateTx(
    tx: DrizzleTransaction,
    param: IOrganizationMemberRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(OrganizationMember)
      .set({
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(
        and(
          eq(OrganizationMember.id, param.id),
          eq(OrganizationMember.organizationId, param.organization.id),
          eq(OrganizationMember.studentId, param.student.id),
          isNull(OrganizationMember.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to update organizationMember",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(param: IOrganizationMemberRequestUpdate): Promise<void> {
    await this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete methods
  async deleteTx(
    tx: DrizzleTransaction,
    param: IOrganizationMemberQuery,
  ): Promise<void> {
    const [result] = await tx
      .update(OrganizationMember)
      .set({
        deletedAt: new Date(),
      })
      .where(
        and(
          eq(OrganizationMember.id, param.id),
          eq(OrganizationMember.studentId, param.studentId),
          eq(OrganizationMember.organizationId, param.organizationId),
          isNull(OrganizationMember.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to delete organizationMember",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(param: IOrganizationMemberQuery): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
