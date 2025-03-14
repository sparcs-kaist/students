import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { HalfYear } from "@sparcs-students/api/drizzle/schema";
import { isNotNull, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { VHalfYearSummary } from "../type/halfYear.summary.model";
import { MHalfYear } from "../type/halfYear.model";
import { SemesterRepository } from "./semester.repository";

@Injectable()
export class HalfYearRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  /**
   * @param id semester id
   * @returns Semester id에 해당하는 Semester 객체를 리턴합니다.
   * @description 학생이 해당 동아리의 대표자 또는 대의원이 아닌 경우 404 exception을 throw 합니다.
   */

  async fetchSummaryAll(
    transaction?: DrizzleTransaction,
  ): Promise<VHalfYearSummary[]> {
    const db = transaction ?? this.db;

    const res = await db
      .select()
      .from(HalfYear)
      .where(isNotNull(HalfYear.deletedAt))
      .orderBy(HalfYear.year);

    if (res.length === 0) {
      throw new HttpException("No half year found", HttpStatus.NOT_FOUND);
    }

    return res.map(r => VHalfYearSummary.fromDBResult(r));
  }

  async fetchAll(transaction?: DrizzleTransaction): Promise<MHalfYear[]> {
    const db = transaction ?? this.db;
    const halfYears = await db
      .select()
      .from(HalfYear)
      .where(isNull(HalfYear.deletedAt))
      .orderBy(HalfYear.year);

    console.log(halfYears);

    const semesterIds = [
      ...new Set([
        ...halfYears.map(h => h.regularSemesterId),
        ...halfYears.map(h => h.seasonalSemesterId),
      ]),
    ];

    const semesters = await this.semesterRepository.fetchAll(semesterIds);

    if (halfYears.length === 0) {
      throw new HttpException("No half year found", HttpStatus.NOT_FOUND);
    }

    const res = halfYears.map(h => {
      const regularSemester = semesters.find(s => s.id === h.regularSemesterId);
      const seasonalSemester = semesters.find(
        s => s.id === h.seasonalSemesterId,
      );

      return MHalfYear.fromDBResult({
        ...h,
        regularSemester,
        seasonalSemester,
      });
    });
    return res;
  }
}
