import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UsePipes,
} from "@nestjs/common";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiOrg005,
  apiOrg006,
  apiOrg007,
  apiOrg008,
  apiOrg009,
  apiOrg012,
  apiOrg013,
  apiOrg016,
  apiOrg017,
  apiOrg018,
  apiOrg019,
  apiOrg020,
  apiOrg021,
  apiOrg022,
  ApiOrg005RequestBody,
  ApiOrg006RequestBody,
  ApiOrg007RequestBody,
  ApiOrg008RequestBody,
  ApiOrg009RequestBody,
  ApiOrg012RequestBody,
  ApiOrg013RequestBody,
  ApiOrg016RequestBody,
  ApiOrg017RequestBody,
  ApiOrg019RequestBody,
  ApiOrg020RequestBody,
  ApiOrg022RequestBody,
  ApiOrg016RequestParam,
  ApiOrg017RequestParam,
  ApiOrg018RequestParam,
  ApiOrg019RequestParam,
  ApiOrg020RequestParam,
  ApiOrg021RequestParam,
  ApiOrg022RequestParam,
  ApiOrg007ResponseCreated,
  ApiOrg008ResponseCreated,
  ApiOrg009ResponseCreated,
  ApiOrg012ResponseCreated,
  ApiOrg013ResponseCreated,
  ApiOrg016ResponseOk,
  ApiOrg017ResponseOk,
  ApiOrg019ResponseOk,
  ApiOrg020ResponseOk,
  ApiOrg022ResponseOk,
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
  async createMember(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg005RequestBody,
  ) {
    return this.organizationService.createMember(student, body);
  }

  // 단체장단 권한으로 단체 매니저 임명
  @Post("manager")
  @UsePipes(new ZodPipe(apiOrg006))
  async createManager(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg006RequestBody,
  ) {
    return this.organizationService.createManager(student, body);
  }

  // 단체장단 권한으로 팀 생성
  @Post("teams/team")
  @UsePipes(new ZodPipe(apiOrg007))
  async postOrganizationTeamForPresident(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg007RequestBody,
  ): Promise<ApiOrg007ResponseCreated> {
    return this.organizationService.postOrganizationTeamForPresident(
      student,
      body.team,
    );
  }

  // 단체장단 권한으로 팀 멤버 생성
  @Post("teams/member")
  @UsePipes(new ZodPipe(apiOrg008))
  async postOrganizationTeamMemberForPresident(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg008RequestBody,
  ): Promise<ApiOrg008ResponseCreated> {
    return this.organizationService.postOrganizationTeamMemberForPresident(
      student,
      body.teamMember,
    );
  }

  // 단체장단 권한으로 팀 리더 생성
  @Post("teams/leader")
  @UsePipes(new ZodPipe(apiOrg009))
  async postOrganizationTeamLeaderForPresident(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg009RequestBody,
  ): Promise<ApiOrg009ResponseCreated> {
    return this.organizationService.postOrganizationTeamLeaderForPresident(
      student,
      body.teamLeader,
    );
  }

  // 단체장단 권한으로 운영위원회 생성
  @Post("operating-committee")
  @UsePipes(new ZodPipe(apiOrg012))
  async createOperatingCommittee(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg012RequestBody,
  ): Promise<ApiOrg012ResponseCreated> {
    return this.organizationService.createOperatingCommittee(
      student,
      body.operatingCommittee,
    );
  }

  // 단체장단 권한으로 운영위원회 멤버 생성
  @Post("operating-committee/member")
  @UsePipes(new ZodPipe(apiOrg013))
  async createOperatingCommitteeMember(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg013RequestBody,
  ): Promise<ApiOrg013ResponseCreated> {
    return this.organizationService.createOperatingCommitteeMember(
      student,
      body.operatingCommitteeMember,
    );
  }

  // 단체장단 권한으로 멤버 임기 종료
  @Patch("member/:id/retire")
  @UsePipes(new ZodPipe(apiOrg016))
  async retireMember(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg016RequestParam,
    @Body() body: ApiOrg016RequestBody,
  ): Promise<ApiOrg016ResponseOk> {
    return this.organizationService.retireMember(student, param.id, body);
  }

  // 단체장단 권한으로 매니저 임기 종료
  @Patch("manager/:id/retire")
  @UsePipes(new ZodPipe(apiOrg017))
  async retireManager(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg017RequestParam,
    @Body() body: ApiOrg017RequestBody,
  ): Promise<ApiOrg017ResponseOk> {
    return this.organizationService.retireManager(student, param.id, body);
  }

  // 단체장단 권한으로 팀 삭제
  @Delete("teams/team/:id/delete")
  @UsePipes(new ZodPipe(apiOrg018))
  async deleteTeam(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg018RequestParam,
  ) {
    return this.organizationService.deleteTeam(student, param);
  }

  // 단체장단 권한으로 팀 멤버 임기 종료
  @Patch("teams/member/:id/retire")
  @UsePipes(new ZodPipe(apiOrg019))
  async retireTeamMember(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg019RequestParam,
    @Body() body: ApiOrg019RequestBody,
  ): Promise<ApiOrg019ResponseOk> {
    return this.organizationService.retireTeamMember(student, param.id, body);
  }

  // 단체장단 권한으로 팀 리더 임기 종료
  @Patch("teams/leader/:id/retire")
  @UsePipes(new ZodPipe(apiOrg020))
  async retireTeamLeader(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg020RequestParam,
    @Body() body: ApiOrg020RequestBody,
  ): Promise<ApiOrg020ResponseOk> {
    return this.organizationService.retireTeamLeader(student, param.id, body);
  }

  // 단체장단 권한으로 운영위원회
  @Delete("operating-committee/:id/delete")
  @UsePipes(new ZodPipe(apiOrg021))
  async deleteOperatingCommittee(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg021RequestParam,
  ) {
    return this.organizationService.deleteOperatingCommittee(student, param);
  }

  // 단체장 권한으로 운영위원회 멤버 임기 종료
  @Patch("operating-committee/member/:id/retire")
  @UsePipes(new ZodPipe(apiOrg022))
  async retireOperatingCommitteeMember(
    @GetStudent() student: StudentProfile,
    @Param() param: ApiOrg022RequestParam,
    @Body() body: ApiOrg022RequestBody,
  ): Promise<ApiOrg022ResponseOk> {
    return this.organizationService.retireOperatingCommitteeMember(
      student,
      param.id,
      body,
    );
  }
}
