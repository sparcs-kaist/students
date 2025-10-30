/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ApiRpt015RequestBody,
  ApiRpt015ResponseCreated,
  ApiRpt016RequestBody,
  ApiRpt016ResponseCreated,
  ApiRpt017RequestBody,
  ApiRpt017ResponseOk,
  ApiRpt018RequestBody,
  ApiRpt018ResponseOk,
  ApiRpt019RequestBody,
  ApiRpt019ResponseNoContent,
  ApiRpt020RequestBody,
  ApiRpt020ResponseCreated,
  ApiRpt021RequestBody,
  ApiRpt021ResponseCreated,
  ApiRpt022RequestBody,
  ApiRpt022ResponseOk,
  ApiRpt023RequestBody,
  ApiRpt023ResponseOk,
  ApiRpt024RequestBody,
  ApiRpt024ResponseNoContent,
} from "@sparcs-students/interface/api/report/index";

import { BudgetReportExpenseRepository } from "../repository/budget-report-expense.repository";
import { BudgetReportExpenseRevisionRepository } from "../repository/budget-report-expense-revision.repository";
import { BudgetReportIncomeRepository } from "../repository/budget-report-income.repository";
import { BudgetReportIncomeRevisionRepository } from "../repository/budget-report-income-revision.repository";

@Injectable()
export class BudgetReportService {
  constructor(
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
    private readonly budgetReportExpenseRevisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetReportIncomeRevisionRepository: BudgetReportIncomeRevisionRepository,
  ) {}

  async createBudgetReportIncome(
    body: ApiRpt015RequestBody,
  ): Promise<ApiRpt015ResponseCreated> {
    const budgetReportIncome = await this.budgetReportIncomeRepository.create(
      body.budgetReportIncome as any,
    );
    return { budgetReportIncome: { id: budgetReportIncome[0].id } };
  }

  async createBudgetReportIncomeRevision(
    body: ApiRpt016RequestBody,
  ): Promise<ApiRpt016ResponseCreated> {
    const budgetReportIncomeRevision =
      await this.budgetReportIncomeRevisionRepository.create(
        body.budgetReportIncomeRevision as any,
      );
    return {
      budgetReportIncomeRevision: { id: budgetReportIncomeRevision[0].id },
    };
  }

  async updateBudgetReportIncomeRevision(
    body: ApiRpt017RequestBody,
  ): Promise<ApiRpt017ResponseOk> {
    const target = await this.budgetReportIncomeRevisionRepository.find({
      id: body.budgetReportIncomeRevision.id,
    } as any);
    if (target.length === 0) {
      throw new NotFoundException("No Budget Report Income Exists");
    }
    const newBudgetReportIncome =
      await this.budgetReportIncomeRevisionRepository.put(
        body.budgetReportIncomeRevision as any,
      );
    return { budgetReportIncomeRevision: { id: newBudgetReportIncome.id } };
  }

  async updateSubmitBudgetReportIncomeRevision(
    body: ApiRpt018RequestBody,
  ): Promise<ApiRpt018ResponseOk> {
    const existing = await this.budgetReportIncomeRevisionRepository.find({
      id: body.budgetReportIncomeRevision.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Income Exists");
    }
    if (existing[0].submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }
    const newBudgetReportIncome =
      await this.budgetReportIncomeRevisionRepository.patch(
        { id: body.budgetReportIncomeRevision.id } as any,
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetReportIncomeRevision: { id: newBudgetReportIncome[0].id } };
  }

  async deleteBudgetReportIncome(
    body: ApiRpt019RequestBody,
  ): Promise<ApiRpt019ResponseNoContent> {
    const existing = await this.budgetReportIncomeRevisionRepository.find({
      budgetReportIncomeId: body.budgetReportIncome.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Income Revision Exists");
    }
    await this.budgetReportIncomeRepository.delete({
      id: body.budgetReportIncome.id,
    } as any);
    await this.budgetReportIncomeRevisionRepository.delete({
      budgetReportIncomeId: body.budgetReportIncome.id,
    } as any);
    return {};
  }

  async createBudgetReportExpense(
    body: ApiRpt020RequestBody,
  ): Promise<ApiRpt020ResponseCreated> {
    const budgetReportExpense = await this.budgetReportExpenseRepository.create(
      body.budgetReportExpense as any,
    );
    return { budgetReportExpense: { id: budgetReportExpense[0].id } };
  }

  async createBudgetReportExpenseRevision(
    body: ApiRpt021RequestBody,
  ): Promise<ApiRpt021ResponseCreated> {
    const budgetReportExpenseRevision =
      await this.budgetReportExpenseRevisionRepository.create(
        body.budgetReportExpenseRevision as any,
      );
    return {
      budgetReportExpenseRevision: { id: budgetReportExpenseRevision[0].id },
    };
  }

  async updateBudgetReportExpenseRevision(
    body: ApiRpt022RequestBody,
  ): Promise<ApiRpt022ResponseOk> {
    const target = await this.budgetReportExpenseRevisionRepository.find({
      id: body.budgetReportExpenseRevision.id,
    } as any);
    if (target.length === 0) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    const newBudgetReportExpense =
      await this.budgetReportExpenseRevisionRepository.put(
        body.budgetReportExpenseRevision as any,
      );
    return { budgetReportExpenseRevision: { id: newBudgetReportExpense.id } };
  }

  async submitBudgetReportExpenseRevision(
    body: ApiRpt023RequestBody,
  ): Promise<ApiRpt023ResponseOk> {
    const existing = await this.budgetReportExpenseRevisionRepository.find({
      id: body.budgetReportExpenseRevision.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    if (existing[0].submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }
    const newBudgetReportExpense =
      await this.budgetReportExpenseRevisionRepository.patch(
        { id: body.budgetReportExpenseRevision.id } as any,
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return {
      budgetReportExpenseRevision: { id: newBudgetReportExpense[0].id },
    };
  }

  async deleteBudgetReportExpense(
    body: ApiRpt024RequestBody,
  ): Promise<ApiRpt024ResponseNoContent> {
    const existing = await this.budgetReportExpenseRevisionRepository.find({
      budgetReportExpenseId: body.budgetReportExpense.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    await this.budgetReportExpenseRepository.delete({
      id: body.budgetReportExpense.id,
    } as any);
    await this.budgetReportExpenseRevisionRepository.delete({
      budgetReportExpenseId: body.budgetReportExpense.id,
    } as any);
    return {};
  }
}
