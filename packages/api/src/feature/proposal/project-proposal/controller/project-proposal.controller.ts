import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";

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
  ApiPrp005RequestUrl,
  apiPrp005,
  ApiPrp005RequestParam,
  ApiPrp005RequestBody,
  ApiPrp005ResponseOK,
  ApiPrp006RequestUrl,
  apiPrp006,
  ApiPrp006RequestBody,
  ApiPrp006ResponseOK,
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
  async postProjectProposal(
    @Body() body: ApiPrp004RequestBody,
  ): Promise<ApiPrp004ResponseCreated> {
    return this.projectProposalService.postProjectProposal(body);
  }

  @Put(ApiPrp005RequestUrl)
  @UsePipes(new ZodPipe(apiPrp005))
  async putProjectProposal(
    @Param() param: ApiPrp005RequestParam,
    @Body() body: ApiPrp005RequestBody,
  ): Promise<ApiPrp005ResponseOK> {
    return this.projectProposalService.putProjectProposalContent(param, body);
  }

  @Put(ApiPrp006RequestUrl)
  @UsePipes(new ZodPipe(apiPrp006))
  async putProjectProposalSubmit(
    @Body() body: ApiPrp006RequestBody,
  ): Promise<ApiPrp006ResponseOK> {
    return this.projectProposalService.putProjectProposalSubmit(body);
  }
}
