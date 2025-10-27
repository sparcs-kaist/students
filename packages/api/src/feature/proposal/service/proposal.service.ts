/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
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

  async getBudgetProposal(query) {
    return { query };
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
      throw new NotFoundException("Already exists this semester.");
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
    const [budgetIncome] = await this.budgetProposalIncomeRepository.find({
      id: body.budgetProposalIncome.id,
    });
    if (!budgetIncome) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetIncome.organization.id);

    const orgId = budgetIncome.organization.id;
    const prevSemesterId = budgetIncome.semester.id - 1;

    const [prevReport] = await this.budgetReportIncomeRepository.find({
      organizationId: orgId as unknown,
      semesterId: prevSemesterId as unknown,
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

  async updateBudgetProposalIncomeRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetProposalIncome] =
      await this.budgetProposalIncomeRepository.find({
        id: body.budgetProposalIncome.id,
      });
    if (!budgetProposalIncome) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetProposalIncome.organization.id);

    const [target] = await this.budgetProposalIncomeRevisionRepository.find({
      id: body.budgetProposalIncomeRevision.id,
    });
    if (!target) {
      throw new NotFoundException("No Budget Proposal Income Exists");
    }

    // revision이 제출 상태라면 새 revision 생성. 이외에는 수정.
    const newBudgetProposalIncome = await (target.submittedAt !== null
      ? this.budgetProposalIncomeRevisionRepository.create(
          body.budgetProposalIncomeRevision,
        )
      : this.budgetProposalIncomeRevisionRepository.patch(
          { id: body.budgetProposalIncomeRevision.id },
          body.budgetProposalIncomeRevision,
        ));

    return { budgetProposalIncomeRevision: newBudgetProposalIncome };
  }

  async submitBudgetProposalIncomeRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetProposalIncome] =
      await this.budgetProposalIncomeRepository.find({
        id: body.budgetProposalIncome.id,
      });
    if (!budgetProposalIncome) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetProposalIncome.organization.id);

    // revision 존재 확인 및 제출 여부 확인
    const existing = await this.budgetProposalIncomeRevisionRepository.find({
      id: body.id,
    });
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Proposal Income Exists");
    }
    if (existing[0].submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }

    // 제출
    const newBudgetProposalIncome =
      await this.budgetProposalIncomeRevisionRepository.patch(
        { id: body.budgetProposalIncomeRevision.id },
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetProposalIncomeRevision: newBudgetProposalIncome };
  }

  async deleteBudgetProposalIncome(student, query) {
    const [existing] = await this.budgetProposalIncomeRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    });
    if (!existing) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }

    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetProposalIncome] =
      await this.budgetProposalIncomeRepository.find({
        id: existing.id,
      } as any);
    if (!budgetProposalIncome) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetProposalIncome.organization.id);

    // 삭제
    await this.budgetProposalIncomeRepository.delete({
      id: existing.id,
    } as any);
    await this.budgetProposalIncomeRevisionRepository.delete({
      budgetProposalIncomeId: existing.id,
    } as any);
    return {};
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
    const [budgetExpense] = await this.budgetProposalExpenseRepository.find({
      id: body.budgetProposalExpense.id,
    });
    if (!budgetExpense) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetExpense.organization.id);

    const orgId = budgetExpense.organization.id;
    const prevSemesterId = budgetExpense.semester.id - 1;

    const [prevReport] = await this.budgetReportExpenseRepository.find({
      organizationId: orgId as unknown,
      semesterId: prevSemesterId as unknown,
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

  async updateBudgetProposalExpenseRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetExpense] = await this.budgetProposalExpenseRepository.find({
      id: body.budgetProposalExpense.id,
    });
    if (!budgetExpense) {
      throw new NotFoundException("BudgetProposalExpense does not exist.");
    }
    await this.checkManager(studentId, budgetExpense.organization.id);

    const [target] = await this.budgetProposalExpenseRevisionRepository.find({
      id: body.budgetProposalExpenseRevision.id,
    });
    if (!target) {
      throw new NotFoundException("No Budget Proposal Expense Exists");
    }

    // revision이 제출 상태라면 새 revision 생성. 이외에는 수정.
    const newBudgetProposalExpense = await (target.submittedAt !== null
      ? this.budgetProposalExpenseRevisionRepository.create(
          body.budgetProposalExpenseRevision,
        )
      : this.budgetProposalExpenseRevisionRepository.patch(
          { id: body.budgetProposalExpenseRevision.id },
          body.budgetProposalExpenseRevision,
        ));

    return {
      budgetProposalExpenseRevision: newBudgetProposalExpense,
    };
  }

  async submitBudgetProposalExpenseRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetProposalExpense] =
      await this.budgetProposalExpenseRepository.find({
        id: body.budgetProposalExpense.id,
      });
    if (!budgetProposalExpense) {
      throw new NotFoundException("BudgetProposalExpense does not exist.");
    }
    await this.checkManager(studentId, budgetProposalExpense.organization.id);

    // revision 존재 확인 및 제출 여부 확인
    const existing = await this.budgetProposalExpenseRevisionRepository.find({
      id: body.id,
    });
    if (existing.length === 0) {
      throw new NotFoundException("No Budget Proposal Expense Exists");
    }
    if (existing[0].submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }

    // 제출
    const newBudgetProposalExpense =
      await this.budgetProposalExpenseRevisionRepository.patch(
        { id: body.budgetProposalExpenseRevision.id },
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetProposalExpenseRevision: newBudgetProposalExpense };
  }

  async deleteBudgetProposalExpense(student, query) {
    const [existing] = await this.budgetProposalExpenseRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    });
    if (!existing) {
      throw new NotFoundException("BudgetProposalExpense does not exist.");
    }

    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetProposalExpense] =
      await this.budgetProposalExpenseRepository.find({
        id: existing.id,
      } as any);
    if (!budgetProposalExpense) {
      throw new NotFoundException("BudgetProposalExpense does not exist.");
    }
    await this.checkManager(studentId, budgetProposalExpense.organization.id);

    // 삭제
    await this.budgetProposalExpenseRepository.delete({
      id: existing.id,
    } as any);
    await this.budgetProposalExpenseRevisionRepository.delete({
      budgetProposalExpenseId: existing.id,
    } as any);
    return {};
  }

  // 하단은 staff 서비스

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
