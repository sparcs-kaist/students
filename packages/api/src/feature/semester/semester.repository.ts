import { Injectable, Inject } from "@nestjs/common";
import { Semester, SemesterT } from "@sparcs-students/api/drizzle/schema";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

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
  async getSemesterById(semester_id: number): Promise<SemesterT[]> {
    const res = await this.db
      .select()
      .from(Semester)
      .where(eq(Semester.id, semester_id))
      .limit(1);
    return res;
  }
}
