import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import { UaOrgOnly } from "@sparcs-students/api/common/decorators/require-organization.decorator";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  apiUsr002,
  ApiUsr002RequestQuery,
  ApiUsr002ResponseOk,
} from "@sparcs-students/interface/api/user/index";

import { UserService } from "../service/user.service";

@UaOrgOnly()
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get("find")
  @UsePipes(new ZodPipe(apiUsr002))
  async findStudent(
    @Query() query: ApiUsr002RequestQuery,
  ): Promise<ApiUsr002ResponseOk> {
    const user = await this.userService.findStudentByNumber(
      query.studentNumber,
    );
    return { user };
  }
}
