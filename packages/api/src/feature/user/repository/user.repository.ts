import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-students/api/drizzle/drizzle.provider";
import { Department, Student, User } from "@sparcs-students/api/drizzle/schema";

@Injectable()
export class UserRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findStudentProfileByUserId(userId: number) {
    const [profile] = await this.db
      .select({
        studentId: Student.id,
        studentNumber: Student.studentNumber,
        userId: User.id,
        sid: User.sid,
        uid: User.uid,
        email: User.email,
        name: User.name,
        department: {
          id: Department.id,
          name: Department.name,
        },
      })
      .from(User)
      .innerJoin(Student, eq(Student.userId, User.id))
      .leftJoin(Department, eq(Department.id, Student.departmentId))
      .where(eq(User.id, userId))
      .limit(1);

    return profile;
  }
}
