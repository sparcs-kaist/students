import { Controller, Get, Param, Query, UsePipes } from "@nestjs/common";
import {
  apiBudPrp012,
  apiBudPrp013,
  apiBudPrp014,
  apiBudPrp015,
  apiBudPrp016,
  apiBudPrp017,
  apiPrp017,
  apiPrp020,
  ApiBudPrp012RequestQuery,
  ApiBudPrp013RequestQuery,
  ApiBudPrp014RequestQuery,
  ApiBudPrp015RequestQuery,
  ApiBudPrp016RequestQuery,
  ApiBudPrp017RequestQuery,
  ApiPrp017RequestParam,
  ApiPrp020RequestParam,
} from "@sparcs-students/interface/api/proposal/index";
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ProposalService } from "../service/proposal.service";

@Public()
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

  // 수입 제출본 날짜 목록 조회
  @Get("income/getDateList")
  @UsePipes(new ZodPipe(apiBudPrp014))
  async getBudgetProposalIncomeDateList(
    @Query() query: ApiBudPrp014RequestQuery,
  ) {
    return this.proposalService.getBudgetProposalIncomeDateList(query);
  }

  // 지출 제출본 날짜 목록 조회
  @Get("expense/getDateList")
  @UsePipes(new ZodPipe(apiBudPrp015))
  async getBudgetProposalExpenseDateList(
    @Query() query: ApiBudPrp015RequestQuery,
  ) {
    return this.proposalService.getBudgetProposalExpenseDateList(query);
  }

  // 해당 날짜의 수입 제출본 조회
  @Get("income/getRevisionsByDate")
  @UsePipes(new ZodPipe(apiBudPrp016))
  async getBudgetProposalIncomeRevisionsByDate(
    @Query() query: ApiBudPrp016RequestQuery,
  ) {
    return this.proposalService.getBudgetProposalIncomeRevisionsByDate(query);
  }

  // 해당 날짜의 지출 제출본 조회
  @Get("expense/getRevisionsByDate")
  @UsePipes(new ZodPipe(apiBudPrp017))
  async getBudgetProposalExpenseRevisionsByDate(
    @Query() query: ApiBudPrp017RequestQuery,
  ) {
    return this.proposalService.getBudgetProposalExpenseRevisionsByDate(query);
  }

  // 하단은 DocumentReview 관련.

  // IncomeDocumentReview 조회
  @Get("income-document-review/read/:budgetProposalIncomeRevisionId")
  @UsePipes(new ZodPipe(apiPrp017))
  async readBudgetProposalIncomeDocumentReview(
    @Param() params: ApiPrp017RequestParam,
  ) {
    return this.proposalService.readBudgetProposalIncomeDocumentReview(params);
  }

  // ExpenseDocumentReview 조회
  @Get("expense-document-review/read/:budgetProposalExpenseRevisionId")
  @UsePipes(new ZodPipe(apiPrp020))
  async readBudgetProposalExpenseDocumentReview(
    @Param() params: ApiPrp020RequestParam,
  ) {
    return this.proposalService.readBudgetProposalExpenseDocumentReview(params);
  }
}
