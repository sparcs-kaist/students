import { Injectable, Inject } from "@nestjs/common";
import { and, or, lte, gte, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import {
  Organization,
  OrganizationTypeEnum,
  OrganizationT,
  OrganizationTypeEnumT,
  User,
  UserStudent,
  OrganizationPresident,
  OrganizationPresidentT,
  UserT,
  UserStudentT,
  TeamT,
  Team,
} from "src/drizzle/schema";

export type OrganizationWithPresidentT = {
  organization: OrganizationT;
  organizationType: OrganizationTypeEnumT;
  president: OrganizationPresidentT;
  user: UserT;
  userStudent: UserStudentT;
};

@Injectable()
export class OrganizationRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  async getOrganizationById(id: number): Promise<OrganizationT[]> {
    return this.db.select().from(Organization).where(eq(Organization.id, id));
  }

  async getOrganizationWithPresidentById(
    organizationId: number,
    date: Date,
  ): Promise<OrganizationWithPresidentT[]> {
    const res = await this.db
      .select()
      .from(Organization)
      .innerJoin(
        OrganizationTypeEnum,
        eq(Organization.organizationTypeEnumId, OrganizationTypeEnum.id),
      )
      .innerJoin(
        OrganizationPresident,
        eq(Organization.id, OrganizationPresident.organizationId),
      )
      .innerJoin(User, eq(OrganizationPresident.userId, User.id))
      .innerJoin(UserStudent, eq(UserStudent.userId, User.id))
      .where(
        and(
          eq(Organization.id, organizationId),
          and(
            lte(OrganizationPresident.startTerm, date),
            or(
              gte(OrganizationPresident.endTerm, date),
              isNull(OrganizationPresident.endTerm),
            ),
          ),
          eq(OrganizationPresident.organizationPresidentTypeEnumId, 1), // 정후보만 찾음
        ),
      );
    return res.map(row => ({
      organization: row.organization,
      organizationType: row.organization_type_enum,
      president: row.organization_president,
      user: row.user,
      userStudent: row.user_student,
    }));
  }

  async getOrganizationsByTerms(
    startTerm: Date,
    endTerm: Date,
  ): Promise<
    {
      organization: OrganizationT;
      organizationTypeEnum: OrganizationTypeEnumT;
    }[]
  > {
    const res = await this.db
      .select()
      .from(Organization)
      .innerJoin(
        OrganizationTypeEnum,
        eq(Organization.organizationTypeEnumId, OrganizationTypeEnum.id),
      )
      .where(
        or(
          and(
            lte(Organization.startTerm, endTerm),
            gte(Organization.endTerm, startTerm),
          ),
          and(
            lte(Organization.startTerm, endTerm),
            isNull(Organization.endTerm),
          ),
        ),
      );

    return res.map(row => ({
      ...row,
      organizationTypeEnum: row.organization_type_enum,
    }));
  }

  async getTeamById(id: number): Promise<TeamT[]> {
    const res = await this.db.select().from(Team).where(eq(Team.id, id));
    return res;
  }
}
