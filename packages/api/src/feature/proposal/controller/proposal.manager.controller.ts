import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";
import {
  apiPrp008,
  apiPrp009,
  apiPrp010,
  apiPrp011,
  apiPrp012,
  apiPrp013,
  apiPrp014,
  apiPrp015,
  apiPrp017,
  apiPrp020,
  ApiPrp008RequestBody,
  ApiPrp009RequestBody,
  ApiPrp010RequestParam,
  ApiPrp011RequestBody,
  ApiPrp012RequestBody,
  ApiPrp013RequestParam,
  ApiPrp014RequestParam,
  ApiPrp015RequestParam,
  ApiPrp017RequestParam,
  ApiPrp020RequestParam,
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

  // 예산안 수입 revision 조회
  @Get("income-revision/read/:budgetProposalIncomeId")
  @UsePipes(new ZodPipe(apiPrp010))
  async readBudgetProposalIncomeRevision(
    @Param() params: ApiPrp010RequestParam,
  ) {
    return this.proposalService.readBudgetProposalIncomeRevision(params);
  }

  // 예산안 수출 revision 조회
  @Get("expense-revision/read/:budgetProposalExpenseId")
  @UsePipes(new ZodPipe(apiPrp013))
  async readBudgetProposalExpenseRevision(
    @Param() params: ApiPrp013RequestParam,
  ) {
    return this.proposalService.readBudgetProposalExpenseRevision(params);
  }

  // 예산안 수입 revision 삭제
  @Delete("income-revision/delete/:budgetProposalIncomeRevisionId")
  @UsePipes(new ZodPipe(apiPrp014))
  async deleteBudgetProposalIncomeRevision(
    @Param() params: ApiPrp014RequestParam,
  ) {
    return this.proposalService.deleteBudgetProposalIncomeRevision(params);
  }

  // 예산안 수출 revision 삭제
  @Delete("expense-revision/delete/:budgetProposalExpenseRevisionId")
  @UsePipes(new ZodPipe(apiPrp015))
  async deleteBudgetProposalExpenseRevision(
    @Param() params: ApiPrp015RequestParam,
  ) {
    return this.proposalService.deleteBudgetProposalExpenseRevision(params);
  }

  // 각 매니저 권한으로 IncomeDocumentReview 조회
  @Get("income-document-review/read/:budgetProposalIncomeRevisionId")
  @UsePipes(new ZodPipe(apiPrp017))
  async readBudgetProposalIncomeDocumentReview(
    @Param() params: ApiPrp017RequestParam,
  ) {
    return this.proposalService.readBudgetProposalIncomeDocumentReview(params);
  }

  // 각 매니저 권한으로 ExpenseDocumentReview 조회
  @Get("expense-document-review/read/:budgetProposalExpenseRevisionId")
  @UsePipes(new ZodPipe(apiPrp020))
  async readBudgetProposalExpenseDocumentReview(
    @Param() params: ApiPrp020RequestParam,
  ) {
    return this.proposalService.readBudgetProposalExpenseDocumentReview(params);
  }
}
