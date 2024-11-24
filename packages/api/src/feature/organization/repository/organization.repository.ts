import { Injectable, Inject } from "@nestjs/common";
import { ApiOrg002RequestBody } from "@sparcs-students/interface/api/organization/index";
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
    id: number,
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
          eq(Organization.id, id),
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

  async ckOrganizationBeforeCreate(
    body: ApiOrg002RequestBody,
  ): Promise<number> {
    const select = await this.db
      .select()
      .from(Organization)
      .where(
        and(
          eq(Organization.name, body.name),
          eq(Organization.nameEng, body.nameEng),
          eq(Organization.organizationTypeEnumId, body.organizationTypeId),
          eq(Organization.foundingYear, body.foundingYear),
          eq(Organization.startTerm, body.startTerm),
        ),
      )
      .limit(1);
    if (select.length === 0) {
      return 0;
    }
    return select[0].id;
  }

  async createOrganization(body: ApiOrg002RequestBody): Promise<number> {
    await this.db
      .insert(Organization)
      .values({
        name: body.name,
        nameEng: body.nameEng,
        organizationTypeEnumId: body.organizationTypeId,
        foundingYear: body.foundingYear,
        startTerm: body.startTerm,
        endTerm: body.endTerm ? body.endTerm : null,
      })
      .execute();

    const res = await this.ckOrganizationBeforeCreate(body);
    return res;
  }
}
