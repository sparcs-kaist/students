import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import {
  apiPrp008,
  apiPrp009,
  apiPrp011,
  apiPrp012,
  ApiPrp008RequestBody,
  ApiPrp009RequestBody,
  ApiPrp011RequestBody,
  ApiPrp012RequestBody,
} from "@sparcs-students/interface/api/proposal/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { ProposalService } from "../service/proposal.service";

@Controller("president/proposals/budget-proposals")
export class ProposalPresidentController {
  constructor(private readonly proposalService: ProposalService) {}

  // 각 단체장단 권한으로 예산안 수입 생성
  @Public() // 임시로 로그인 없이 생성. 단체장단 데코레이터 추가 필요
  @Post("income/create")
  @UsePipes(new ZodPipe(apiPrp008))
  async createBudgetProposalIncome(@Body() body: ApiPrp008RequestBody) {
    return this.proposalService.createBudgetProposalIncome(
      body.budgetProposalIncome,
    );
  }

  // 각 단체장단 권한으로 예산안 수입 revision 생성
  @Public() // 임시로 로그인 없이 생성. 단체장단 데코레이터 추가 필요
  @Post("income-revision/create")
  @UsePipes(new ZodPipe(apiPrp009))
  async createBudgetProposalIncomeRevision(@Body() body: ApiPrp009RequestBody) {
    return this.proposalService.createBudgetProposalIncomeRevision(
      body.budgetProposalIncomeRevision,
    );
  }

  // 각 단체장단 권한으로 예산안 수출 생성
  @Public() // 임시로 로그인 없이 생성. 단체장단 데코레이터 추가 필요
  @Post("expense/create")
  @UsePipes(new ZodPipe(apiPrp011))
  async createBudgetProposalExpense(@Body() body: ApiPrp011RequestBody) {
    return this.proposalService.createBudgetProposalExpense(
      body.budgetProposalExpense,
    );
  }

  // 각 단체장단 권한으로 예산안 수출 revision 생성
  @Public() // 임시로 로그인 없이 생성. 단체장단 데코레이터 추가 필요
  @Post("expense-revision/create")
  @UsePipes(new ZodPipe(apiPrp012))
  async createBudgetProposalExpenseRevision(
    @Body() body: ApiPrp012RequestBody,
  ) {
    return this.proposalService.createBudgetProposalExpenseRevision(
      body.budgetProposalExpenseRevision,
    );
  }
}
