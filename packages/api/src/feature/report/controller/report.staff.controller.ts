import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";
import {
  apiRpt016,
  apiRpt018,
  apiRpt019,
  apiRpt021,
  ApiRpt016RequestBody,
  ApiRpt018RequestParam,
  ApiRpt019RequestBody,
  ApiRpt021RequestParam,
} from "@sparcs-students/interface/api/report/index";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import {
  GetStudent,
  StudentProfile,
} from "@sparcs-students/api/common/decorators/get-user.decorator";
import { StaffOnly } from "@sparcs-students/api/common/decorators/require-position.decorator";
import { ReportService } from "../service/report.service";

@StaffOnly()
@Controller("staff/reports/budget-reports")
export class ReportStaffController {
  constructor(private readonly reportService: ReportService) {}

  // 각 집행부원 권한으로 IncomeDocumentReview 생성
  @Post("income-document-review/create")
  @UsePipes(new ZodPipe(apiRpt016))
  async createBudgetReportIncomeDocumentReview(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiRpt016RequestBody,
  ) {
    return this.reportService.createBudgetReportIncomeDocumentReview(
      student,
      body.budgetReportIncomeDocumentReview,
    );
  }

  // 각 집행부원 권한으로 IncomeDocumentReview 삭제
  @Public()
  @Delete("income-document-review/delete/:budgetReportIncomeDocumentReviewId")
  @UsePipes(new ZodPipe(apiRpt018))
  async deleteBudgetReportIncomeDocumentReview(
    @Param() params: ApiRpt018RequestParam,
  ) {
    return this.reportService.deleteBudgetReportIncomeDocumentReview(
      params,
    );
  }

  // 각 집행부원 권한으로 ExpenseDocumentReview 생성
  @Post("expense-document-review/create")
  @UsePipes(new ZodPipe(apiRpt019))
  async createBudgetReportExpenseDocumentReview(
    @GetStudent() student: StudentProfile,
    @Body() body: ApiRpt019RequestBody,
  ) {
    return this.reportService.createBudgetReportExpenseDocumentReview(
      student,
      body.budgetReportExpenseDocumentReview,
    );
  }

  // 각 집행부원 권한으로 ExpenseDocumentReview 삭제
  @Public()
  @Delete(
    "expense-document-review/delete:budgetReportExpenseDocumentReviewId",
  )
  @UsePipes(new ZodPipe(apiRpt021))
  async deleteBudgetReportExpenseDocumentReview(
    @Param() params: ApiRpt021RequestParam,
  ) {
    return this.reportService.deleteBudgetReportExpenseDocumentReview(
      params,
    );
  }
}
