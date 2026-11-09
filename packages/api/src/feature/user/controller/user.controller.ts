import { Controller, Get, UsePipes } from "@nestjs/common";
import {
  apiUsr002,
  ApiUsr002RequestUrl,
  ApiUsr002ResponseOk,
} from "@sparcs-students/interface/api/user/index";

import {
  GetUser,
  UserProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { UserService } from "../service/user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(ApiUsr002RequestUrl)
  @UsePipes(new ZodPipe(apiUsr002))
  async getMyInfo(@GetUser() user: UserProfile): Promise<ApiUsr002ResponseOk> {
    return this.userService.getMyInfo(user.id);
  }
}
