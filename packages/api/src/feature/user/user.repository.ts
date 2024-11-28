import { Injectable, Inject } from "@nestjs/common";
import { User, UserT } from "@sparcs-students/api/drizzle/schema";
import { eq } from "drizzle-orm";
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
    const res = await this.db
      .select()
      .from(User)
      .where(eq(User.id, userId))
      .limit(1);
    return res;
  }
}
