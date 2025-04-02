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
  ApiOrg007RequestBody,
  ApiOrg007RequestUrl,
  ApiOrg007ResponseCreated,
  apiOrg007,
  ApiOrg008RequestBody,
  ApiOrg008RequestUrl,
  ApiOrg008ResponseCreated,
  apiOrg008,
  ApiOrg009RequestBody,
  ApiOrg009RequestUrl,
  ApiOrg009ResponseCreated,
  apiOrg009,
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

  @Post(ApiOrg007RequestUrl)
  @UsePipes(new ZodPipe(apiOrg007))
  async postPresidentOrganizationsTeam(
    @Body() body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    return this.organizationService.postPresidentOrganizationsTeam(
      body.team.name,
      body.team.organization,
      body.team.duration,
    );
  }

  @Post(ApiOrg008RequestUrl)
  @UsePipes(new ZodPipe(apiOrg008))
  async postPresidentOrganizationsTeamsMember(
    @Body() body: ApiOrg008RequestBody,
  ): Promise<ApiOrg008ResponseCreated> {
    return this.organizationService.postPresidentOrganizationsTeamsMember(
      body.teamMember.duration,
      body.teamMember.team,
      body.teamMember.student,
    );
  }

  @Post(ApiOrg009RequestUrl)
  @UsePipes(new ZodPipe(apiOrg009))
  async postPresidentOrganizationsTeamsLeader(
    @Body() body: ApiOrg009RequestBody,
  ): Promise<ApiOrg009ResponseCreated> {
    return this.organizationService.postPresidentOrganizationsTeamsLeader(
      body.teamLeader.duration,
      body.teamLeader.student,
      body.teamLeader.team,
      body.teamLeader.title,
    );
  }
}
