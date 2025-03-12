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
import { OrganizationPresident } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOrganizationPresidentRequestCreate,
  IOrganizationPresidentRequestUpdate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MOrganizationPresident } from "../type/organization.president.model";

type IOrganizationPresidentQuery = {
  id?: number;
  ids?: number[];
  studentId?: number;
  organizationId?: number;
  organizationPresidentTypeEnum?: number;
  phoneNumber?: string;
  duration?: DurationFull;
};

@Injectable()
export class OrganizationPresidentRepository {
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
    param: IOrganizationPresidentQuery,
  ): Promise<MOrganizationPresident[] | null> {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(OrganizationPresident.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(OrganizationPresident.id, param.ids));
    }
    if (param.studentId) {
      whereClause.push(eq(OrganizationPresident.studentId, param.studentId));
    }
    if (param.organizationId) {
      whereClause.push(
        eq(OrganizationPresident.organizationId, param.organizationId),
      );
    }
    if (param.organizationPresidentTypeEnum) {
      whereClause.push(
        eq(
          OrganizationPresident.organizationPresidentTypeEnum,
          param.organizationPresidentTypeEnum,
        ),
      );
    }
    if (param.phoneNumber) {
      whereClause.push(
        eq(OrganizationPresident.phoneNumber, param.phoneNumber),
      );
    }
    if (param.duration) {
      whereClause.push(
        not(
          or(
            gt(OrganizationPresident.startTerm, param.duration.endTerm),
            and(
              isNotNull(OrganizationPresident.endTerm),
              lt(OrganizationPresident.endTerm, param.duration.startTerm),
            ),
          ),
        ),
      );
    }

    whereClause.push(isNotNull(OrganizationPresident.deletedAt));

    const result = await tx
      .select()
      .from(OrganizationPresident)
      .where(and(...whereClause))
      .execute();

    if (result.length === 0) {
      return null;
    }
    return result.map(r => MOrganizationPresident.fromDBResult(r));
  }

  async find(
    param: IOrganizationPresidentQuery,
  ): Promise<MOrganizationPresident[] | null> {
    return this.withTransaction(async tx => this.findTx(tx, param));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    param: IOrganizationPresidentRequestCreate,
  ): Promise<void> {
    const [result] = await tx.insert(OrganizationPresident).values({
      ...param,
      organizationId: param.organization.id,
      studentId: param.student.id,
      startTerm: param.duration.startTerm,
      endTerm: param.duration.endTerm,
    });
    if (result.insertId === undefined) {
      throw new HttpException(
        "Failed to insert organizationPresident",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async insert(param: IOrganizationPresidentRequestCreate): Promise<void> {
    return this.withTransaction(async tx => this.insertTx(tx, param));
  }

  async updateTx(
    tx: DrizzleTransaction,
    param: IOrganizationPresidentRequestUpdate,
  ): Promise<void> {
    const [result] = await tx
      .update(OrganizationPresident)
      .set({
        organizationPresidentTypeEnum: param.organizationPresidentTypeEnum,
        title: param.title,
        phoneNumber: param.phoneNumber,
        startTerm: param.duration.startTerm,
        endTerm: param.duration.endTerm,
      })
      .where(
        and(
          eq(OrganizationPresident.id, param.id),
          eq(OrganizationPresident.organizationId, param.organization.id),
          eq(OrganizationPresident.studentId, param.student.id),
          isNull(OrganizationPresident.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to update organizationPresident",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(param: IOrganizationPresidentRequestUpdate): Promise<void> {
    return this.withTransaction(async tx => this.updateTx(tx, param));
  }

  // delete methods
  async deleteTx(
    tx: DrizzleTransaction,
    param: IOrganizationPresidentQuery,
  ): Promise<void> {
    const [result] = await tx
      .update(OrganizationPresident)
      .set({ deletedAt: new Date() })
      .where(
        and(
          eq(OrganizationPresident.id, param.id),
          eq(OrganizationPresident.studentId, param.studentId),
          eq(OrganizationPresident.organizationId, param.organizationId),
          isNull(OrganizationPresident.deletedAt),
        ),
      );
    if (result.affectedRows === 0) {
      throw new HttpException(
        "Failed to delete organizationPresident",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(param: IOrganizationPresidentQuery): Promise<void> {
    await this.withTransaction(async tx => this.deleteTx(tx, param));
  }
}
