import { Injectable } from "@nestjs/common";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetReportExpenseRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense.repository";
import { BudgetProposalIncomeRepository } from "../repository/budget-proposal-income.repository";
import { BudgetProposalIncomeRevisionRepository } from "../repository/budget-proposal-income-revision.repository";
import { BudgetProposalExpenseRepository } from "../repository/budget-proposal-expense.repository";
import { BudgetProposalExpenseRevisionRepository } from "../repository/budget-proposal-expense-revision.repository";

@Injectable()
export class ProposalPublicService {
  constructor(
    private readonly budgetProposalIncomeRepository: BudgetProposalIncomeRepository,
    private readonly budgetProposalIncomeRevisionRepository: BudgetProposalIncomeRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetProposalExpenseRepository: BudgetProposalExpenseRepository,
    private readonly budgetProposalExpenseRevisionRepository: BudgetProposalExpenseRevisionRepository,
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
  ) {}

  async readBudgetProposalIncomeRevision(param) {
    const revisions = await this.budgetProposalIncomeRevisionRepository.find({
      budgetProposalIncomeId: param.budgetProposalIncomeId,
    });

    return { budgetProposalIncomeRevisions: revisions };
  }

  async readBudgetProposalExpenseRevision(param) {
    const revisions = await this.budgetProposalExpenseRevisionRepository.find({
      budgetProposalExpenseId: param.budgetProposalExpenseId,
    });

    return { budgetProposalExpenseRevisions: revisions };
  }
}
