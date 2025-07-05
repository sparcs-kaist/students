import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiOrg005,
  apiOrg006,
  ApiOrg005RequestBody,
  ApiOrg006RequestBody,
} from "@sparcs-students/interface/api/organization/index";
import {} from // GetUser,
"@sparcs-students/api/common/decorators/get-user.decorator";
import { OrganizationService } from "../service/organization.service";

@Controller("president/organizations")
export class OrganizationpresidentController {
  constructor(private readonly organizationService: OrganizationService) {}

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
}
