import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import {
  apiBudPrp012,
  apiBudPrp013,
  ApiBudPrp012RequestQuery,
  ApiBudPrp013RequestQuery,
} from "@sparcs-students/interface/api/proposal/index";
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { ProposalService } from "../service/proposal.service";

@Controller("student/proposals/budget-proposals")
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  // 수입 revision 최신본 조회
  @Get("income/getRecent")
  @UsePipes(new ZodPipe(apiBudPrp012))
  async getRecentBudgetProposalIncome(
    @Query() query: ApiBudPrp012RequestQuery,
  ) {
    return this.proposalService.getRecentBudgetProposalIncome(query);
  }

  // 지출 revision 최신본 조회
  @Get("expense/getRecent")
  @UsePipes(new ZodPipe(apiBudPrp013))
  async getRecentBudgetProposalExpense(
    @Query() query: ApiBudPrp013RequestQuery,
  ) {
    return this.proposalService.getRecentBudgetProposalExpense(query);
  }
}
