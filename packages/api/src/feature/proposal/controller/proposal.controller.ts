import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import {
  apiBudPrp001,
  ApiBudPrp001RequestQuery,
} from "@sparcs-students/interface/api/proposal/index";
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { ProposalService } from "../service/proposal.service";

@Controller("student/proposals/budget-proposals")
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  // 수입 지출 일괄 조회
  @Get("income-revision/read/:budgetProposalIncomeId")
  @UsePipes(new ZodPipe(apiBudPrp001))
  async getBudgetProposal(@Query() query: ApiBudPrp001RequestQuery) {
    return this.proposalService.getBudgetProposal(query);
  }
}
