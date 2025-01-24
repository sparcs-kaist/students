import { Injectable, Inject } from "@nestjs/common";

import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import { ApiOrg001ResponseOK } from "@sparcs-students/interface/api/organization/index";

import { SemesterPublicService } from "@sparcs-students/api/feature/semester/service/semester.public.service";

import { OrganizationRepository } from "../repository/organization.repository";

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
    private readonly organizationRepository: OrganizationRepository,
    private readonly semesterPublicService: SemesterPublicService,
  ) {}

  async getOrganizationsLookUp(): Promise<ApiOrg001ResponseOK> {
    const halfYears = await this.semesterPublicService.fetchHalfYearAll();
    const result = await Promise.all(
      halfYears.map(async halfYear => {
        const organizations = await this.organizationRepository.fetchAll(
          halfYear.duration,
        );

        // OrganizationType별로 그룹화
        const organizationTypeMap = new Map<
          number,
          { organizations: typeof organizations }
        >();

        organizations.forEach(org => {
          if (!organizationTypeMap.has(org.organizationTypeEnum)) {
            organizationTypeMap.set(org.organizationTypeEnum, {
              organizations: [],
            });
          }
          organizationTypeMap
            .get(org.organizationTypeEnum)
            ?.organizations.push(org);
        });

        // organizationTypeMap을 배열로 변환
        const organizationTypes = Array.from(organizationTypeMap.entries()).map(
          ([type, data]) => ({
            organizationTypeEnum: type, // OrganizationTypeEnum의 int 값
            organizations: data.organizations,
          }),
        );

        return {
          halfYear,
          organizationTypes,
        };
      }),
    );
    return { organizationLists: result };
  }
}
