import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { Organization } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOrganization,
  IOrganizationRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.type";
import { MOrganization } from "../model/organization.model";

@Injectable()
export class OrganizationRepository {
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
    organizationId: IOrganization["id"],
  ): Promise<MOrganization | null> {
    const [result] = await tx
      .select()
      .from(Organization)
      .where(eq(Organization.id, organizationId))
      .execute();

    return result ? MOrganization.fromDBResult(result) : null;
  }

  async findAllTx(
    tx: DrizzleTransaction,
    organizationIds: IOrganization["id"][],
  ): Promise<MOrganization[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MOrganization[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    arg1: IOrganization["id"][] | DurationFull,
  ): Promise<MOrganization[]> {
    let query = tx.select().from(Organization).$dynamic();
    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(Organization.id, arg1));
    } else if ("startTerm" in arg1 && "endTerm" in arg1) {
      whereConditions.push(
        not(
          or(
            gt(Organization.startTerm, arg1.endTerm),
            and(
              isNotNull(Organization.endTerm),
              lt(Organization.endTerm, arg1.startTerm),
            ),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(Organization.deletedAt));
    query = query.where(and(...whereConditions));

    const res = await query.execute();
    return res.map(r => MOrganization.fromDBResult(r));
  }

  // fetch methods
  async fetchTx(
    tx: DrizzleTransaction,
    id: IOrganization["id"],
  ): Promise<MOrganization> {
    const result = await this.findTx(tx, id);
    if (!result) {
      throw new HttpException("Organization not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async fetch(id: IOrganization["id"]): Promise<MOrganization> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: IOrganization["id"][] | DurationFull,
  ): Promise<MOrganization[]> {
    if (Array.isArray(arg1)) {
      // arg1이 organizationIds 배열인 경우
      // 요청한 ID를 Set으로 변환하여 중복 제거
      const uniqueIds = Array.from(new Set(arg1));

      const results = await this.findAllTx(tx, uniqueIds);
      // 반환된 ID를 Set으로 변환하여 중복 제거
      const returnedIds = new Set(results.map(org => org.id));

      if (returnedIds.size === uniqueIds.length) {
        throw new HttpException("No Organizations found", HttpStatus.NOT_FOUND);
      }
      return results;
    }
    // arg1이 DurationFull인 경우
    const results = await this.findAllTx(tx, arg1);
    if (results.length === 0) {
      throw new HttpException("No Organizations found", HttpStatus.NOT_FOUND);
    }
    return results;
  }

  async fetchAll(ids: IOrganization["id"][]): Promise<MOrganization[]>;
  async fetchAll(duration: DurationFull): Promise<MOrganization[]>;
  async fetchAll(
    arg1: IOrganization["id"][] | DurationFull,
  ): Promise<MOrganization[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, arg1));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    data: IOrganizationRequestCreate,
  ): Promise<MOrganization> {
    const result = await tx
      .insert(Organization)
      .values({
        name: data.name,
        nameEng: data.nameEng,
        organizationTypeEnum: data.organizationTypeEnum,
        foundingYear: data.foundingYear,
        startTerm: data.duration.startTerm,
        endTerm: data.duration.endTerm ?? null,
        organizationStateEnum: data.organizationStateEnum,
      })
      .execute();
    const insertedId = result[0].insertId;
    const organization = await this.findTx(tx, insertedId);
    if (!organization) {
      throw new HttpException(
        "Failed to create organization",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return organization;
  }

  async insert(data: IOrganizationRequestCreate): Promise<MOrganization> {
    return this.db.transaction(async tx => this.insertTx(tx, data));
  }
}
