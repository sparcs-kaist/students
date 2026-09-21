import { Controller, Get, Query } from "@nestjs/common";
import { UaOrgOnly } from "@sparcs-students/api/common/decorators/require-organization.decorator";
import apiOrg031, {
  ApiOrg031RequestQuery,
  ApiOrg031ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg031";
import apiOrg032, {
  ApiOrg032RequestQuery,
  ApiOrg032ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg032";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { OrganizationService } from "../service/organization.service";

@UaOrgOnly()
@Controller("uapresident/organizations")
export class OrganizationUaOrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get("/get-history-by-id-v2")
  async getHistoryById(
    @Query(new ZodPipe(apiOrg031)) query: ApiOrg031RequestQuery,
  ): Promise<ApiOrg031ResponseOk> {
    const { studentId, fromDate, toDate } = query;
    const result = await this.organizationService.getHistoryById(
      studentId,
      fromDate,
      toDate,
    );
    return result as ApiOrg031ResponseOk;
  }

  @Get("/get-history-by-rolename-v2")
  async getHistoryByRoleName(
    @Query(new ZodPipe(apiOrg032)) query: ApiOrg032RequestQuery,
  ): Promise<ApiOrg032ResponseOk> {
    const { organizationId, roleName, fromDate, toDate } = query;
    return this.organizationService.getHistoryByRoleName(
      organizationId,
      roleName,
      fromDate,
      toDate,
    );
  }
}
