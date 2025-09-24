import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";
import { BudgetProposalExpenseRepository } from "./repository/budget-proposal-expense.repository";
import { BudgetProposalExpenseRevisionRepository } from "./repository/budget-proposal-expense-revision.repository";
import { BudgetProposalIncomeRepository } from "./repository/budget-proposal-income.repository";
import { OperationProposalRepository } from "./repository/operation-proposal.repository";
import { ProjectProposalRepository } from "./repository/project-proposal.repository";
import { BudgetProposalIncomeRevisionRepository } from "./repository/budget-proposal-income-revision.repository";
import { OperationProposalRevisionRepository } from "./repository/operation-proposal-revision.repository";
import { ProjectProposalRevisionRepository } from "./repository/project-proposal-revision.repository";
import { ProposalStaffController } from "./controller/proposal.staff.controller";
import { ProposalService } from "./service/proposal.service";
import { ProposalManagerController } from "./controller/proposal.manager.controller";
import { BudgetReportIncomeRepository } from "../report/repository/budget-report-income.repository";
import { BudgetReportExpenseRepository } from "../report/repository/budget-report-expense.repository";
import { OrganizationManagerRepository } from "../organization/repository/organization.manager.repository";
import { BudgetProposalExpenseDocumentReviewRepository } from "./repository/budget-proposal-expense-document-review.repository";
import { BudgetProposalIncomeDocumentReviewRepository } from "./repository/budget-proposal-income-document-review.repository";

@Module({
  providers: [
    ProjectProposalRepository,
    ProjectProposalRevisionRepository,
    BudgetProposalExpenseRepository,
    BudgetProposalExpenseRevisionRepository,
    BudgetProposalIncomeRepository,
    BudgetProposalIncomeRevisionRepository,
    BudgetProposalExpenseDocumentReviewRepository,
    BudgetProposalIncomeDocumentReviewRepository,
    BudgetReportIncomeRepository,
    BudgetReportExpenseRepository,
    OperationProposalRepository,
    OperationProposalRevisionRepository,
    ProposalService,
    OrganizationManagerRepository,
  ],
  imports: [DrizzleModule],
  exports: [
    ProjectProposalRepository,
    ProjectProposalRevisionRepository,
    BudgetProposalExpenseRepository,
    BudgetProposalExpenseRevisionRepository,
    BudgetProposalIncomeRepository,
    BudgetProposalIncomeRevisionRepository,
    BudgetProposalExpenseDocumentReviewRepository,
    BudgetProposalIncomeDocumentReviewRepository,
  ],
  controllers: [ProposalStaffController, ProposalManagerController],
})
export class ProposalModule {}
