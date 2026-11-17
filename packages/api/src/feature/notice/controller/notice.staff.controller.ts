import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";

import {
  apiNot003,
  apiNot004,
  apiNot005,
  ApiNot003RequestBody,
  ApiNot004RequestBody,
  ApiNot004RequestParam,
  ApiNot005RequestParam,
} from "@sparcs-students/interface/api/notice/index";
import { StaffOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";

import { NoticeService } from "../service/notice.service";

@StaffOnly()
@Controller("staff/notices")
export class NoticeStaffController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @UsePipes(new ZodPipe(apiNot003))
  async createNotice(@Body() body: ApiNot003RequestBody) {
    return this.noticeService.createNotice(body.notice);
  }

  @Put(":noticeId")
  @UsePipes(new ZodPipe(apiNot004))
  async updateNotice(
    @Param() params: ApiNot004RequestParam,
    @Body() body: ApiNot004RequestBody,
  ) {
    return this.noticeService.updateNotice(params.noticeId, body.notice);
  }

  @Delete(":noticeId")
  @UsePipes(new ZodPipe(apiNot005))
  async deleteNotice(@Param() params: ApiNot005RequestParam) {
    return this.noticeService.deleteNotice(params.noticeId);
  }
}
