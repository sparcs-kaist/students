import { Controller, Get } from "@nestjs/common";

import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ReportService } from "../service/report.service";
import { MProjectReport } from "../model/project-report.model";

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Public()
  @Get("/report/hello")
  async hello(): Promise<MProjectReport> {
    return {
      id: 1,
      organization: {
        id: 1,
      },
      semester: {
        id: 1,
      },
    };
  }
}
