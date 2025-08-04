import { Injectable, Inject } from "@nestjs/common";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import { ApiSem001ResponseOk } from "@sparcs-students/interface/api/semester/index";
import { SemesterRepository } from "../repository/semester.repository";

@Injectable()
export class SemesterService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
    private readonly semesterRepository: SemesterRepository,
  ) {}

  async getSemesterAll(): Promise<ApiSem001ResponseOk[]> {
    const semesters = await this.semesterRepository.find({});
    return semesters;
  }
}
