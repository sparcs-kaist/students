import { Injectable } from "@nestjs/common";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetProposalIncomeRepository } from "../repository/budget-proposal-income.repository";
import { BudgetProposalIncomeRevisionRepository } from "../repository/budget-proposal-income-revision.repository";

@Injectable()
export class ProposalPublicService {
  constructor(
    private readonly budgetProposalIncomeRepository: BudgetProposalIncomeRepository,
    private readonly budgetProposalIncomeRevisionRepository: BudgetProposalIncomeRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
  ) {}

  async readBudgetProposalIncomeRevision(param) {
    const revisions = await this.budgetProposalIncomeRevisionRepository.find({
      budgetProposalIncomeId: param.budgetProposalIncomeId,
    });

    return { budgetProposalIncomeRevisions: revisions };
  }
}
