import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import apiOrg002 from "@sparcs-students/interface/api/organization/endpoint/apiOrg002";
import apiOrg003 from "@sparcs-students/interface/api/organization/endpoint/apiOrg003";
import apiOrg004 from "@sparcs-students/interface/api/organization/endpoint/apiOrg004";
import apiOrg014 from "@sparcs-students/interface/api/organization/endpoint/apiOrg014";
import apiOrg023 from "@sparcs-students/interface/api/organization/endpoint/apiOrg023";
import apiOrg024 from "@sparcs-students/interface/api/organization/endpoint/apiOrg024";
import type { ApiOrg002RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg002";
import type { ApiOrg003RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg003";
import type {
  ApiOrg004RequestParam,
  ApiOrg004RequestBody,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg004";
import type { ApiOrg014RequestParam } from "@sparcs-students/interface/api/organization/endpoint/apiOrg014";
import type { ApiOrg023RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg023";
import type {
  ApiOrg024RequestParam,
  ApiOrg024RequestBody,
  ApiOrg024ResponseOk,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg024";
// import {} from // GetUser,
// "@sparcs-students/api/common/decorators/get-user.decorator";
import { UapresidentOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { OrganizationService } from "../service/organization.service";

@UapresidentOnly()
@Controller("uapresident/organizations")
export class OrganizationUapresidentController {
  constructor(private readonly organizationService: OrganizationService) {}

  // 총학생회장 권한으로 단체 생성
  @Post("organization")
  @UsePipes(new ZodPipe(apiOrg002))
  async createOrganization(@Body() body: ApiOrg002RequestBody) {
    return this.organizationService.createOrganization(body);
  }

  // 총학생회장 권한으로 단체 삭제
  @Delete("organization/:id/delete")
  @UsePipes(new ZodPipe(apiOrg014))
  async deleteOrganization(@Param() param: ApiOrg014RequestParam) {
    return this.organizationService.deleteOrganization(param);
  }

  // 총학생회장 권한으로 단체 회장/부회장 임명
  @Post("president")
  @UsePipes(new ZodPipe(apiOrg003))
  async createPresident(@Body() body: ApiOrg003RequestBody) {
    return this.organizationService.createPresident(body);
  }

  // 총학생회장 권한으로 단체장 임기 종료
  @Patch("president/:id/retire")
  @UsePipes(new ZodPipe(apiOrg004))
  async retirePresident(
    @Param() param: ApiOrg004RequestParam,
    @Body() body: ApiOrg004RequestBody,
  ) {
    return this.organizationService.retirePresident(param.id, body);
  }

  // 총학생회장 권한으로 집행부원 임명
  @Post("staff")
  @UsePipes(new ZodPipe(apiOrg023))
  async createStaff(@Body() body: ApiOrg023RequestBody) {
    return this.organizationService.createStaff(body);
  }

  // 총학생회장 권한으로 집행부원 은퇴
  @Patch("staff/:id/retire")
  @UsePipes(new ZodPipe(apiOrg024))
  async retireStaff(
    @Param() param: ApiOrg024RequestParam,
    @Body() body: ApiOrg024RequestBody,
  ): Promise<ApiOrg024ResponseOk> {
    return this.organizationService.retireStaff(param.id, body);
  }
}
