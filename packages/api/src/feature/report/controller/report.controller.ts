import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import {
  apiBudRpt012,
  apiBudRpt013,
  apiBudRpt014,
  apiBudRpt015,
  apiBudRpt016,
  apiBudRpt017,
  ApiBudRpt012RequestQuery,
  ApiBudRpt013RequestQuery,
  ApiBudRpt014RequestQuery,
  ApiBudRpt015RequestQuery,
  ApiBudRpt016RequestQuery,
  ApiBudRpt017RequestQuery,
} from "@sparcs-students/interface/api/report/index";
// import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ZodPipe } from "@sparcs-students/api/common/pipes/zod-pipe";
import { Public } from "@sparcs-students/api/common/decorators/skip-auth.decorator";
import { ReportService } from "../service/report.service";

@Public()
@Controller("student/reports/budget-reports")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // 수입 revision 최신본 조회
  @Get("income/getRecent")
  @UsePipes(new ZodPipe(apiBudRpt012))
  async getRecentBudgetReportIncome(
    @Query() query: ApiBudRpt012RequestQuery,
  ) {
    return this.reportService.getRecentBudgetReportIncome(query);
  }

  // 지출 revision 최신본 조회
  @Get("expense/getRecent")
  @UsePipes(new ZodPipe(apiBudRpt013))
  async getRecentBudgetReportExpense(
    @Query() query: ApiBudRpt013RequestQuery,
  ) {
    return this.reportService.getRecentBudgetReportExpense(query);
  }

  // 수입 제출본 날짜 목록 조회
  @Get("income/getDateList")
  @UsePipes(new ZodPipe(apiBudRpt014))
  async getBudgetReportIncomeDateList(
    @Query() query: ApiBudRpt014RequestQuery,
  ) {
    return this.reportService.getBudgetReportIncomeDateList(query);
  }

  // 지출 제출본 날짜 목록 조회
  @Get("expense/getDateList")
  @UsePipes(new ZodPipe(apiBudRpt015))
  async getBudgetReportExpenseDateList(
    @Query() query: ApiBudRpt015RequestQuery,
  ) {
    return this.reportService.getBudgetReportExpenseDateList(query);
  }

  // 해당 날짜의 수입 제출본 조회
  @Get("income/getRevisionsByDate")
  @UsePipes(new ZodPipe(apiBudRpt016))
  async getBudgetReportIncomeRevisionsByDate(
    @Query() query: ApiBudRpt016RequestQuery,
  ) {
    return this.reportService.getBudgetReportIncomeRevisionsByDate(query);
  }

  // 해당 날짜의 지출 제출본 조회
  @Get("expense/getRevisionsByDate")
  @UsePipes(new ZodPipe(apiBudRpt017))
  async getBudgetReportExpenseRevisionsByDate(
    @Query() query: ApiBudRpt017RequestQuery,
  ) {
    return this.reportService.getBudgetReportExpenseRevisionsByDate(query);
  }
}
