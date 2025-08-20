/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import {
  ApiRpt014RequestQuery,
  ApiRpt014ResponseOk,
} from "@sparcs-students/interface/api/report/index";

import { BudgetProposalExpenseRevisionRepository } from "@sparcs-students/api/feature/proposal/repository/budget-proposal-expense-revision.repository";
import { BudgetProposalIncomeRevisionRepository } from "@sparcs-students/api/feature/proposal/repository/budget-proposal-income-revision.repository";
import { BudgetReportExpenseRepository } from "../repository/budget-report-expense.repository";
import { BudgetReportExpenseRevisionRepository } from "../repository/budget-report-expense-revision.repository";
import { BudgetReportIncomeRepository } from "../repository/budget-report-income.repository";
import { BudgetReportIncomeRevisionRepository } from "../repository/budget-report-income-revision.repository";

@Injectable()
export class BudgetReportPublicService {
  constructor(
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
    private readonly budgetReportExpenseRevisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetReportIncomeRevisionRepository: BudgetReportIncomeRevisionRepository,
    private readonly budgetProposalExpenseRevisionRepository: BudgetProposalExpenseRevisionRepository,
    private readonly budgetProposalIncomeRevisionRepository: BudgetProposalIncomeRevisionRepository,
  ) {}

  async getBudgetReport(
    query: ApiRpt014RequestQuery,
  ): Promise<ApiRpt014ResponseOk> {
    const [budgetReportIncomes, budgetReportExpenses] = await Promise.all([
      this.budgetReportIncomeRepository.find({
        organizationId: query.organization,
        semesterId: query.semester,
      } as any),
      this.budgetReportExpenseRepository.find({
        organizationId: query.organization,
        semesterId: query.semester,
      } as any),
    ]);
    const budgetReportIncomeIds = budgetReportIncomes.map(
      budgetReportIncome => budgetReportIncome.id,
    );
    const budgetReportExpenseIds = budgetReportExpenses.map(
      budgetReportExpense => budgetReportExpense.id,
    );

    const [budgetReportIncomeRevisions, budgetReportExpenseRevisions] =
      await Promise.all([
        this.budgetReportIncomeRevisionRepository.find({
          budgetReportIncomeId: budgetReportIncomeIds,
        } as any),
        this.budgetReportExpenseRevisionRepository.find({
          budgetReportExpenseId: budgetReportExpenseIds,
        } as any),
      ]);
    const latestBudgetReportIncomeRevisions = new Map();
    const latestBudgetReportExpenseRevisions = new Map();
    budgetReportIncomeRevisions.forEach(revision => {
      const existing = latestBudgetReportIncomeRevisions.get(revision.id);
      if (
        !existing ||
        (existing && existing.submittedAt < revision.submittedAt)
      ) {
        latestBudgetReportIncomeRevisions.set(revision.id, {
          amount: revision.amount,
          note: revision.note,
        });
      }
    });
    budgetReportExpenseRevisions.forEach(revision => {
      const existing = latestBudgetReportExpenseRevisions.get(revision.id);
      if (
        !existing ||
        (existing && existing.submittedAt < revision.submittedAt)
      ) {
        latestBudgetReportExpenseRevisions.set(revision.id, {
          amount: revision.amount,
          note: revision.note,
        });
      }
    });

    const [budgetProposalIncomeRevisions, budgetProposalExpenseRevisions] =
      await Promise.all([
        this.budgetProposalIncomeRevisionRepository.find({
          previousBudgetReportIncomeId: [
            ...latestBudgetReportIncomeRevisions.keys(),
          ],
        } as any),
        this.budgetProposalExpenseRevisionRepository.find({
          previousBudgetReportExpenseId: [
            ...latestBudgetReportExpenseRevisions.keys(),
          ],
        } as any),
      ]);
    const latestBudgetProposalIncomeRevisions = new Map();
    const latestBudgetProposalExpenseRevisions = new Map();
    budgetProposalIncomeRevisions.forEach(revision => {
      const existing = latestBudgetProposalIncomeRevisions.get(
        revision.previousBudgetReportIncome.id,
      );
      if (
        !existing ||
        (existing && existing.submittedAt < revision.submittedAt)
      ) {
        latestBudgetProposalIncomeRevisions.set(
          revision.previousBudgetReportIncome.id,
          {
            domain: revision.budgetDomainEnum,
            division: revision.budgetDivisionIncomeEnum,
            name: revision.name,
            amount: revision.amount,
            detail: revision.detail,
          },
        );
      }
    });
    budgetProposalExpenseRevisions.forEach(revision => {
      const existing = latestBudgetProposalExpenseRevisions.get(
        revision.previousBudgetReportExpense.id,
      );
      if (
        !existing ||
        (existing && existing.submittedAt < revision.submittedAt)
      ) {
        latestBudgetProposalExpenseRevisions.set(
          revision.previousBudgetReportExpense.id,
          {
            domain: revision.budgetDomainEnum,
            division: revision.budgetDivisionExpenseEnum,
            class: revision.budgetClassExpenseEnum,
            name: revision.name,
            amount: revision.amount,
            detail: revision.detail,
          },
        );
      }
    });
    const budgetReportIncomesInfo = Array.from(
      latestBudgetReportIncomeRevisions,
      ([key, value]) => {
        const proposal = latestBudgetProposalIncomeRevisions.get(key);
        return {
          id: key,
          budgetDomain: proposal.domain,
          budgetDivision: proposal.division,
          name: proposal.name,
          proposalAmount: proposal.amount,
          reportAmount: value.amount,
          detail: proposal.detail,
          note: value.note,
        };
      },
    );
    const budgetReportExpensesInfo = Array.from(
      latestBudgetReportExpenseRevisions,
      ([key, value]) => {
        const proposal = latestBudgetProposalExpenseRevisions.get(key);
        return {
          id: key,
          budgetDomain: proposal.domain,
          budgetDivision: proposal.division,
          budgetClassExpense: proposal.class,
          name: proposal.name,
          proposalAmount: proposal.amount,
          reportAmount: value.amount,
          detail: proposal.detail,
          note: value.note,
        };
      },
    );

    const budgetReport = {
      budgetReportIncomes: budgetReportIncomesInfo,
      budgetReportExpenses: budgetReportExpensesInfo,
    };

    return { budgetReport };
  }
}
