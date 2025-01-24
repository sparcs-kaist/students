import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { Organization } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import { IOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { MOrganization } from "../type/organization.model";

@Injectable()
export class OrganizationRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  async fetchAllTx(tx: DrizzleTransaction): Promise<MOrganization[]>;
  async fetchAllTx(
    tx: DrizzleTransaction,
    organizationIds: IOrganization["id"][],
  ): Promise<MOrganization[]>;
  async fetchAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MOrganization[]>;

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1?: number[] | DurationFull,
  ): Promise<MOrganization[]> {
    let query = tx.select().from(Organization).$dynamic();

    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(Organization.id, arg1));
    }

    if (arg1 && "startTerm" in arg1 && "endTerm" in arg1) {
      whereConditions.push(
        not(
          or(
            gt(Organization.startTerm, arg1.startTerm),
            and(
              isNotNull(Organization.endTerm),
              lt(Organization.endTerm, arg1.endTerm),
            ),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(Organization.deletedAt));

    query = query.where(and(...whereConditions));

    const res = await query.execute();

    if (res.length === 0) {
      throw new HttpException("No Organization found", HttpStatus.NOT_FOUND);
    }

    return res.map(r => MOrganization.fromDBResult(r));
  }

  async fetchAll(): Promise<MOrganization[]>;
  async fetchAll(
    organizationIds: IOrganization["id"][],
  ): Promise<MOrganization[]>;
  async fetchAll(duration: DurationFull): Promise<MOrganization[]>;

  async fetchAll(arg1?: number[] | DurationFull): Promise<MOrganization[]> {
    const res = await this.db.transaction(async tx => {
      if (Array.isArray(arg1)) {
        // arg1이 number[]인 경우
        return this.fetchAllTx(tx, arg1);
      }
      if (arg1 && "startTerm" in arg1 && "endTerm" in arg1) {
        // arg1이 DurationFull인 경우
        return this.fetchAllTx(tx, arg1);
      }
      // arg1이 undefined인 경우
      return this.fetchAllTx(tx);
    });
    return res;
  }
}
