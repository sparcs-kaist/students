import { Injectable, ConflictException } from "@nestjs/common";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetProposalIncomeRepository } from "../repository/budget-proposal-income.repository";
import { BudgetProposalIncomeRevisionRepository } from "../repository/budget-proposal-income-revision.repository";

@Injectable()
export class ProposalService {
  constructor(
    private readonly budgetProposalIncomeRepository: BudgetProposalIncomeRepository,
    private readonly budgetProposalIncomeRevisionRepository: BudgetProposalIncomeRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
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
}
