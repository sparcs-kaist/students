import { Injectable, Inject, HttpStatus, HttpException } from "@nestjs/common";

import { and, gt, inArray, isNotNull, lt, not, or, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { OrganizationMember } from "src/drizzle/schema";
import { DurationFull } from "@sparcs-students/interface/common/type/time.type";
import {
  IOrganizationMember,
  IOrganizationMemberRequestCreate,
} from "@sparcs-students/interface/api/organization/type/organization.student.type";
import { MOrganizationMember } from "../type/organization.member.model"; // type이랑 model 경로 중에서 뭘 써야하는 지 잘 모르겠어서 우선 type에 만들어뒀어여,,

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
    organizationMemberId: IOrganizationMember["id"],
  ): Promise<MOrganizationMember | null> {
    const [result] = await tx
      .select()
      .from(OrganizationMember)
      .where(eq(OrganizationMember.id, organizationMemberId))
      .execute();

    return result ? MOrganizationMember.fromDBResult(result) : null;
  }

  async findAllTx(
    tx: DrizzleTransaction,
    organizationMemberIds: IOrganizationMember["id"][],
  ): Promise<MOrganizationMember[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    duration: DurationFull,
  ): Promise<MOrganizationMember[]>;
  async findAllTx(
    tx: DrizzleTransaction,
    arg1: IOrganizationMember["id"][] | DurationFull,
  ): Promise<MOrganizationMember[]> {
    let query = tx.select().from(OrganizationMember).$dynamic();
    const whereConditions = [];

    if (Array.isArray(arg1)) {
      // arg1이 ID 배열일 경우
      whereConditions.push(inArray(OrganizationMember.id, arg1));
    } else if ("startTerm" in arg1 && "endTerm" in arg1) {
      // arg1이 DurationFull일 경우
      // 제외 조건 1 : startTerm이 arg1.endTerm보다 큰 경우
      // 제외 조건 2 : endTerm이 null이 아닌데 arg1.startTerm보다 작은 경우
      whereConditions.push(
        not(
          or(
            gt(OrganizationMember.startTerm, arg1.endTerm),
            and(
              isNotNull(OrganizationMember.endTerm),
              lt(OrganizationMember.endTerm, arg1.startTerm),
            ),
          ),
        ),
      );
    }

    whereConditions.push(isNotNull(OrganizationMember.deletedAt));
    query = query.where(and(...whereConditions));

    const res = await query.execute();
    return res.map(r => MOrganizationMember.fromDBResult(r));
  }

  // fetch methods
  async fetchTx(
    tx: DrizzleTransaction,
    id: IOrganizationMember["id"],
  ): Promise<MOrganizationMember> {
    const member = await this.findTx(tx, id);
    if (!member) {
      throw new HttpException("Member not found", HttpStatus.NOT_FOUND);
    }
    return member;
  }

  async fetch(id: IOrganizationMember["id"]): Promise<MOrganizationMember> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: IOrganizationMember["id"][] | DurationFull,
  ): Promise<MOrganizationMember[]> {
    if (Array.isArray(arg1)) {
      // arg1이 ID 배열일 경우
      const uniqueIds = Array.from(new Set(arg1));

      const results = await this.findAllTx(tx, uniqueIds);

      const returnedIds = new Set(results.map(org => org.id));

      if (returnedIds.size === uniqueIds.length) {
        throw new HttpException(
          "No OrganizationMembers found",
          HttpStatus.NOT_FOUND,
        );
      }
      return results;
    }
    // arg1이 DurationFull일 경우
    const results = await this.findAllTx(tx, arg1);
    if (results.length === 0) {
      throw new HttpException(
        "No OrganizationMembers found",
        HttpStatus.NOT_FOUND,
      );
    }
    return results;
  }

  async fetchAll(
    ids: IOrganizationMember["id"][],
  ): Promise<MOrganizationMember[]>;
  async fetchAll(duration: DurationFull): Promise<MOrganizationMember[]>;
  async fetchAll(
    arg1: IOrganizationMember["id"][] | DurationFull,
  ): Promise<MOrganizationMember[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, arg1));
  }

  // insert methods
  async insertTx(
    tx: DrizzleTransaction,
    data: IOrganizationMemberRequestCreate,
  ): Promise<MOrganizationMember> {
    const result = await tx
      .insert(OrganizationMember)
      .values({
        organizationId: data.organization.id,
        studentId: data.student.id,
        startTerm: data.duration.startTerm,
        endTerm: data.duration.endTerm ?? null,
      })
      .execute();
    const insertedId = result[0].insertId;
    const organizationMember = await this.findTx(tx, insertedId);
    if (!organizationMember) {
      throw new HttpException(
        "Failed to create organizationMember",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return organizationMember;
  }

  async insert(
    data: IOrganizationMemberRequestCreate,
  ): Promise<MOrganizationMember> {
    return this.db.transaction(async tx => this.insertTx(tx, data));
  }
}
