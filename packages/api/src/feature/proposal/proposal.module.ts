import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-students/api/drizzle/drizzle.module";

@Module({
  providers: [
    ProjectProposalRepository,
    ProjectProposalRevisionRepository,
    BudgetProposalExpenseRepository,
    BudgetProposalExpenseRevisionRepository,
    BudgetProposalIncomeRepository,
    BudgetProposalIncomeRevisionRepository,
  ],
  imports: [DrizzleModule],
})
export class ProposalModule {}
