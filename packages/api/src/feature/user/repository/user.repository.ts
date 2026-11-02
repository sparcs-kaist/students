import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { Department, Student, User } from "@sparcs-students/api/drizzle/schema";
import { IStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { takeOne } from "@sparcs-students/api/common/util/util";

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  async findStudentByNumber(
    studentNumber: number,
  ): Promise<IStudent | undefined> {
    const result = await this.db
      .select({
        id: Student.id,
        studentNumber: Student.studentNumber,
        userId: User.id,
        uid: User.uid,
        sid: User.sid,
        email: User.email,
        name: User.name,
        departmentId: Department.id,
        departmentName: Department.name,
      })
      .from(Student)
      .innerJoin(User, eq(Student.userId, User.id))
      .innerJoin(Department, eq(Student.departmentId, Department.id))
      .where(eq(Student.studentNumber, studentNumber))
      .limit(1)
      .then(takeOne);

    if (!result) {
      return undefined;
    }

    return {
      id: result.id,
      studentNumber: result.studentNumber,
      user: {
        id: result.userId,
        uid: result.uid,
        sid: result.sid,
        email: result.email,
        name: result.name,
      },
      department: {
        id: result.departmentId,
        name: result.departmentName,
      },
    };
  }
}
