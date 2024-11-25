import { Body, Controller, Get, Param, Post, UsePipes } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  ApiOrg001ResponseOK,
  ApiOrg001RequestUrl,
  apiOrg001,
  ApiOrg001RequestParam,
  ApiOrg002RequestUrl,
  apiOrg002,
  ApiOrg002RequestBody,
  ApiOrg002ResponseCreated,
  ApiOrg003RequestUrl,
  apiOrg003,
  ApiOrg003RequestBody,
  ApiOrg003ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";

import { OrganizationService } from "../service/organization.service";

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get(ApiOrg001RequestUrl)
  @UsePipes(new ZodPipe(apiOrg001))
  async getOrganizationsBySemesterId(
    @Param() param: ApiOrg001RequestParam,
  ): Promise<ApiOrg001ResponseOK> {
    return this.organizationService.getOrganizationsBySemesterId(param);
  }

  @Post(ApiOrg002RequestUrl)
  @UsePipes(new ZodPipe(apiOrg002))
  async postOrganization(
    @Body() body: ApiOrg002RequestBody,
  ): Promise<ApiOrg002ResponseCreated> {
    const res = await this.organizationService.postOrganization(body);
    return res;
  }

  @Post(ApiOrg003RequestUrl)
  @UsePipes(new ZodPipe(apiOrg003))
  async postOrganizationPresident(
    @Body() body: ApiOrg003RequestBody,
  ): Promise<ApiOrg003ResponseCreated> {
    const res = await this.organizationService.postOrganizationPresident(body);
    return res;
  }
}
