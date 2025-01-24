import { Controller, Get, UsePipes } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  ApiOrg001ResponseOK,
  ApiOrg001RequestUrl,
  apiOrg001,
} from "@sparcs-students/interface/api/organization/index";

import { OrganizationService } from "../service/organization.service";

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get(ApiOrg001RequestUrl)
  @UsePipes(new ZodPipe(apiOrg001))
  async getOrganizationsBySemesterId(): Promise<ApiOrg001ResponseOK> {
    return this.organizationService.getOrganizationsLookUp();
  }
}
