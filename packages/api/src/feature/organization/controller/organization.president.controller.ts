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
import apiOrg005 from "@sparcs-students/interface/api/organization/endpoint/apiOrg005";
import apiOrg006 from "@sparcs-students/interface/api/organization/endpoint/apiOrg006";
import apiOrg007 from "@sparcs-students/interface/api/organization/endpoint/apiOrg007";
import apiOrg008 from "@sparcs-students/interface/api/organization/endpoint/apiOrg008";
import apiOrg009 from "@sparcs-students/interface/api/organization/endpoint/apiOrg009";
import apiOrg012 from "@sparcs-students/interface/api/organization/endpoint/apiOrg012";
import apiOrg013 from "@sparcs-students/interface/api/organization/endpoint/apiOrg013";
import apiOrg016 from "@sparcs-students/interface/api/organization/endpoint/apiOrg016";
import apiOrg017 from "@sparcs-students/interface/api/organization/endpoint/apiOrg017";
import apiOrg018 from "@sparcs-students/interface/api/organization/endpoint/apiOrg018";
import apiOrg019 from "@sparcs-students/interface/api/organization/endpoint/apiOrg019";
import apiOrg020 from "@sparcs-students/interface/api/organization/endpoint/apiOrg020";
import apiOrg021 from "@sparcs-students/interface/api/organization/endpoint/apiOrg021";
import apiOrg022 from "@sparcs-students/interface/api/organization/endpoint/apiOrg022";
import type { ApiOrg005RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg005";
import type { ApiOrg006RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg006";
import type {
  ApiOrg007RequestBody,
  ApiOrg007ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg007";
import type {
  ApiOrg008RequestBody,
  ApiOrg008ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg008";
import type {
  ApiOrg009RequestBody,
  ApiOrg009ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg009";
import type {
  ApiOrg012RequestBody,
  ApiOrg012ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg012";
import type {
  ApiOrg013RequestBody,
  ApiOrg013ResponseCreated,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg013";
import type {
  ApiOrg016RequestParam,
  ApiOrg016RequestBody,
  ApiOrg016ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg016";
import type {
  ApiOrg017RequestParam,
  ApiOrg017RequestBody,
  ApiOrg017ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg017";
import type { ApiOrg018RequestParam } from "@sparcs-students/interface/api/organization/endpoint/apiOrg018";
import type {
  ApiOrg019RequestParam,
  ApiOrg019RequestBody,
  ApiOrg019ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg019";
import type {
  ApiOrg020RequestParam,
  ApiOrg020RequestBody,
  ApiOrg020ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg020";
import type { ApiOrg021RequestParam } from "@sparcs-students/interface/api/organization/endpoint/apiOrg021";
import type {
  ApiOrg022RequestParam,
  ApiOrg022RequestBody,
  ApiOrg022ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg022";
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
