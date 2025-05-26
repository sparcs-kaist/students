import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiPrp002RequestParam } from "@sparcs-students/interface/api/proposal/endpoint/apiPrp002";
import { ApiPrp004RequestBody } from "@sparcs-students/interface/api/proposal/endpoint/apiPrp004";
import {
  ApiPrp005RequestParam,
  ApiPrp005RequestBody,
} from "@sparcs-students/interface/api/proposal/endpoint/apiPrp005";
import {
  ApiPrp006RequestParam,
  ApiPrp006RequestBody,
} from "@sparcs-students/interface/api/proposal/endpoint/apiPrp006";
import { ApiPrp007RequestParam } from "@sparcs-students/interface/api/proposal/endpoint/apiPrp007";
import { ProjectProposalService } from "./projectProposalService";

@Controller("proposals/project-proposals")
export class ProjectProposalController {
  constructor(private readonly service: ProjectProposalService) {}

  @Get("project-proposal/:projectProposalId")
  getProposal(@Param() params: ApiPrp002RequestParam) {
    return this.service.getProposal(params.projectProposalId);
  }

  @Post("project-proposal")
  @HttpCode(HttpStatus.CREATED)
  createProposal(@Body() body: ApiPrp004RequestBody) {
    return this.service.createProposal(body);
  }

  @Put("project-proposal/:projectProposalId")
  updateProposal(
    @Param() params: ApiPrp005RequestParam,
    @Body() body: ApiPrp005RequestBody,
  ) {
    return this.service.updateProposal(params.projectProposalId, body);
  }

  @Put("project-proposal/submit")
  submitProposal(
    @Query() params: ApiPrp006RequestParam,
    @Body() body: ApiPrp006RequestBody,
  ) {
    return this.service.submitProposal(params.projectProposalId, body);
  }

  @Delete("project-proposal/:projectProposalId")
  deleteProposal(@Param() params: ApiPrp007RequestParam) {
    return this.service.deleteProposal(params.projectProposalId);
  }
}
