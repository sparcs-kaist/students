import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Post,
  Query,
  UsePipes,
} from "@nestjs/common";
import {
  apiBudRpt002,
  apiBudRpt003,
  apiBudRpt004,
  apiBudRpt005,
  apiBudRpt006,
  apiBudRpt007,
  apiBudRpt008,
  apiBudRpt009,
  apiBudRpt010,
  apiBudRpt011,
  apiRpt017,
  apiRpt020,
  ApiBudRpt002RequestBody,
  ApiBudRpt003RequestBody,
  ApiBudRpt004RequestBody,
  ApiBudRpt005RequestBody,
  ApiBudRpt007RequestBody,
  ApiBudRpt008RequestBody,
  ApiBudRpt009RequestBody,
  ApiBudRpt010RequestBody,
  ApiRpt017RequestParam,
  ApiRpt020RequestParam,
} from "@sparcs-students/interface/api/report/index";
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { ManagerOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { ReportService } from "../service/report.service";

@ManagerOnly()
@Controller("manager/reports/budget-reports")
export class ReportManagerController {
  constructor(private readonly reportService: ReportService) {}

  // 각 매니저 권한으로 결산안 수입 생성
  @Post("income/create")
  @UsePipes(new ZodPipe(apiBudRpt002))
  async createBudgetReportIncome(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt002RequestBody,
  ) {
    return this.reportService.createBudgetReportIncome(
      student,
      body.budgetReportIncome,
    );
  }

  // 각 매니저 권한으로 결산안 수입 revision 생성
  @Post("income-revision/create")
  @UsePipes(new ZodPipe(apiBudRpt003))
  async createBudgetReportIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt003RequestBody,
  ) {
    return this.reportService.createBudgetReportIncomeRevision(
      student,
      body.budgetReportIncomeRevision,
    );
  }

  // 각 매니저 권한으로 결산안 수입 revision 수정
  @Patch("income-revision/update")
  @UsePipes(new ZodPipe(apiBudRpt004))
  async updateBudgetReportIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt004RequestBody,
  ) {
    return this.reportService.updateBudgetReportIncomeRevision(
      student,
      body.budgetReportIncomeRevision,
    );
  }

  // 각 매니저 권한으로 결산안 수입 revision 제출
  @Patch("income-revision/submit")
  @UsePipes(new ZodPipe(apiBudRpt005))
  async submitBudgetReportIncomeRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt005RequestBody,
  ) {
    return this.reportService.submitBudgetReportIncomeRevision(student, body);
  }

  // 결산안 수입 삭제
  @Delete("income/delete")
  @UsePipes(new ZodPipe(apiBudRpt006))
  async deleteBudgetReportIncome(
    @GetStudent() student: StudentProfile,
    @Query() query,
  ) {
    return this.reportService.deleteBudgetReportIncome(student, query);
  }

  // 각 매니저 권한으로 결산안 지출 생성
  @Post("expense/create")
  @UsePipes(new ZodPipe(apiBudRpt007))
  async createBudgetReportExpense(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt007RequestBody,
  ) {
    return this.reportService.createBudgetReportExpense(
      student,
      body.budgetReportExpense,
    );
  }

  // 각 매니저 권한으로 결산안 지출 revision 생성
  @Post("expense-revision/create")
  @UsePipes(new ZodPipe(apiBudRpt008))
  async createBudgetReportExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt008RequestBody,
  ) {
    return this.reportService.createBudgetReportExpenseRevision(
      student,
      body.budgetReportExpenseRevision,
    );
  }

  // 각 매니저 권한으로 결산안 지출 revision 수정
  @Patch("expense-revision/update")
  @UsePipes(new ZodPipe(apiBudRpt009))
  async updateBudgetReportExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt009RequestBody,
  ) {
    return this.reportService.updateBudgetReportExpenseRevision(
      student,
      body.budgetReportExpenseRevision,
    );
  }

  // 각 매니저 권한으로 결산안 지출 revision 제출
  @Patch("expense-revision/submit")
  @UsePipes(new ZodPipe(apiBudRpt010))
  async submitBudgetReportExpenseRevision(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiBudRpt010RequestBody,
  ) {
    return this.reportService.submitBudgetReportExpenseRevision(student, body);
  }

  // 결산안 지출 삭제
  @Delete("expense/delete")
  @UsePipes(new ZodPipe(apiBudRpt011))
  async deleteBudgetReportExpense(
    @GetStudent() student: StudentProfile,
    @Query() query,
  ) {
    return this.reportService.deleteBudgetReportExpense(student, query);
  }

  // 하단은 DocumentReview 관련.

  // IncomeDocumentReview 조회
  @Get("income-document-review/read/:budgetReportIncomeRevisionId")
  @UsePipes(new ZodPipe(apiRpt017))
  async readBudgetReportIncomeDocumentReview(
    @Param() params: ApiRpt017RequestParam,
  ) {
    return this.reportService.readBudgetReportIncomeDocumentReview(params);
  }

  // ExpenseDocumentReview 조회
  @Get("expense-document-review/read/:budgetReportExpenseRevisionId")
  @UsePipes(new ZodPipe(apiRpt020))
  async readBudgetReportExpenseDocumentReview(
    @Param() params: ApiRpt020RequestParam,
  ) {
    return this.reportService.readBudgetReportExpenseDocumentReview(params);
  }
}
