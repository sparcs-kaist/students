import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiOrg005,
  apiOrg006,
  apiOrg007,
  apiOrg008,
  apiOrg009,
  apiOrg012,
  apiOrg013,
  ApiOrg005RequestBody,
  ApiOrg006RequestBody,
  ApiOrg007RequestBody,
  ApiOrg008RequestBody,
  ApiOrg009RequestBody,
  ApiOrg012RequestBody,
  ApiOrg013RequestBody,
  ApiOrg007ResponseCreated,
  ApiOrg008ResponseCreated,
  ApiOrg009ResponseCreated,
  ApiOrg012ResponseCreated,
  ApiOrg013ResponseCreated,
} from "@sparcs-students/interface/api/organization/index";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { PresidentOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { OrganizationService } from "../service/organization.service";

@PresidentOnly()
@Controller("president/organizations")
export class OrganizationPresidentController {
  constructor(private readonly organizationService: OrganizationService) {}

  // 단체장단 권한으로 단체 멤버 정보를 불러옵니다.
  @Get("get-applying")
  async getApplying(@GetStudent() student: StudentProfile) {
    return this.organizationService.getApplying(student);
  }

  // 단체장단 권한으로 단체 멤버 임명
  @Post("member")
  @UsePipes(new ZodPipe(apiOrg005))
  async createMember(@Body() body: ApiOrg005RequestBody) {
    return this.organizationService.createMember(body);
  }

  // 단체장단 권한으로 단체 매니저 임명
  @Post("manager")
  @UsePipes(new ZodPipe(apiOrg006))
  async createManager(@Body() body: ApiOrg006RequestBody) {
    return this.organizationService.createManager(body);
  }

  // 단체장단 권한으로 팀 생성
  @Post("teams/team")
  @UsePipes(new ZodPipe(apiOrg007))
  async postOrganizationTeamForPresident(
    @Body() body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    return this.organizationService.postOrganizationTeamForPresident(body.team);
  }

  // 단체장단 권한으로 팀 멤버 생성
  @Post("teams/member")
  @UsePipes(new ZodPipe(apiOrg008))
  async postOrganizationTeamMemberForPresident(
    @Body() body: ApiOrg008RequestBody,
  ): Promise<ApiOrg008ResponseCreated> {
    return this.organizationService.postOrganizationTeamMemberForPresident(
      body.teamMember,
    );
  }

  // 단체장단 권한으로 팀 리더 생성
  @Post("teams/leader")
  @UsePipes(new ZodPipe(apiOrg009))
  async postOrganizationTeamLeaderForPresident(
    @Body() body: ApiOrg009RequestBody,
  ): Promise<ApiOrg009ResponseCreated> {
    return this.organizationService.postOrganizationTeamLeaderForPresident(
      body.teamLeader,
    );
  }

  // 단체장단 권한으로 운영위원회 생성
  @Post("operating-committee")
  @UsePipes(new ZodPipe(apiOrg012))
  async createOperatingCommittee(
    @Body() body: ApiOrg012RequestBody,
  ): Promise<ApiOrg012ResponseCreated> {
    return this.organizationService.createOperatingCommittee(
      body.operatingCommittee,
    );
  }

  // 단체장단 권한으로 운영위원회 멤버 생성
  @Post("operating-committee/member")
  @UsePipes(new ZodPipe(apiOrg013))
  async createOperatingCommitteeMember(
    @Body() body: ApiOrg013RequestBody,
  ): Promise<ApiOrg013ResponseCreated> {
    return this.organizationService.createOperatingCommitteeMember(
      body.operatingCommitteeMember,
    );
  }
}
