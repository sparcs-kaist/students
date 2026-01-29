import { Inject, Injectable } from "@nestjs/common";
import { and, count, eq, isNull, lte, or, gt } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-students/api/drizzle/drizzle.provider";
import {
  OrganizationManager,
  OrganizationPresident,
  Staff,
  Uapresident,
} from "@sparcs-students/api/drizzle/schema/organization.schema";

@Injectable()
export class PositionCheckerService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private activeTermClause(table: { startTerm: any; endTerm: any }, now: Date) {
    return and(
      lte(table.startTerm, now),
      or(isNull(table.endTerm), gt(table.endTerm, now)),
    );
  }

  async isManager(studentId: number, now = new Date()): Promise<boolean> {
    const [row] = await this.db
      .select({ c: count() })
      .from(OrganizationManager)
      .where(
        and(
          isNull(OrganizationManager.deletedAt),
          eq(OrganizationManager.studentId, studentId),
          this.activeTermClause(OrganizationManager, now),
        ),
      );

    return (row?.c ?? 0) > 0;
  }

  async isPresident(studentId: number, now = new Date()): Promise<boolean> {
    const [row] = await this.db
      .select({ c: count() })
      .from(OrganizationPresident)
      .where(
        and(
          isNull(OrganizationPresident.deletedAt),
          eq(OrganizationPresident.studentId, studentId),
          this.activeTermClause(OrganizationPresident, now),
        ),
      );

    return (row?.c ?? 0) > 0;
  }

  async isStaff(studentId: number, now = new Date()): Promise<boolean> {
    const [row] = await this.db
      .select({ c: count() })
      .from(Staff)
      .where(
        and(
          isNull(Staff.deletedAt),
          eq(Staff.studentId, studentId),
          this.activeTermClause(Staff, now),
        ),
      );

    return (row?.c ?? 0) > 0;
  }

  async isUapresident(studentId: number, now = new Date()): Promise<boolean> {
    const [row] = await this.db
      .select({ c: count() })
      .from(Uapresident)
      .where(
        and(
          isNull(Uapresident.deletedAt),
          eq(Uapresident.studentId, studentId),
          this.activeTermClause(Uapresident, now),
        ),
      );

    return (row?.c ?? 0) > 0;
  }
}
