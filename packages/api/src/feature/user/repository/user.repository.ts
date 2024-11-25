import { Injectable, Inject } from "@nestjs/common";
import { User, UserStudent, UserT } from "@sparcs-students/api/drizzle/schema";
import {
  ApiUsr001RequestBody,
  ApiUsr001ResponseCreated,
} from "@sparcs-students/interface/api/user/index";

import { and, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  /**
   * @param id User id
   * @returns User id에 해당하는 User 객체를 리턴합니다.
   */
  async getUserById(userId: number): Promise<UserT[]> {
    const res = await this.db.select().from(User).where(eq(User.id, userId));
    return res;
  }

  /**
   * @param name, email
   * @returns 0 (해당 id가 없을 때) or userId(있을 때)를 리턴합니다.
   * service에서 0이면 create, 0이 아니면 update를 실행합니다.
   */
  async ckUserBeforeCreate(name: string, email: string): Promise<number> {
    const select = await this.db
      .select()
      .from(User)
      .where(and(eq(User.name, name), eq(User.email, email)))
      .limit(1);
    if (select.length === 0) {
      return 0;
    }
    return select[0].id;
  }

  /**
   * @param usr001 req body
   * @returns {0,0} (해당 id가 없을 때) or {userId, userStudentId}(있을 때)를 리턴합니다.
   * service에서 0이면 create, 0이 아니면 update를 실행합니다.
   */
  async ckUserStudentBeforeCreate(
    body: ApiUsr001RequestBody,
  ): Promise<ApiUsr001ResponseCreated> {
    const select = await this.db
      .select()
      .from(User)
      .innerJoin(UserStudent, eq(User.id, UserStudent.userId))
      .where(
        and(
          eq(User.name, body.name),
          eq(User.email, body.email),
          eq(UserStudent.studentNumber, body.studentNumber),
        ),
      )
      .limit(1);
    if (select.length === 0) {
      return { userId: 0, userStudentId: 0 };
    }
    return {
      userId: select[0].user.id,
      userStudentId: select[0].user_student.id,
    };
  }

  /**
   * @param name,email,studentNumber
   * @returns 생성된 userId를 리턴합니다.
   */
  async createUserStudent(
    body: ApiUsr001RequestBody,
  ): Promise<ApiUsr001ResponseCreated> {
    await this.db
      .insert(User)
      .values({
        name: body.name,
        email: body.email,
      })
      .execute();

    const userId = await this.ckUserBeforeCreate(body.name, body.email);

    await this.db
      .insert(UserStudent)
      .values({
        userId,
        studentNumber: body.studentNumber,
      })
      .execute();

    const res = await this.ckUserStudentBeforeCreate(body);
    return res;
  }
}
