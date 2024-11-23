import { Injectable, Inject } from "@nestjs/common";
import { and, or, lte, gte, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import {
  Organization,
  OrganizationTypeEnum,
  OrganizationT,
  OrganizationTypeEnumT,
} from "src/drizzle/schema";

@Injectable()
export class OrganizationRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

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
            eq(Organization.endTerm, null),
          ),
        ),
      );

    return res.map(row => ({ ...row, organizationTypeEnum: row.org_typ_e }));
  }
}
