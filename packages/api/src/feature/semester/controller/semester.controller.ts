import { Controller, Get, UsePipes } from "@nestjs/common";

import {
  apiSem001,
  ApiSem001RequestUrl,
  ApiSem001ResponseOk,
} from "@sparcs-students/interface/api/semester/index";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { SemesterService } from "../service/semester.service";

@Controller()
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Public()
  @Get(ApiSem001RequestUrl)
  @UsePipes(new ZodPipe(apiSem001))
  async getSemesterAll(): Promise<ApiSem001ResponseOk[]> {
    return this.semesterService.getSemesterAll();
  }
}
