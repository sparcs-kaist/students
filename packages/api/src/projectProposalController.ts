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
// import { ProjectProposalService } from './projectProposalService';
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

@Controller("proposals/project-proposals")
export class ProjectProposalController {
  constructor(private readonly service: ProjectProposalService) {}

  /** PRP-002: 사업계획서 상세 조회 */
  @Get("project-proposal/:projectProposalId")
  getProposal(@Param() params: ApiPrp002RequestParam) {
    return this.service.getProposal(params.projectProposalId);
  }

  /** PRP-004: 사업계획서 생성 */
  @Post("project-proposal")
  @HttpCode(HttpStatus.CREATED)
  createProposal(@Body() body: ApiPrp004RequestBody) {
    return this.service.createProposal(body);
  }

  /** PRP-005: 사업계획서 수정 */
  @Put("project-proposal/:projectProposalId")
  updateProposal(
    @Param() params: ApiPrp005RequestParam,
    @Body() body: ApiPrp005RequestBody,
  ) {
    return this.service.updateProposal(params.projectProposalId, body);
  }

  /** PRP-006: 사업계획서 제출 */
  @Put("project-proposal/submit")
  submitProposal(
    @Body() body: ApiPrp006RequestBody,
    @Query() params: ApiPrp006RequestParam,
  ) {
    return this.service.submitProposal(params.projectProposalId, body);
  }

  /** PRP-007: 사업계획서 삭제 */
  @Delete("project-proposal/:projectProposalId")
  deleteProposal(@Param() params: ApiPrp007RequestParam) {
    return this.service.deleteProposal(params.projectProposalId);
  }
}
