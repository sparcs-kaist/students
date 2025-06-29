import { Controller, Get } from "@nestjs/common";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
// import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {} from // GetUser,
"@sparcs-students/api/common/decorators/get-user.decorator";
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
}
