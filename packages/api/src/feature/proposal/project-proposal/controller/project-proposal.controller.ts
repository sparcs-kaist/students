import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";

import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  ApiPrp001ResponseOK,
  ApiPrp001RequestUrl,
  apiPrp001,
  ApiPrp001RequestQuery,
  ApiPrp004RequestUrl,
  apiPrp004,
  ApiPrp004RequestBody,
  ApiPrp004ResponseCreated,
} from "@sparcs-students/interface/api/proposal/index";

import { ProjectProposalService } from "../service/project-proposal.service";

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

  @Post(ApiPrp004RequestUrl)
  @UsePipes(new ZodPipe(apiPrp004))
  async PostProjectProposal(
    @Body() body: ApiPrp004RequestBody,
  ): Promise<ApiPrp004ResponseCreated> {
    return this.projectProposalService.postProjectProposal(body);
  }
}
