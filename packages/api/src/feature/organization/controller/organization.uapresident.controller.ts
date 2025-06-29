import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiOrg002,
  apiOrg003,
  ApiOrg002RequestBody,
  ApiOrg003RequestBody,
} from "@sparcs-students/interface/api/organization/index";
import {} from // GetUser,
"@sparcs-students/api/common/decorators/get-user.decorator";
import { OrganizationService } from "../service/organization.service";

@Controller("uapresident/organizations")
export class OrganizationuapresidentController {
  constructor(private readonly organizationService: OrganizationService) {}

  // 총학생회장 권한으로 단체 생성
  @Public() // 임시로 로그인 없이 생성. 총학생회장 데코레이터 추가 필요
  @Post("organization")
  @UsePipes(new ZodPipe(apiOrg002))
  async createOrganization(@Body() body: ApiOrg002RequestBody) {
    return this.organizationService.createOrganization(body);
  }

  // 총학생회장 권한으로 단체 회장/부회장 임명
  @Public() // 임시 "
  @Post("president")
  @UsePipes(new ZodPipe(apiOrg003))
  async createPresident(@Body() body: ApiOrg003RequestBody) {
    return this.organizationService.createPresident(body);
  }
}
