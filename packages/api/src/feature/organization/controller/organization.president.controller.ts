import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiOrg005,
  apiOrg006,
  apiOrg007,
  apiOrg008,
  apiOrg009,
  ApiOrg005RequestBody,
  ApiOrg006RequestBody,
  ApiOrg007RequestBody,
  ApiOrg008RequestBody,
  ApiOrg009RequestBody,
  ApiOrg007ResponseCreated,
  ApiOrg008ResponseCreated,
  ApiOrg009ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { OrganizationService } from "../service/organization.service";

@Controller("president/organizations")
export class OrganizationpresidentController {
  constructor(private readonly organizationService: OrganizationService) {}

  // 단체장단 권한으로 단체 멤버 정보를 불러옵니다.
  @Public() // 임시. 단체장단 데코레이터 추가 필요
  @Get("get-applying")
  async getApplying(@GetStudent() student: StudentProfile) {
    return this.organizationService.getApplying(student);
  }

  // 단체장단 권한으로 단체 멤버 임명
  @Public() // 임시. 단체장단 데코레이터 추가 필요
  @Post("member")
  @UsePipes(new ZodPipe(apiOrg005))
  async createMember(@Body() body: ApiOrg005RequestBody) {
    return this.organizationService.createMember(body);
  }

  // 단체장단 권한으로 단체 매니저 임명
  @Public() // 임시. 단체장단 데코레이터 추가 필요
  @Post("manager")
  @UsePipes(new ZodPipe(apiOrg006))
  async createManager(@Body() body: ApiOrg006RequestBody) {
    return this.organizationService.createManager(body);
  }

  @Public() // TODO: 유저 데코레이터 추가
  @Post("teams/team")
  @UsePipes(new ZodPipe(apiOrg007))
  async postOrganizationTeamForPresident(
    @Body() body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    return this.organizationService.postOrganizationTeamForPresident(body.team);
  }

  @Public() // TODO: 유저 데코레이터 추가
  @Post("teams/member")
  @UsePipes(new ZodPipe(apiOrg008))
  async postOrganizationTeamMemberForPresident(
    @Body() body: ApiOrg008RequestBody,
  ): Promise<ApiOrg008ResponseCreated> {
    return this.organizationService.postOrganizationTeamMemberForPresident(
      body.teamMember,
    );
  }

  @Public() // TODO: 유저 데코레이터 추가
  @Post("teams/leader")
  @UsePipes(new ZodPipe(apiOrg009))
  async postOrganizationTeamLeaderForPresident(
    @Body() body: ApiOrg009RequestBody,
  ): Promise<ApiOrg009ResponseCreated> {
    return this.organizationService.postOrganizationTeamLeaderForPresident(
      body.teamLeader,
    );
  }
}
