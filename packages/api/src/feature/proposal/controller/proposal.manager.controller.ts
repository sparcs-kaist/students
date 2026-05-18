import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
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
  ApiBudPrp002RequestBody,
  ApiBudPrp003RequestBody,
  ApiBudPrp004RequestBody,
  ApiBudPrp005RequestBody,
  ApiBudPrp007RequestBody,
  ApiBudPrp008RequestBody,
  ApiBudPrp009RequestBody,
  ApiBudPrp010RequestBody,
  apiPrp101,
  apiPrp102,
  apiPrp103,
  apiPrp104,
  apiPrp105,
  apiPrp107,
  ApiPrp101RequestBody,
  ApiPrp102RequestBody,
  ApiPrp103RequestBody,
  ApiPrp104RequestBody,
  ApiPrp105RequestBody,
  ApiPrp107RequestQuery,
  apiPrp111,
  ApiPrp111RequestBody,
} from "@sparcs-students/interface/api/proposal/index";
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { ManagerOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { ProposalService } from "../service/proposal.service";

@ManagerOnly()
@Controller("manager/proposals")
export class ProposalManagerController {
  constructor(private readonly proposalService: ProposalService) {}

  // 각 매니저 권한으로 예산안 수입 생성
  @Post("budget-proposals/income/create")
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
  @Post("budget-proposals/income-revision/create")
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
  @Patch("budget-proposals/income-revision/update")
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
  @Patch("budget-proposals/income-revision/submit")
  @UsePipes(new ZodPipe(apiBudPrp005))
  async submitBudgetProposalIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp005RequestBody,
  ) {
    return this.proposalService.submitBudgetProposalIncomeRevision(
      student,
      body,
    );
  }

  // 예산안 수입 삭제
  @Delete("budget-proposals/income/delete")
  @UsePipes(new ZodPipe(apiBudPrp006))
  async deleteBudgetProposalIncome(
    @GetStudent() student: StudentProfile,
    @Query() query,
  ) {
    return this.proposalService.deleteBudgetProposalIncome(student, query);
  }

  // 각 매니저 권한으로 예산안 지출 생성
  @Post("budget-proposals/expense/create")
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
  @Post("budget-proposals/expense-revision/create")
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
  @Patch("budget-proposals/expense-revision/update")
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
  @Patch("budget-proposals/expense-revision/submit")
  @UsePipes(new ZodPipe(apiBudPrp010))
  async submitBudgetProposalExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudPrp010RequestBody,
  ) {
    return this.proposalService.submitBudgetProposalExpenseRevision(
      student,
      body,
    );
  }

  // 예산안 지출 삭제
  @Delete("budget-proposals/expense/delete")
  @UsePipes(new ZodPipe(apiBudPrp011))
  async deleteBudgetProposalExpense(
    @GetStudent() student: StudentProfile,
    @Query() query,
  ) {
    return this.proposalService.deleteBudgetProposalExpense(student, query);
  }

  @Post("project-proposals/create")
  @UsePipes(new ZodPipe(apiPrp101))
  async createProjectProposal(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp101RequestBody,
  ) {
    return this.proposalService.createProjectProposal(
      student,
      body.projectProposal,
    );
  }

  @Post("proposal-revision/create")
  @UsePipes(new ZodPipe(apiPrp102))
  async createProjectProposalRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp102RequestBody,
  ) {
    return this.proposalService.createProjectProposalRevision(
      student,
      body.projectProposalRevision,
    );
  }

  @Post("timeline/create")
  @UsePipes(new ZodPipe(apiPrp103))
  async createProjectProposalTimeline(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp103RequestBody,
  ) {
    return this.proposalService.createProjectProposalTimeline(
      student,
      body.projectProposalTimeline,
    );
  }

  @Post("proposal-revision/update")
  @UsePipes(new ZodPipe(apiPrp104))
  async updateProjectProposalRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp104RequestBody,
  ) {
    return this.proposalService.updateProjectProposalRevision(
      student,
      body.projectProposalRevision,
    );
  }

  @Post("timeline/update")
  @UsePipes(new ZodPipe(apiPrp105))
  async updateProjectProposalTimeline(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp105RequestBody,
  ) {
    return this.proposalService.updateProjectProposalTimeline(student, body);
  }

  // 각 매니저 권한으로 사업계획서 revision 삭제
  // 동일 code를 참조하는 timeline도 함께 삭제
  @Delete("proposal-revision/delete")
  @UsePipes(new ZodPipe(apiPrp107))
  async deleteProjectProposalRevision(
    @GetStudent() student: StudentProfile,
    @Query() query: ApiPrp107RequestQuery,
  ) {
    return this.proposalService.deleteProjectProposalRevision(student, query);
  }

  // 각 매니저 권한으로 운영계획 생성
  @Post("operation-proposals/create")
  @UsePipes(new ZodPipe(apiPrp111))
  async createOperationProposal(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiPrp111RequestBody,
  ) {
    return this.proposalService.createOperationProposal(
      student,
      body.operationProposal,
    );
  }
}
