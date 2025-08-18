import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { ProjectReportRepository } from "@sparcs-students/api/feature/report/repository/project-report.repository";
import { ProjectReportRevisionRepository } from "@sparcs-students/api/feature/report/repository/project-report-revision.repository";
import { BudgetReportExpenseRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense.repository";
import { BudgetReportExpenseRevisionRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense-revision.repository";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetReportIncomeRevisionRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income-revision.repository";
import { OperationReportRepository } from "@sparcs-students/api/feature/report/repository/operation-report.repository";
import { ProjectReportService } from "@sparcs-students/api/feature/report/service/project-report.service";
import { ReportController } from "@sparcs-students/api/feature/report/controller/report.controller";
import { BudgetReportService } from "./service/budget-report.service";
import { BudgetProposalExpenseRepository } from "../proposal/repository/budget-proposal-expense.repository";
import { BudgetProposalExpenseRevisionRepository } from "../proposal/repository/budget-proposal-expense-revision.repository";
import { BudgetProposalIncomeRepository } from "../proposal/repository/budget-proposal-income.repository";
import { BudgetProposalIncomeRevisionRepository } from "../proposal/repository/budget-proposal-income-revision.repository";
import { ProjectReportPublicService } from "./service/project-report.public.service";
import { BudgetReportPublicService } from "./service/budget-report.public.service";
import { ProjectReportTimelineRepository } from "./repository/project-report-timeline.repository";
import { OrganizationRepository } from "../organization/repository/organization.repository";
import { OrganizationManagerRepository } from "../organization/repository/organization.manager.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [ReportController],
  providers: [
    ProjectReportRepository,
    ProjectReportRevisionRepository,
    ProjectReportTimelineRepository,
    BudgetReportExpenseRepository,
    BudgetReportExpenseRevisionRepository,
    BudgetReportIncomeRepository,
    BudgetReportIncomeRevisionRepository,
    OperationReportRepository,
    OrganizationRepository,
    OrganizationManagerRepository,
    BudgetProposalExpenseRepository,
    BudgetProposalExpenseRevisionRepository,
    BudgetProposalIncomeRepository,
    BudgetProposalIncomeRevisionRepository,
    ProjectReportService,
    ProjectReportPublicService,
    BudgetReportService,
    BudgetReportPublicService,
  ],
  exports: [ProjectReportPublicService, BudgetReportPublicService],
})
export class ReportModule {}
