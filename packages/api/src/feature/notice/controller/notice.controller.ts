import { Controller, Get, Param, UsePipes } from "@nestjs/common";

import {
  apiNot001,
  apiNot002,
  ApiNot002RequestParam,
} from "@sparcs-students/interface/api/notice/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";

import { NoticeService } from "../service/notice.service";

@Public()
@Controller("notices")
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @UsePipes(new ZodPipe(apiNot001))
  async getNotices() {
    return this.noticeService.getNotices();
  }

  @Get(":noticeId")
  @UsePipes(new ZodPipe(apiNot002))
  async getNotice(@Param() params: ApiNot002RequestParam) {
    return this.noticeService.getNotice(params.noticeId);
  }
}
