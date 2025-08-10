import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {
  apiPrp008,
  apiPrp009,
  ApiPrp008RequestBody,
  ApiPrp009RequestBody,
} from "@sparcs-students/interface/api/proposal/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { ProposalService } from "../service/proposal.service";

@Controller("president/budget-proposals")
export class ProposalPresidentController {
  constructor(private readonly proposalService: ProposalService) {}

  // 각 단체장단 권한으로 예산안 생성
  @Public() // 임시로 로그인 없이 생성. 단체장단 데코레이터 추가 필요
  @Post("income")
  @UsePipes(new ZodPipe(apiPrp008))
  async createBudgetProposalIncome(@Body() body: ApiPrp008RequestBody) {
    return this.proposalService.createBudgetProposalIncome(
      body.budgetProposalIncome,
    );
  }

  @Public() // 임시로 로그인 없이 생성. 단체장단 데코레이터 추가 필요
  @Post("income-revision")
  @UsePipes(new ZodPipe(apiPrp009))
  async createBudgetProposalIncomeRevision(@Body() body: ApiPrp009RequestBody) {
    return this.proposalService.createBudgetProposalIncomeRevision(
      body.budgetProposalIncomeRevision,
    );
  }
}
