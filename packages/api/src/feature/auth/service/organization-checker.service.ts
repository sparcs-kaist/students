import { Inject, Injectable } from "@nestjs/common";
import { and, count, eq, gt, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-students/api/drizzle/drizzle.provider";
import {
  Organization,
  OrganizationMember,
} from "@sparcs-students/api/drizzle/schema/organization.schema";
import { OrganizationTypeEnum } from "@sparcs-students/interface/common/enum/organization.enum";

@Injectable()
export class OrganizationCheckerService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private activeTermClause(table: { startTerm: any; endTerm: any }, now: Date) {
    return and(
      or(isNull(table.startTerm), lte(table.startTerm, now)),
      or(isNull(table.endTerm), gt(table.endTerm, now)),
    );
  }

  async isMemberOfOrganizationType(
    studentId: number,
    organizationTypeEnum: OrganizationTypeEnum,
    now = new Date(),
  ): Promise<boolean> {
    const [row] = await this.db
      .select({ c: count() })
      .from(OrganizationMember)
      .innerJoin(
        Organization,
        eq(OrganizationMember.organizationId, Organization.id),
      )
      .where(
        and(
          isNull(OrganizationMember.deletedAt),
          eq(OrganizationMember.studentId, studentId),
          this.activeTermClause(OrganizationMember, now),
          isNull(Organization.deletedAt),
          eq(Organization.organizationTypeEnum, organizationTypeEnum),
          this.activeTermClause(Organization, now),
        ),
      );

    return (row?.c ?? 0) > 0;
  }
}
