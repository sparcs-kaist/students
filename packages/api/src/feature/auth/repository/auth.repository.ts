import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, eq, gte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { getKSTDate } from "@sparcs-students/root/packages/interface/src/common/util";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  Department,
  Organization,
  OrganizationMember,
  Student,
  User,
} from "@sparcs-students/api/drizzle/schema";
import { takeOne } from "@sparcs-students/api/common/util/util";
import { AuthActivatedRefreshTokens } from "@sparcs-students/api/drizzle/schema/refresh-token.schema";
import { MemberDbResult } from "@sparcs-students/api/feature/auth/type/member.model";

@Injectable()
export class AuthRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findOrCreateUser(
    email: string,
    studentNumber: string,
    uid: string,
    sid: string,
    name: string,
    type: string,
    department: string,
  ): Promise<MemberDbResult> {
    // User table에 해당 email이 있는지 확인 후 upsert
    await this.db
      .insert(User)
      .values({ uid, sid, name, email })
      .onDuplicateKeyUpdate({
        set: { name, email },
      });

    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.uid, uid))
      .then(takeOne);

    let result: MemberDbResult = {
      user,
    };

    // type이 "Student"인 경우 student table에서 해당 studentNumber이 있는지 확인 후 upsert
    // student_t에서 이번 학기의 해당 student_id이 있는지 확인 후 upsert
    // TODO: 임시로 "이전 사원" 타입을 학생으로 분류
    if (type === "Student" || type === "Ex-employee") {
      console.log(department);
      await this.db
        .insert(Student)
        .values({
          studentNumber: parseInt(studentNumber),
          userId: user.id,
          departmentId: parseInt(department),
        })
        .onDuplicateKeyUpdate({ set: { userId: user.id } });
      result = await this.findMemberById(user.id);

      // studentNumber의 뒤 네자리가 2000 미만일 경우 studentEnum을 1, 5000미만일 경우 2, 6000미만일 경우 1, 나머지는 3으로 설정
      // let studentEnum = 3;
      // let studentStatusEnum = 2;
      // if (parseInt(studentNumber.slice(-4)) < 2000) {
      //   studentEnum = 1;
      //   studentStatusEnum = 1;
      // } else if (parseInt(studentNumber.slice(-4)) < 6000) studentEnum = 2;
      // else if (parseInt(studentNumber.slice(-4)) < 7000) studentEnum = 1;

      // student 테이블에서 해당 user id를 모두 검색
      // undergraduate, master, doctor 중 해당하는 경우 result에 추가
      // const students = await this.db
      //   .select()
      //   .from(Student)
      //   .where(eq(Student.userId, user.id));

      /* eslint-disable no-shadow */
      // eslint-disable-next-line no-restricted-syntax
      // for (const student of students) {
      //   let studentEnum = 3;
      //   if (student.number % 10000 < 2000) studentEnum = 1;
      //   else if (student.number % 10000 < 6000) studentEnum = 2;
      //   else if (student.number % 10000 < 7000) studentEnum = 1;
      //
      //   if (studentEnum === 1) {
      //     result = {
      //       ...result,
      //       undergraduate: { id: student.id, number: student.number },
      //     };
      //   } else if (studentEnum === 2) {
      //     result = {
      //       ...result,
      //       master: { id: student.id, number: student.number },
      //     };
      //   } else if (studentEnum === 3) {
      //     result = {
      //       ...result,
      //       doctor: { id: student.id, number: student.number },
      //     };
      //   }
      // }
      /* eslint-enable no-shadow */

      // await this.db
      //   .insert(StudentT)
      //   .values({
      //     studentId: student.id,
      //     studentEnum,
      //     studentStatusEnum,
      //     department: parseInt(department),
      //     semesterId: semester.id,
      //     startTerm: semester.startTerm,
      //     endTerm: semester.endTerm,
      //   })
      //   .onDuplicateKeyUpdate({
      //     set: {
      //       studentEnum,
      //       studentStatusEnum,
      //       department: parseInt(department),
      //     },
      //   });
    }
    return result;
  }

  async findMemberById(
    userId: number,
    organizationId?: number,
  ): Promise<MemberDbResult> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.id, userId))
      .then(takeOne);

    const student = await this.db
      .select()
      .from(Student)
      .where(eq(Student.userId, userId))
      .then(takeOne);

    const [organizationMember, department] = await Promise.all([
      student?.id
        ? this.db
            .select()
            .from(OrganizationMember)
            .where(
              and(
                eq(OrganizationMember.studentId, student.id),
                eq(OrganizationMember.organizationId, organizationId),
              ),
            )
            .then(takeOne)
        : Promise.resolve(undefined),

      student?.departmentId
        ? this.db
            .select()
            .from(Department)
            .where(eq(Department.id, student.departmentId))
            .then(takeOne)
        : Promise.resolve(undefined),
    ]);

    const organization = organizationMember
      ? await this.db
          .select()
          .from(Organization)
          .where(eq(Organization.id, organizationId))
          .then(takeOne)
      : undefined;

    return {
      user,
      student,
      department,
      organizationMember,
      organization,
    };
  }

  async findUserByUid(uid: string): Promise<MemberDbResult> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.uid, uid))
      .then(takeOne);
    if (!user) {
      // @todo: custom exception으로 변경
      throw new NotFoundException(`User with uid ${uid} not found`);
    }
    const student = await this.db
      .select()
      .from(Student)
      .where(eq(Student.userId, user.id))
      .then(takeOne);

    const result: MemberDbResult = {
      user,
      student,
      department: student
        ? await this.db
            .select()
            .from(Department)
            .where(eq(Department.id, student.departmentId))
            .then(takeOne)
        : undefined,
    };
    return result;
  }

  async findUserById(id: number): Promise<MemberDbResult> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.id, id))
      .then(takeOne);

    const student = await this.db
      .select()
      .from(Student)
      .where(eq(Student.userId, id))
      .then(takeOne);

    const result: MemberDbResult = {
      user,
      student,
      department: student
        ? await this.db
            .select()
            .from(Department)
            .where(eq(Department.id, student.departmentId))
            .then(takeOne)
        : undefined,
    };
    return result;
  }

  async findUserAndRefreshToken(userId: number, refreshToken: string) {
    const cur = getKSTDate();
    return this.db
      .select()
      .from(AuthActivatedRefreshTokens)
      .where(
        and(
          eq(AuthActivatedRefreshTokens.userId, userId),
          eq(AuthActivatedRefreshTokens.refreshToken, refreshToken),
          gte(AuthActivatedRefreshTokens.expiresAt, cur),
        ),
      )
      .then(takeOne);
  }

  async createRefreshTokenRecord(
    userId: number,
    refreshToken: string,
    expiresAt: Date,
  ): Promise<boolean> {
    return this.db.transaction(async tx => {
      const [result] = await this.db
        .insert(AuthActivatedRefreshTokens)
        .values({ userId, expiresAt, refreshToken });
      const { affectedRows } = result;
      if (affectedRows !== 1) {
        await tx.rollback();
      }
      return true;
    });
  }

  async deleteRefreshTokenRecord(
    userId: number,
    refreshToken: string,
  ): Promise<boolean> {
    const cur = getKSTDate();
    return this.db.transaction(async tx => {
      const [result] = await this.db
        .delete(AuthActivatedRefreshTokens)
        .where(
          and(
            eq(AuthActivatedRefreshTokens.userId, userId),
            eq(AuthActivatedRefreshTokens.refreshToken, refreshToken),
            gte(AuthActivatedRefreshTokens.expiresAt, cur),
          ),
        );
      const { affectedRows } = result;
      if (affectedRows !== 1) {
        await tx.rollback();
      }
      return true;
    });
  }
}
