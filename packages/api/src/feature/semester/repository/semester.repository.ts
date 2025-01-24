import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { Semester } from "@sparcs-students/api/drizzle/schema";
import { and, inArray, isNotNull } from "drizzle-orm";
import { MSemester } from "../type/semester.model";

@Injectable()
export class SemesterRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  /**
   * @param id semester id
   * @returns Semester id에 해당하는 Semester 객체를 리턴합니다.
   * @description 학생이 해당 동아리의 대표자 또는 대의원이 아닌 경우 404 exception을 throw 합니다.
   */
  async fetchAllTx(tx: DrizzleTransaction): Promise<MSemester[]>;
  async fetchAllTx(
    tx: DrizzleTransaction,
    semesterIds: number[],
  ): Promise<MSemester[]>;

  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1?: number[],
  ): Promise<MSemester[]> {
    let query = tx.select().from(Semester).$dynamic();

    const whereConditions = [];

    if (arg1 instanceof Array) {
      whereConditions.push(inArray(Semester.id, arg1));
    }

    // 삭제된 항목 제외
    whereConditions.push(isNotNull(Semester.deletedAt));

    // 조건이 하나라도 있으면 AND로 묶어서 처리
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    // 쿼리 실행
    const res = await query.execute();

    if (res.length === 0) {
      throw new HttpException(
        `No Semester found: ${arg1}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return res.map(r => MSemester.fromDBResult(r));
  }

  async fetchAll(): Promise<MSemester[]>;
  async fetchAll(semesterIds: number[]): Promise<MSemester[]>;

  async fetchAll(arg1?: number[]): Promise<MSemester[]> {
    const res = await this.db.transaction(async tx => {
      const resTx = await this.fetchAllTx(tx, arg1);
      return resTx;
    });
    return res;
  }
}
