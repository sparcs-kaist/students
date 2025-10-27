import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";
import {
  apiBudPrp002,
  apiBudPrp003,
  apiBudPrp004,
  apiBudPrp005,
  apiBudPrp006,
  apiBudPrp007,
  apiBudPrp008,
  apiBudPrp009,
  apiBudPrp010,
  apiBudPrp011,
  apiPrp017,
  apiPrp020,
  ApiBudPrp002RequestBody,
  ApiBudPrp003RequestBody,
  ApiBudPrp004RequestBody,
  ApiBudPrp005RequestBody,
  ApiBudPrp007RequestBody,
  ApiBudPrp008RequestBody,
  ApiBudPrp009RequestBody,
  ApiBudPrp010RequestBody,
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
  @UsePipes(new ZodPipe(apiBudPrp002))
  async createBudgetProposalIncome(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp002RequestBody,
  ) {
    return this.proposalService.createBudgetProposalIncome(
      student,
      body.budgetProposalIncome,
    );
  }

  // 각 매니저 권한으로 예산안 수입 revision 생성
  @Post("income-revision/create")
  @UsePipes(new ZodPipe(apiBudPrp003))
  async createBudgetProposalIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp003RequestBody,
  ) {
    return this.proposalService.createBudgetProposalIncomeRevision(
      student,
      body.budgetProposalIncomeRevision,
    );
  }

  // 각 매니저 권한으로 예산안 수입 revision 수정
  @Put("income-revision/update")
  @UsePipes(new ZodPipe(apiBudPrp004))
  async updateBudgetProposalIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp004RequestBody,
  ) {
    return this.proposalService.updateBudgetProposalIncomeRevision(
      student,
      body.budgetProposalIncomeRevision,
    );
  }

  // 각 매니저 권한으로 예산안 수입 revision 제출
  @Put("income-revision/submit")
  @UsePipes(new ZodPipe(apiBudPrp005))
  async submitBudgetProposalIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp005RequestBody,
  ) {
    return this.proposalService.submitBudgetProposalIncomeRevision(
      student,
      body.budgetProposalIncomeRevision,
    );
  }

  // 예산안 수입 삭제
  @Delete("income/delete")
  @UsePipes(new ZodPipe(apiBudPrp006))
  async deleteBudgetProposalIncome(
    @GetStudent() student: StudentProfile,
    @Query() query,
  ) {
    return this.proposalService.deleteBudgetProposalIncome(student, query);
  }

  // 각 매니저 권한으로 예산안 지출 생성
  @Post("expense/create")
  @UsePipes(new ZodPipe(apiBudPrp007))
  async createBudgetProposalExpense(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp007RequestBody,
  ) {
    return this.proposalService.createBudgetProposalExpense(
      student,
      body.budgetProposalExpense,
    );
  }

  // 각 매니저 권한으로 예산안 지출 revision 생성
  @Post("expense-revision/create")
  @UsePipes(new ZodPipe(apiBudPrp008))
  async createBudgetProposalExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp008RequestBody,
  ) {
    return this.proposalService.createBudgetProposalExpenseRevision(
      student,
      body.budgetProposalExpenseRevision,
    );
  }

  // 각 매니저 권한으로 예산안 지출 revision 수정
  @Put("expense-revision/update")
  @UsePipes(new ZodPipe(apiBudPrp009))
  async updateBudgetProposalExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp009RequestBody,
  ) {
    return this.proposalService.updateBudgetProposalExpenseRevision(
      student,
      body.budgetProposalExpenseRevision,
    );
  }

  // 각 매니저 권한으로 예산안 지출 revision 제출
  @Put("expense-revision/submit")
  @UsePipes(new ZodPipe(apiBudPrp010))
  async submitBudgetProposalExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp010RequestBody,
  ) {
    return this.proposalService.submitBudgetProposalExpenseRevision(
      student,
      body.budgetProposalExpenseRevision,
    );
  }

  // 예산안 지출 삭제
  @Delete("expense/delete")
  @UsePipes(new ZodPipe(apiBudPrp011))
  async deleteBudgetProposalExpense(
    @GetStudent() student: StudentProfile,
    @Query() query,
  ) {
    return this.proposalService.deleteBudgetProposalExpense(student, query);
  }

  // 하단은 DocumentReview 관련.

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
