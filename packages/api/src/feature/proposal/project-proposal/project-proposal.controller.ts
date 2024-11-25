import { Controller, Get, Query, UsePipes } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  ApiPrp001ResponseOK,
  ApiPrp001RequestUrl,
  apiPrp001,
  ApiPrp001RequestQuery,
} from "@sparcs-students/interface/api/proposal/index";

import { ProjectProposalService } from "./project-proposal.service";

@Controller()
export class ProjectProposalController {
  constructor(
    private readonly projectProposalService: ProjectProposalService,
  ) {}

  @Get(ApiPrp001RequestUrl)
  @UsePipes(new ZodPipe(apiPrp001))
  async getPrpanizationsBySemesterId(
    @Query() query: ApiPrp001RequestQuery,
  ): Promise<ApiPrp001ResponseOK> {
    return this.projectProposalService.getProjectProposalsForStudentsBySemesterId(
      query,
    );
  }
}
