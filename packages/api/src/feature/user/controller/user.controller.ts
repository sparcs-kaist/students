import { Body, Controller, Post, UsePipes } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";

import {
  ApiUsr001RequestBody,
  ApiUsr001RequestUrl,
  ApiUsr001ResponseCreated,
  apiUsr001,
} from "@sparcs-students/interface/api/user/index";

import { UserService } from "../service/user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(ApiUsr001RequestUrl)
  @UsePipes(new ZodPipe(apiUsr001))
  async postUser(
    @Body() body: ApiUsr001RequestBody,
  ): Promise<ApiUsr001ResponseCreated> {
    const res = await this.userService.postUserStudent(body);
    return res;
  }
}
