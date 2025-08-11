import { Injectable, ConflictException } from "@nestjs/common";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetReportExpenseRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense.repository";
import { BudgetProposalIncomeRepository } from "../repository/budget-proposal-income.repository";
import { BudgetProposalIncomeRevisionRepository } from "../repository/budget-proposal-income-revision.repository";
import { BudgetProposalExpenseRepository } from "../repository/budget-proposal-expense.repository";
import { BudgetProposalExpenseRevisionRepository } from "../repository/budget-proposal-expense-revision.repository";

@Injectable()
export class ProposalService {
  constructor(
    private readonly budgetProposalIncomeRepository: BudgetProposalIncomeRepository,
    private readonly budgetProposalIncomeRevisionRepository: BudgetProposalIncomeRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetProposalExpenseRepository: BudgetProposalExpenseRepository,
    private readonly budgetProposalExpenseRevisionRepository: BudgetProposalExpenseRevisionRepository,
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
  ) {}

  async createBudgetProposalIncome(body) {
    // semester 중복 확인
    const existing = await this.budgetProposalIncomeRepository.find({
      organizationId: body.organization.id,
      semesterId: body.semester.id,
    });
    if (existing.length > 0) {
      throw new ConflictException("Already exists this semester.");
    }

    // 생성
    const [newBudgetProposalIncome] =
      await this.budgetProposalIncomeRepository.create(body);
    return {
      budgetProposalIncome: newBudgetProposalIncome,
    };
  }

  async createBudgetProposalIncomeRevision(body) {
    // 지난 학기 report 확인
    const [budgetIncome] = await this.budgetProposalIncomeRepository.find({
      id: body.budgetProposalIncome.id,
    });
    if (!budgetIncome) {
      throw new ConflictException("BudgetProposalIncome does not exist.");
    }
    const orgId = budgetIncome.organization.id;
    const prevSemesterId = budgetIncome.semester.id - 1;

    const [prevReport] = await this.budgetReportIncomeRepository.find({
      organizationId: orgId as unknown,
      semesterId: prevSemesterId as unknown,
    });

    // 동일 code의 revision을 soft delete
    await this.budgetProposalIncomeRevisionRepository.delete({
      budgetProposalIncomeId: body.budgetProposalIncome.id,
      code: body.code,
    });

    const budgetProposalIncomeRevisionCreateDto = {
      ...body,
      previousBudgetReportIncome: prevReport
        ? { id: prevReport.id }
        : { id: null },
    };

    // 생성
    const [newBudgetProposalIncomeRevision] =
      await this.budgetProposalIncomeRevisionRepository.create(
        budgetProposalIncomeRevisionCreateDto,
      );
    return {
      budgetProposalIncomeRevision: newBudgetProposalIncomeRevision,
    };
  }

  async createBudgetProposalExpense(body) {
    // semester 중복 확인
    const existing = await this.budgetProposalExpenseRepository.find({
      organizationId: body.organization.id,
      semesterId: body.semester.id,
    });
    if (existing.length > 0) {
      throw new ConflictException("Already exists this semester.");
    }

    // 생성
    const [newBudgetProposalExpense] =
      await this.budgetProposalExpenseRepository.create(body);
    return {
      budgetProposalExpense: newBudgetProposalExpense,
    };
  }

  async createBudgetProposalExpenseRevision(body) {
    // 지난 학기 report 확인
    const [budgetExpense] = await this.budgetProposalExpenseRepository.find({
      id: body.budgetProposalExpense.id,
    });
    if (!budgetExpense) {
      throw new ConflictException("BudgetProposalExpense does not exist.");
    }
    const orgId = budgetExpense.organization.id;
    const prevSemesterId = budgetExpense.semester.id - 1;

    const [prevReport] = await this.budgetReportExpenseRepository.find({
      organizationId: orgId as unknown,
      semesterId: prevSemesterId as unknown,
    });

    // 동일 code의 revision을 soft delete
    await this.budgetProposalExpenseRevisionRepository.delete({
      budgetProposalExpenseId: body.budgetProposalExpense.id,
      code: body.code,
    });

    const budgetProposalExpenseRevisionCreateDto = {
      ...body,
      previousBudgetReportExpense: prevReport
        ? { id: prevReport.id }
        : { id: null },
    };

    // 생성
    const [newBudgetProposalExpenseRevision] =
      await this.budgetProposalExpenseRevisionRepository.create(
        budgetProposalExpenseRevisionCreateDto,
      );
    return {
      budgetProposalExpenseRevision: newBudgetProposalExpenseRevision,
    };
  }
}
