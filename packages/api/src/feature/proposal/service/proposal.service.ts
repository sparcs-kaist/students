import { Injectable, ConflictException } from "@nestjs/common";
import { BudgetReportIncomeRepository } from "@sparcs-students/api/feature/report/repository/budget-report-income.repository";
import { BudgetReportExpenseRepository } from "@sparcs-students/api/feature/report/repository/budget-report-expense.repository";
import { OrganizationManagerRepository } from "@sparcs-students/api/feature/organization/repository/organization.manager.repository";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";
import { BudgetProposalIncomeRepository } from "../repository/budget-proposal-income.repository";
import { BudgetProposalIncomeRevisionRepository } from "../repository/budget-proposal-income-revision.repository";
import { BudgetProposalExpenseRepository } from "../repository/budget-proposal-expense.repository";
import { BudgetProposalExpenseRevisionRepository } from "../repository/budget-proposal-expense-revision.repository";
import { BudgetProposalIncomeDocumentReviewRepository } from "../repository/budget-proposal-income-document-review.repository";
import { BudgetProposalExpenseDocumentReviewRepository } from "../repository/budget-proposal-expense-document-review.repository";

@Injectable()
export class ProposalService {
  constructor(
    private readonly budgetProposalIncomeRepository: BudgetProposalIncomeRepository,
    private readonly budgetProposalIncomeRevisionRepository: BudgetProposalIncomeRevisionRepository,
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetProposalExpenseRepository: BudgetProposalExpenseRepository,
    private readonly budgetProposalExpenseRevisionRepository: BudgetProposalExpenseRevisionRepository,
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
    private readonly organizationManagerRepository: OrganizationManagerRepository,
    private readonly budgetProposalIncomeDocumentReviewRepository: BudgetProposalIncomeDocumentReviewRepository,
    private readonly budgetProposalExpenseDocumentReviewRepository: BudgetProposalExpenseDocumentReviewRepository,
  ) {}

  async checkManager(studentId, organizationId) {
    const isManager = await this.organizationManagerRepository.find({
      studentId,
      organizationId,
      endTerm: null,
    });
    if (isManager.length === 0) {
      throw new ConflictException({
        status: "Error",
        message: "Not a manager of this organization",
      });
    }
  }

  async createBudgetProposalIncome(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    await this.checkManager(studentId, body.organization.id);

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

  async createBudgetProposalIncomeRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    await this.checkManager(studentId, body.organization.id);

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

  async createBudgetProposalExpense(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    await this.checkManager(studentId, body.organization.id);

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

  async createBudgetProposalExpenseRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    await this.checkManager(studentId, body.organization.id);

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

  async deleteBudgetProposalIncomeRevision(param) {
    const existing = await this.budgetProposalIncomeRevisionRepository.find({
      id: param.budgetProposalIncomeRevisionId,
    });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetProposalIncomeRevision does not exist.",
      );
    }

    await this.budgetProposalIncomeRevisionRepository.delete({
      id: param.budgetProposalIncomeRevisionId,
    });
  }

  async deleteBudgetProposalExpenseRevision(param) {
    const existing = await this.budgetProposalExpenseRevisionRepository.find({
      id: param.budgetProposalExpenseRevisionId,
    });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetProposalExpenseRevision does not exist.",
      );
    }

    await this.budgetProposalExpenseRevisionRepository.delete({
      id: param.budgetProposalExpenseRevisionId,
    });
  }

  async createBudgetProposalIncomeDocumentReview(student, body) {
    const existing = await this.budgetProposalIncomeRevisionRepository.find({
      id: body.budgetProposalIncomeRevision.id,
    });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetProposalIncomeRevision does not exist.",
      );
    }

    // 동일 revisionId의 documentReview을 soft delete
    await this.budgetProposalIncomeDocumentReviewRepository.delete({
      budgetProposalIncomeRevisionId: body.budgetProposalIncomeRevision.id,
    });

    const { studentId } = student;

    // 승인, 사후 승인일 때 detail = null
    const detail =
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.Accepted ||
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.LateAccepted
        ? null
        : (body.detail ?? null);

    const budgetProposalIncomeDocumentReviewCreateDto = {
      ...body,
      detail,
      student: { id: studentId },
    };

    // 생성
    const [newBudgetProposalIncomeDocumentReview] =
      await this.budgetProposalIncomeDocumentReviewRepository.create(
        budgetProposalIncomeDocumentReviewCreateDto,
      );
    return {
      budgetProposalIncomeDocumentReview: newBudgetProposalIncomeDocumentReview,
    };
  }

  async createBudgetProposalExpenseDocumentReview(student, body) {
    const existing = await this.budgetProposalExpenseRevisionRepository.find({
      id: body.budgetProposalExpenseRevision.id,
    });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetProposalExpenseRevision does not exist.",
      );
    }

    // 동일 revisionId의 documentReview을 soft delete
    await this.budgetProposalExpenseDocumentReviewRepository.delete({
      budgetProposalExpenseRevisionId: body.budgetProposalExpenseRevision.id,
    });

    const { studentId } = student;

    // 승인, 사후 승인일 때 detail = null
    const detail =
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.Accepted ||
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.LateAccepted
        ? null
        : (body.detail ?? null);

    const budgetProposalExpenseDocumentReviewCreateDto = {
      ...body,
      detail,
      student: { id: studentId },
    };

    // 생성
    const [newBudgetProposalExpenseDocumentReview] =
      await this.budgetProposalExpenseDocumentReviewRepository.create(
        budgetProposalExpenseDocumentReviewCreateDto,
      );
    return {
      budgetProposalExpenseDocumentReview:
        newBudgetProposalExpenseDocumentReview,
    };
  }

  async readBudgetProposalIncomeDocumentReview(param) {
    const review = await this.budgetProposalIncomeDocumentReviewRepository.find(
      {
        budgetProposalIncomeRevisionId: param.budgetProposalIncomeRevisionId,
      },
    );

    return { budgetProposalIncomeDocumentReview: review };
  }

  async readBudgetProposalExpenseDocumentReview(param) {
    const review =
      await this.budgetProposalExpenseDocumentReviewRepository.find({
        budgetProposalExpenseRevisionId: param.budgetProposalExpenseRevisionId,
      });

    return { budgetProposalExpenseDocumentReview: review };
  }

  async deleteBudgetProposalIncomeDocumentReview(param) {
    const existing =
      await this.budgetProposalIncomeDocumentReviewRepository.find({
        id: param.budgetProposalIncomeDocumentReviewId,
      });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetProposalIncomeDocumentReview does not exist.",
      );
    }

    await this.budgetProposalIncomeDocumentReviewRepository.delete({
      id: param.budgetProposalIncomeDocumentReviewId,
    });
  }

  async deleteBudgetProposalExpenseDocumentReview(param) {
    const existing =
      await this.budgetProposalExpenseDocumentReviewRepository.find({
        id: param.budgetProposalExpenseDocumentReviewId,
      });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetProposalExpenseDocumentReview does not exist.",
      );
    }

    await this.budgetProposalExpenseDocumentReviewRepository.delete({
      id: param.budgetProposalExpenseDocumentReviewId,
    });
  }
}
