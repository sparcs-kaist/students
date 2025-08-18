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
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { ProposalService } from "../service/proposal.service";

@Controller("manager/proposals/budget-proposals")
export class ProposalManagerController {
  constructor(private readonly proposalService: ProposalService) {}

  // 각 매니저 권한으로 예산안 수입 생성
  @Post("income/create")
  @UsePipes(new ZodPipe(apiPrp008))
  async createBudgetProposalIncome(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp008RequestBody,
  ) {
    return this.proposalService.createBudgetProposalIncome(
      student,
      body.budgetProposalIncome,
    );
  }

  // 각 매니저 권한으로 예산안 수입 revision 생성
  @Post("income-revision/create")
  @UsePipes(new ZodPipe(apiPrp009))
  async createBudgetProposalIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp009RequestBody,
  ) {
    return this.proposalService.createBudgetProposalIncomeRevision(
      student,
      body.budgetProposalIncomeRevision,
    );
  }

  // 각 매니저 권한으로 예산안 수출 생성
  @Post("expense/create")
  @UsePipes(new ZodPipe(apiPrp011))
  async createBudgetProposalExpense(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp011RequestBody,
  ) {
    return this.proposalService.createBudgetProposalExpense(
      student,
      body.budgetProposalExpense,
    );
  }

  // 각 매니저 권한으로 예산안 수출 revision 생성
  @Post("expense-revision/create")
  @UsePipes(new ZodPipe(apiPrp012))
  async createBudgetProposalExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp012RequestBody,
  ) {
    return this.proposalService.createBudgetProposalExpenseRevision(
      student,
      body.budgetProposalExpenseRevision,
    );
  }
}
