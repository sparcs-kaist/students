import { Controller, Get, Param, UsePipes } from "@nestjs/common";
import {
  apiPrp010,
  ApiPrp010RequestParam,
} from "@sparcs-students/interface/api/proposal/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { ProposalPublicService } from "../service/proposal.public.service";

@Controller("student/proposals/budget-proposals")
export class ProposalController {
  constructor(private readonly proposalPublicService: ProposalPublicService) {}

  // 예산안 revision 조회
  @Public()
  @Get("income-revision/read/:budgetProposalIncomeId")
  @UsePipes(new ZodPipe(apiPrp010))
  async readBudgetProposalIncomeRevision(
    @Param() params: ApiPrp010RequestParam,
  ) {
    return this.proposalPublicService.readBudgetProposalIncomeRevision(params);
  }
}
