import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiOrg011,
  ApiOrg011RequestBody,
} from "@sparcs-students/interface/api/organization/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { OrganizationPublicService } from "../service/organization.public.service";

@Controller("organizations")
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationPublicService,
  ) {}

  // 전체 단체 조회 ( 학기별로 그룹 )
  @Public()
  @Get("lookup")
  async getOrganizationList() {
    return this.organizationService.getOrganizationList();
  }

  @Post("apply")
  @UsePipes(new ZodPipe(apiOrg011))
  async applyMember(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiOrg011RequestBody,
  ) {
    return this.organizationService.applyMember(student, body);
  }
}
