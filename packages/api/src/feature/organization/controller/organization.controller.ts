import { Controller, Get, UsePipes, Post, Body } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  ApiOrg001ResponseOK,
  ApiOrg001RequestUrl,
  apiOrg001,
  ApiOrg002RequestBody,
  ApiOrg002RequestUrl,
  ApiOrg002ResponseCreated,
  apiOrg002,
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

  @Post(ApiOrg002RequestUrl)
  @UsePipes(new ZodPipe(apiOrg002))
  async postUAPresidentOrganization(
    @Body() body: ApiOrg002RequestBody,
  ): Promise<ApiOrg002ResponseCreated> {
    return this.organizationService.postUAPresidentOrganization(
      body.organization.name,
      body.organization.nameEng,
      body.organization.organizationTypeEnum,
      body.organization.foundingYear,
      body.organization.duration,
      body.organization.organizationStateEnum,
    );
  }
}
