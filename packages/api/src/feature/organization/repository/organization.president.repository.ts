import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { OrganizationPresident } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOrganizationPresident,
  IOrganizationPresidentRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MOrganizationPresident } from "../model/organization.president.model";

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
    organizationPresidentId: IOrganizationPresident["id"],
  ): Promise<MOrganizationPresident | null> {
    const [result] = await tx
      .select()
      .from(OrganizationPresident)
      .where(eq(OrganizationPresident.id, organizationPresidentId))
      .execute();

    return result ? MOrganizationPresident.fromDBResult(result) : null;
  }

  async findAllTx(
    tx: DrizzleTransaction,
    organizationPresidentIds: IOrganizationPresident["id"][],
  ): Promise<MOrganizationPresident[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MOrganizationPresident[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    arg1: IOrganizationPresident["id"][] | DurationFull,
  ): Promise<MOrganizationPresident[]> {
    let query = tx.select().from(OrganizationPresident).$dynamic();
    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(OrganizationPresident.id, arg1));
    } else if ("startTerm" in arg1 && "endTerm" in arg1) {
      whereConditions.push(
        not(
          or(
            gt(OrganizationPresident.startTerm, arg1.endTerm),
            and(
              isNotNull(OrganizationPresident.endTerm),
              lt(OrganizationPresident.endTerm, arg1.startTerm),
            ),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(OrganizationPresident.deletedAt));
    query = query.where(and(...whereConditions));

    const res = await query.execute();
    return res.map(r => MOrganizationPresident.fromDBResult(r));
  }

  // fetch methods
  async fetchTx(
    tx: DrizzleTransaction,
    id: IOrganizationPresident["id"],
  ): Promise<MOrganizationPresident> {
    const result = await this.findTx(tx, id);
    if (!result) {
      throw new HttpException(
        "OrganizationPresident not found",
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async fetch(
    id: IOrganizationPresident["id"],
  ): Promise<MOrganizationPresident> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: IOrganizationPresident["id"][] | DurationFull,
  ): Promise<MOrganizationPresident[]> {
    if (Array.isArray(arg1)) {
      // arg1이 organizationPresidentIds 배열인 경우
      // 요청한 ID를 Set으로 변환하여 중복 제거
      const uniqueIds = Array.from(new Set(arg1));

      const results = await this.findAllTx(tx, uniqueIds);
      // 반환된 ID를 Set으로 변환하여 중복 제거
      const returnedIds = new Set(results.map(org => org.id));

      if (returnedIds.size === uniqueIds.length) {
        throw new HttpException(
          "No OrganizationPresidents found",
          HttpStatus.NOT_FOUND,
        );
      }
      return results;
    }
    // arg1이 DurationFull인 경우
    const results = await this.findAllTx(tx, arg1);
    if (results.length === 0) {
      throw new HttpException(
        "No OrganizationPresidents found",
        HttpStatus.NOT_FOUND,
      );
    }
    return results;
  }

  async fetchAll(
    ids: IOrganizationPresident["id"][],
  ): Promise<MOrganizationPresident[]>;
  async fetchAll(duration: DurationFull): Promise<MOrganizationPresident[]>;
  async fetchAll(
    arg1: IOrganizationPresident["id"][] | DurationFull,
  ): Promise<MOrganizationPresident[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, arg1));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    data: IOrganizationPresidentRequestCreate,
  ): Promise<MOrganizationPresident> {
    const result = await tx
      .insert(OrganizationPresident)
      .values({
        organizationId: data.organization.id,
        organizationPresidentTypeEnum: data.organizationPresidentTypeEnum,
        title: data.title,
        studentId: data.student.id,
        phoneNumber: data.phoneNumber,
        startTerm: data.duration.startTerm,
        endTerm: data.duration.endTerm ?? null,
      })
      .execute();
    const insertedId = result[0].insertId;
    const organizationPresident = await this.findTx(tx, insertedId);
    if (!organizationPresident) {
      throw new HttpException(
        "Failed to create organizationPresident",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return organizationPresident;
  }

  async insert(
    data: IOrganizationPresidentRequestCreate,
  ): Promise<MOrganizationPresident> {
    return this.db.transaction(async tx => this.insertTx(tx, data));
  }
}
