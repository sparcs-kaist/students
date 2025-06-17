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
import { ProposalController } from "./controller/proposal.controller";
import { ProposalService } from "./service/proposal.service";

@Module({
  providers: [
    ProjectProposalRepository,
    ProjectProposalRevisionRepository,
    BudgetProposalExpenseRepository,
    BudgetProposalExpenseRevisionRepository,
    BudgetProposalIncomeRepository,
    BudgetProposalIncomeRevisionRepository,
    OperationProposalRepository,
    OperationProposalRevisionRepository,
    ProposalService,
  ],
  imports: [DrizzleModule],
  exports: [
    ProjectProposalRepository,
    ProjectProposalRevisionRepository,
    BudgetProposalExpenseRepository,
    BudgetProposalExpenseRevisionRepository,
    BudgetProposalIncomeRepository,
    BudgetProposalIncomeRevisionRepository,
  ],
  controllers: [ProposalController],
})
export class ProposalModule {}
