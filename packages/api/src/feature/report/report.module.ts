import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { ProjectReportRepository } from "@sparcs-students/api/feature/report/repository/project-report.repository";
import { ProjectReportRevisionRepository } from "@sparcs-students/api/feature/report/repository/project-report-revision.repository";
import { BudgetReportExpenseRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense.repository";
import { BudgetReportExpenseRevisionRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense-revision.repository";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetReportIncomeRevisionRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income-revision.repository";
import { OperationReportRepository } from "@sparcs-students/api/feature/report/repository/operation-report.repository";
import { ReportService } from "@sparcs-students/api/feature/report/service/report.service";
import { ReportController } from "@sparcs-students/api/feature/report/controller/report.controller";

@Module({
  providers: [
    ProjectReportRepository,
    ProjectReportRevisionRepository,
    BudgetReportExpenseRepository,
    BudgetReportExpenseRevisionRepository,
    BudgetReportIncomeRepository,
    BudgetReportIncomeRevisionRepository,
    OperationReportRepository,
    ReportService,
  ],
  imports: [DrizzleModule],
  exports: [
    ProjectReportRepository,
    ProjectReportRevisionRepository,
    BudgetReportExpenseRepository,
    BudgetReportExpenseRevisionRepository,
    BudgetReportIncomeRepository,
    BudgetReportIncomeRevisionRepository,
  ],
  controllers: [ReportController],
})
export class ReportModule {}
