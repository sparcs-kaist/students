import { Controller, Get, Query } from "@nestjs/common";
import { UaOrgOnly } from "@sparcs-students/api/common/decorators/require-organization.decorator";
import apiOrg026, {
  ApiOrg026RequestQuery,
  ApiOrg026ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg026";
import apiOrg027, {
  ApiOrg027RequestQuery,
  ApiOrg027ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg027";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { OrganizationService } from "../service/organization.service";

@UaOrgOnly()
@Controller("uapresident/organizations")
export class OrganizationUaOrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get("/get-history-byId")
  async getHistoryById(
    @Query(new ZodPipe(apiOrg026)) query: ApiOrg026RequestQuery,
  ): Promise<ApiOrg026ResponseOk> {
    const { studentId, fromDate, toDate } = query;
    const result = await this.organizationService.getHistoryById(
      studentId,
      fromDate,
      toDate,
    );
    return result as ApiOrg026ResponseOk;
  }

  @Get("/get-history-by-rolename")
  async getHistoryByRoleName(
    @Query(new ZodPipe(apiOrg027)) query: ApiOrg027RequestQuery,
  ): Promise<ApiOrg027ResponseOk> {
    const { organizationId, roleName, fromDate, toDate } = query;
    return this.organizationService.getHistoryByRoleName(
      organizationId,
      roleName,
      fromDate,
      toDate,
    );
  }
}
