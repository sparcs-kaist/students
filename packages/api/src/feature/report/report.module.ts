import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { BudgetReportExpenseRepository } from "./repository/budget-report-expense.repository";
import { BudgetReportExpenseRevisionRepository } from "./repository/budget-report-expense-revision.repository";
import { BudgetReportIncomeRepository } from "./repository/budget-report-income.repository";
import { OperationReportRepository } from "./repository/operation-report.repository";
import { ProjectReportRepository } from "./repository/project-report.repository";
import { BudgetReportIncomeRevisionRepository } from "./repository/budget-report-income-revision.repository";
import { OperationReportRevisionRepository } from "./repository/operation-report-revision.repository";
import { ProjectReportRevisionRepository } from "./repository/project-report-revision.repository";
import { ReportStaffController } from "./controller/report.staff.controller";
import { ReportService } from "./service/report.service";
import { ReportManagerController } from "./controller/report.manager.controller";
import { ReportController } from "./controller/report.controller";
import { OrganizationManagerRepository } from "../organization/repository/organization.manager.repository";
import { BudgetReportExpenseDocumentReviewRepository } from "./repository/budget-report-expense-document-review.repository";
import { BudgetReportIncomeDocumentReviewRepository } from "./repository/budget-report-income-document-review.repository";

@Module({
  providers: [
    ProjectReportRepository,
    ProjectReportRevisionRepository,
    BudgetReportExpenseRepository,
    BudgetReportExpenseRevisionRepository,
    BudgetReportIncomeRepository,
    BudgetReportIncomeRevisionRepository,
    BudgetReportExpenseDocumentReviewRepository,
    BudgetReportIncomeDocumentReviewRepository,
    BudgetReportIncomeRepository,
    BudgetReportExpenseRepository,
    OperationReportRepository,
    OperationReportRevisionRepository,
    ReportService,
    OrganizationManagerRepository,
  ],
  imports: [DrizzleModule],
  exports: [
    ProjectReportRepository,
    ProjectReportRevisionRepository,
    BudgetReportExpenseRepository,
    BudgetReportExpenseRevisionRepository,
    BudgetReportIncomeRepository,
    BudgetReportIncomeRevisionRepository,
    BudgetReportExpenseDocumentReviewRepository,
    BudgetReportIncomeDocumentReviewRepository,
  ],
  controllers: [
    ReportStaffController,
    ReportManagerController,
    ReportController,
  ],
})
export class ReportModule {}
