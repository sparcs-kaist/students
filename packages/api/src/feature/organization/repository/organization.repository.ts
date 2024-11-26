import { Injectable, Inject } from "@nestjs/common";

import {
  ApiOrg002RequestBody,
  ApiOrg003RequestBody,
} from "@sparcs-students/interface/api/organization/index";

import { and, or, lte, gte, eq, isNull, desc } from "drizzle-orm";
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

  async ckOrganizationPresidentBeforeCreate(
    body: Omit<ApiOrg003RequestBody, "ignorePrev">,
  ): Promise<number> {
    const select = await this.db
      .select()
      .from(OrganizationPresident)
      .where(
        and(
          eq(OrganizationPresident.organizationId, body.organizationId),
          eq(
            OrganizationPresident.organizationPresidentTypeEnumId,
            body.organizationPresidentTypeE,
          ),

          isNull(OrganizationPresident.endTerm),
        ),
      )
      .limit(1)
      .orderBy(desc(OrganizationPresident.createdAt));
    if (select.length === 0) {
      return 0;
    }
    return select[0].id;
  }

  async updateOrganizationPresidentRetire(
    organizationPresidentId: number,
    endTerm: Date,
  ): Promise<number> {
    await this.db
      .update(OrganizationPresident)
      .set({ endTerm })
      .where(eq(OrganizationPresident.id, organizationPresidentId))
      .execute();

    const resSelect = await this.db
      .select()
      .from(OrganizationPresident)
      .where(eq(OrganizationPresident.id, organizationPresidentId));
    if (resSelect.length === 0 || resSelect[0].id !== organizationPresidentId) {
      return 0;
    }
    return resSelect[0].id;
  }

  async createOrganizationPresident(
    body: Omit<ApiOrg003RequestBody, "ignorePrev">,
  ): Promise<number> {
    await this.db
      .insert(OrganizationPresident)
      .values({
        organizationId: body.organizationId,
        userId: body.userId,
        organizationPresidentTypeEnumId: body.organizationPresidentTypeE,
        phoneNumber: body.phoneNumber,
        startTerm: body.startTerm,
        endTerm: body.endTerm ? body.endTerm : null,
      })
      .execute();

    const res = await this.ckOrganizationPresidentBeforeCreate(body);
    return res;
  }

  async ckOrganizationPresidentAlready(userId: number): Promise<number> {
    // 지금은 공직일 때만 체크하는 로직이 없는데, 언젠가는 추가해야 함
    const select = await this.db
      .select()
      .from(OrganizationPresident)
      .where(
        and(
          eq(OrganizationPresident.userId, userId),
          isNull(OrganizationPresident.endTerm),
        ),
      )
      .limit(1);
    if (select.length === 0) {
      // 해당 president가 공직이 아닐 경우 그냥 0을 리턴하는 로직을 추가해야 함.
      return 0;
    }
    return select[0].id;
  }

  async selectOrganizationPresidentById(
    organizationPresidentId: number,
  ): Promise<OrganizationPresidentT[]> {
    const res = this.db
      .select()
      .from(OrganizationPresident)
      .where(and(eq(OrganizationPresident.id, organizationPresidentId)));
    return res;
  }
}
