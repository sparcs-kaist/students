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
    private readonly budgetReportExpenseReivisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetReportIncomeReivisionRepository: BudgetReportIncomeRevisionRepository,
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
      await this.budgetReportIncomeReivisionRepository.create(
        body.budgetReportIncomeRevision as any,
      );
    return {
      budgetReportIncomeRevision: { id: budgetReportIncomeRevision[0].id },
    };
  }

  async updateBudgetReportIncome(
    body: ApiRpt017RequestBody,
  ): Promise<ApiRpt017ResponseOk> {
    const target = await this.budgetReportIncomeReivisionRepository.find({
      id: body.budgetReportIncome.id,
    } as any);
    if (target.length === 0) {
      throw new NotFoundException("No Budget Report Income Exists");
    }
    const newBudgetReportIncome =
      await this.budgetReportIncomeReivisionRepository.put(
        body.budgetReportIncome as any,
      );
    return { budgetReportIncome: { id: newBudgetReportIncome.id } };
  }

  async updateSubmitBudgetReportIncome(
    body: ApiRpt018RequestBody,
  ): Promise<ApiRpt018ResponseOk> {
    const existing = await this.budgetReportIncomeReivisionRepository.find({
      id: body.budgetReportIncome.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Income Exists");
    }
    const newBudgetReportIncome =
      await this.budgetReportIncomeReivisionRepository.patch(
        { id: body.budgetReportIncome.id } as any,
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetReportIncome: { id: newBudgetReportIncome[0].id } };
  }

  async deleteBudgetReportIncome(
    body: ApiRpt019RequestBody,
  ): Promise<ApiRpt019ResponseNoContent> {
    const existing = await this.budgetReportIncomeReivisionRepository.find({
      id: body.budgetReportIncome.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Income Exists");
    }
    this.budgetReportIncomeRepository.delete({
      id: body.budgetReportIncome.id,
    } as any);
    this.budgetReportIncomeReivisionRepository.delete({
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
      await this.budgetReportExpenseReivisionRepository.create(
        body.budgetReportExpenseRevision as any,
      );
    return {
      budgetReportExpenseRevision: { id: budgetReportExpenseRevision[0].id },
    };
  }

  async updateBudgetReportExpense(
    body: ApiRpt022RequestBody,
  ): Promise<ApiRpt022ResponseOk> {
    const target = await this.budgetReportExpenseReivisionRepository.find({
      id: body.budgetReportExpense.id,
    } as any);
    if (target.length === 0) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    const newBudgetReportExpense =
      await this.budgetReportExpenseReivisionRepository.put(
        body.budgetReportExpense as any,
      );
    return { budgetReportExpense: { id: newBudgetReportExpense.id } };
  }

  async submitBudgetReportExpense(
    body: ApiRpt023RequestBody,
  ): Promise<ApiRpt023ResponseOk> {
    const existing = await this.budgetReportExpenseReivisionRepository.find({
      id: body.budgetReportExpense.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    const newBudgetReportExpense =
      await this.budgetReportExpenseReivisionRepository.patch(
        { id: body.budgetReportExpense.id } as any,
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetReportExpense: { id: newBudgetReportExpense[0].id } };
  }

  async deleteBudgetReportExpense(
    body: ApiRpt024RequestBody,
  ): Promise<ApiRpt024ResponseNoContent> {
    const existing = await this.budgetReportExpenseReivisionRepository.find({
      id: body.budgetReportExpense.id,
    } as any);
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    this.budgetReportExpenseRepository.delete({
      id: body.budgetReportExpense.id,
    } as any);
    this.budgetReportExpenseReivisionRepository.delete({
      budgetReportExpenseId: body.budgetReportExpense.id,
    } as any);
    return {};
  }
}
