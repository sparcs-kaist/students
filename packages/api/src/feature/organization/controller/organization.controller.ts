import { Controller, UsePipes, Post, Body } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
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

import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";

import { OrganizationService } from "../service/organization.service";
import { OrganizationPublicService } from "../service/organization.public.service";

@Controller()
export class OrganizationController {
  constructor(
    private readonly organizationPublicService: OrganizationPublicService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Public() // TODO: 유저 데코레이터 추가
  @Post(ApiOrg007RequestUrl)
  @UsePipes(new ZodPipe(apiOrg007))
  async postOrganizationTeamForPresident(
    @Body() body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    // TODO: PublicService -> Service
    return this.organizationPublicService.postOrganizationTeamForPresident(
      body.team,
    );
  }

  @Post(ApiOrg008RequestUrl)
  @UsePipes(new ZodPipe(apiOrg008))
  async postOrganizationTeamMemberForPresident(
    @Body() body: ApiOrg008RequestBody,
  ): Promise<ApiOrg008ResponseCreated> {
    return this.organizationPublicService.postOrganizationTeamMemberForPresident(
      body.teamMember,
    );
  }

  @Post(ApiOrg009RequestUrl)
  @UsePipes(new ZodPipe(apiOrg009))
  async postOrganizationTeamLeaderForPresident(
    @Body() body: ApiOrg009RequestBody,
  ): Promise<ApiOrg009ResponseCreated> {
    return this.organizationPublicService.postOrganizationTeamLeaderForPresident(
      body.teamLeader,
    );
  }
}
