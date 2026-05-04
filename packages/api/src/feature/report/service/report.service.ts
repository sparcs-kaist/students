/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { OrganizationManagerRepository } from "@sparcs-students/api/feature/organization/repository/organization.manager.repository";
import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";
import { OrderByTypeEnum } from "@sparcs-students/api/common/enums";
import { BudgetReportIncomeRepository } from "../repository/budget-report-income.repository";
import { BudgetReportIncomeRevisionRepository } from "../repository/budget-report-income-revision.repository";
import { BudgetReportExpenseRepository } from "../repository/budget-report-expense.repository";
import { BudgetReportExpenseRevisionRepository } from "../repository/budget-report-expense-revision.repository";
import { BudgetReportIncomeDocumentReviewRepository } from "../repository/budget-report-income-document-review.repository";
import { BudgetReportExpenseDocumentReviewRepository } from "../repository/budget-report-expense-document-review.repository";

@Injectable()
export class ReportService {
  constructor(
    private readonly budgetReportIncomeRepository: BudgetReportIncomeRepository,
    private readonly budgetReportIncomeRevisionRepository: BudgetReportIncomeRevisionRepository,
    private readonly budgetReportExpenseRepository: BudgetReportExpenseRepository,
    private readonly budgetReportExpenseRevisionRepository: BudgetReportExpenseRevisionRepository,
    private readonly organizationManagerRepository: OrganizationManagerRepository,
    private readonly budgetReportIncomeDocumentReviewRepository: BudgetReportIncomeDocumentReviewRepository,
    private readonly budgetReportExpenseDocumentReviewRepository: BudgetReportExpenseDocumentReviewRepository,
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

  async createBudgetReportIncome(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    await this.checkManager(studentId, body.organization.id);

    // semester 중복 확인
    const existing = await this.budgetReportIncomeRepository.find({
      organizationId: body.organization.id,
      semesterId: body.semester.id,
    });
    if (existing.length > 0) {
      throw new NotFoundException("Already exists this semester.");
    }

    // 생성
    const [newBudgetReportIncome] =
      await this.budgetReportIncomeRepository.create(body);
    return {
      budgetReportIncome: newBudgetReportIncome,
    };
  }

  async createBudgetReportIncomeRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetIncome] = await this.budgetReportIncomeRepository.find({
      id: body.budgetReportIncome.id,
    });
    if (!budgetIncome) {
      throw new NotFoundException("BudgetReportIncome does not exist.");
    }
    await this.checkManager(studentId, budgetIncome.organization.id);

    // 생성
    const [newBudgetReportIncomeRevision] =
      await this.budgetReportIncomeRevisionRepository.create(body);
    return {
      budgetReportIncomeRevision: newBudgetReportIncomeRevision,
    };
  }

  async updateBudgetReportIncomeRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;

    const [budgetReportIncomeRevision] =
      await this.budgetReportIncomeRevisionRepository.find({
        id: body.id,
      });
    const budgetReportIncomeId =
      budgetReportIncomeRevision.budgetReportIncome.id;

    const [budgetReportIncome] = await this.budgetReportIncomeRepository.find({
      id: budgetReportIncomeId,
    } as any);
    if (!budgetReportIncome) {
      throw new NotFoundException("BudgetReportIncome does not exist.");
    }
    await this.checkManager(studentId, budgetReportIncome.organization.id);

    const [target] = await this.budgetReportIncomeRevisionRepository.find({
      id: body.id,
    });
    if (!target) {
      throw new NotFoundException("No Budget Report Income Exists");
    }

    // revision이 제출 상태라면 새 revision 생성. 이외에는 수정.
    const newBudgetReportIncome = await (target.submittedAt !== null
      ? this.budgetReportIncomeRevisionRepository.create({
          budgetReportIncome: { id: budgetReportIncome.id },
          budgetDomainEnum: body.budgetDomainEnum ?? target.budgetDomainEnum,
          budgetDivisionIncomeEnum:
            body.budgetDivisionIncomeEnum ?? target.budgetDivisionIncomeEnum,
          name: body.name ?? target.name,
          amount: body.amount ?? target.amount,
          detail: body.detail ?? target.detail,
          code: body.code ?? target.code,
        })
      : this.budgetReportIncomeRevisionRepository.patch(
          { id: body.id },
          model => {
            const partial: any = {};
            if (body.budgetDomainEnum !== undefined) {
              partial.budgetDomainEnum = body.budgetDomainEnum;
            }
            if (body.budgetDivisionIncomeEnum !== undefined) {
              partial.budgetDivisionIncomeEnum = body.budgetDivisionIncomeEnum;
            }
            if (body.name !== undefined) partial.name = body.name;
            if (body.amount !== undefined) partial.amount = body.amount;
            if (body.detail !== undefined) partial.detail = body.detail;
            if (body.code !== undefined) partial.code = body.code;
            return {
              ...model,
              ...partial,
              id: model.id,
            };
          },
        ));

    return { budgetReportIncomeRevision: newBudgetReportIncome };
  }

  async submitBudgetReportIncomeRevision(student, body) {
    const { studentId } = student;

    const [budgetReportIncomeRevision] =
      await this.budgetReportIncomeRevisionRepository.find({
        id: body.budgetReportIncomeRevisionId,
      });
    if (!budgetReportIncomeRevision) {
      throw new NotFoundException("No Budget Report Income Exists");
    }
    if (budgetReportIncomeRevision.submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }

    // 단체의 매니저가 맞는지 확인
    const budgetReportIncomeId =
      budgetReportIncomeRevision.budgetReportIncome.id;
    const [budgetReportIncome] = await this.budgetReportIncomeRepository.find({
      id: budgetReportIncomeId,
    } as any);
    if (!budgetReportIncome) {
      throw new NotFoundException("BudgetReportIncome does not exist.");
    }
    await this.checkManager(studentId, budgetReportIncome.organization.id);

    // 제출
    const newBudgetReportIncome =
      await this.budgetReportIncomeRevisionRepository.patch(
        { id: body.budgetReportIncomeRevisionId },
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetReportIncomeRevision: newBudgetReportIncome };
  }

  async deleteBudgetReportIncome(student, query) {
    const [existing] = await this.budgetReportIncomeRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    });
    if (!existing) {
      throw new NotFoundException("BudgetReportIncome does not exist.");
    }

    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetReportIncome] = await this.budgetReportIncomeRepository.find({
      id: existing.id,
    } as any);
    if (!budgetReportIncome) {
      throw new NotFoundException("BudgetReportIncome does not exist.");
    }
    await this.checkManager(studentId, budgetReportIncome.organization.id);

    // 삭제
    await this.budgetReportIncomeRepository.delete({
      id: existing.id,
    } as any);
    await this.budgetReportIncomeRevisionRepository.delete({
      budgetReportIncomeId: existing.id,
    } as any);
    return {};
  }

  async createBudgetReportExpense(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    await this.checkManager(studentId, body.organization.id);

    // semester 중복 확인
    const existing = await this.budgetReportExpenseRepository.find({
      organizationId: body.organization.id,
      semesterId: body.semester.id,
    });
    if (existing.length > 0) {
      throw new ConflictException("Already exists this semester.");
    }

    // 생성
    const [newBudgetReportExpense] =
      await this.budgetReportExpenseRepository.create(body);
    return {
      budgetReportExpense: newBudgetReportExpense,
    };
  }

  async createBudgetReportExpenseRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetExpense] = await this.budgetReportExpenseRepository.find({
      id: body.budgetReportExpense.id,
    });
    if (!budgetExpense) {
      throw new NotFoundException("BudgetReportIncome does not exist.");
    }
    await this.checkManager(studentId, budgetExpense.organization.id);

    // 생성
    const [newBudgetReportExpenseRevision] =
      await this.budgetReportExpenseRevisionRepository.create(body);
    return {
      budgetReportExpenseRevision: newBudgetReportExpenseRevision,
    };
  }

  async updateBudgetReportExpenseRevision(student, body) {
    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetReportExpenseRevision] =
      await this.budgetReportExpenseRevisionRepository.find({
        id: body.id,
      });
    const budgetReportExpenseId =
      budgetReportExpenseRevision.budgetReportExpense.id;

    const [budgetReportExpense] = await this.budgetReportExpenseRepository.find(
      {
        id: budgetReportExpenseId,
      } as any,
    );
    if (!budgetReportExpense) {
      throw new NotFoundException("BudgetReportExpense does not exist.");
    }
    await this.checkManager(studentId, budgetReportExpense.organization.id);

    const [target] = await this.budgetReportExpenseRevisionRepository.find({
      id: body.id,
    });
    if (!target) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }

    // revision이 제출 상태라면 새 revision 생성. 이외에는 수정.
    const newBudgetReportExpense = await (target.submittedAt !== null
      ? this.budgetReportExpenseRevisionRepository.create({
          budgetReportExpense: { id: budgetReportExpense.id },
          budgetDomainEnum: body.budgetDomainEnum ?? target.budgetDomainEnum,
          budgetDivisionExpenseEnum:
            body.budgetDivisionExpenseEnum ?? target.budgetDivisionExpenseEnum,
          budgetClassExpenseEnum:
            body.budgetClassExpenseEnum ?? target.budgetClassExpenseEnum,
          name: body.name ?? target.name,
          amount: body.amount ?? target.amount,
          detail: body.detail ?? target.detail,
          code: body.code ?? target.code,
        })
      : this.budgetReportExpenseRevisionRepository.patch(
          { id: body.id },
          model => {
            const partial: any = {};
            if (body.budgetDomainEnum !== undefined) {
              partial.budgetDomainEnum = body.budgetDomainEnum;
            }
            if (body.budgetDivisionExpenseEnum !== undefined) {
              partial.budgetDivisionExpenseEnum =
                body.budgetDivisionExpenseEnum;
            }
            if (body.budgetClassExpenseEnum !== undefined) {
              partial.budgetClassExpenseEnum = body.budgetClassExpenseEnum;
            }
            if (body.name !== undefined) partial.name = body.name;
            if (body.amount !== undefined) partial.amount = body.amount;
            if (body.detail !== undefined) partial.detail = body.detail;
            if (body.code !== undefined) partial.code = body.code;
            return {
              ...model,
              ...partial,
              id: model.id,
            };
          },
        ));

    return {
      budgetReportExpenseRevision: newBudgetReportExpense,
    };
  }

  async submitBudgetReportExpenseRevision(student, body) {
    const { studentId } = student;

    const [budgetReportExpenseRevision] =
      await this.budgetReportExpenseRevisionRepository.find({
        id: body.budgetReportExpenseRevisionId,
      });
    if (!budgetReportExpenseRevision) {
      throw new NotFoundException("No Budget Report Expense Exists");
    }
    if (budgetReportExpenseRevision.submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }

    // 단체의 매니저가 맞는지 확인
    const budgetReportExpenseId =
      budgetReportExpenseRevision.budgetReportExpense.id;
    const [budgetReportExpense] = await this.budgetReportExpenseRepository.find(
      {
        id: budgetReportExpenseId,
      } as any,
    );
    if (!budgetReportExpense) {
      throw new NotFoundException("BudgetReportExpense does not exist.");
    }
    await this.checkManager(studentId, budgetReportExpense.organization.id);

    // 제출
    const newBudgetReportExpense =
      await this.budgetReportExpenseRevisionRepository.patch(
        { id: body.budgetReportExpenseRevisionId },
        revision => {
          const temp = revision;
          temp.submittedAt = new Date();
          return temp;
        },
      );
    return { budgetReportExpenseRevision: newBudgetReportExpense };
  }

  async deleteBudgetReportExpense(student, query) {
    const [existing] = await this.budgetReportExpenseRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    });
    if (!existing) {
      throw new NotFoundException("BudgetReportExpense does not exist.");
    }

    // 단체의 매니저가 맞는지 확인
    const { studentId } = student;
    const [budgetReportExpense] = await this.budgetReportExpenseRepository.find(
      {
        id: existing.id,
      } as any,
    );
    if (!budgetReportExpense) {
      throw new NotFoundException("BudgetReportExpense does not exist.");
    }
    await this.checkManager(studentId, budgetReportExpense.organization.id);

    // 삭제
    await this.budgetReportExpenseRepository.delete({
      id: existing.id,
    } as any);
    await this.budgetReportExpenseRevisionRepository.delete({
      budgetReportExpenseId: existing.id,
    } as any);
    return {};
  }

  async getRecentBudgetReportIncome(query) {
    const [budgetReportIncome] = await this.budgetReportIncomeRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    });

    if (!budgetReportIncome) {
      return [];
    }

    const [butgetReportIncomeRevision] =
      await this.budgetReportIncomeRevisionRepository.find({
        budgetReportIncomeId: budgetReportIncome.id,
        orderBy: {
          id: OrderByTypeEnum.DESC,
        },
        pagination: { offset: 1, itemCount: 1 },
      } as any);

    return {
      budgetReportIncomeRevision: butgetReportIncomeRevision,
    };
  }

  async getRecentBudgetReportExpense(query) {
    const [budgetReportExpense] = await this.budgetReportExpenseRepository.find(
      {
        organizationId: query.organization,
        semesterId: query.semester,
      },
    );

    if (!budgetReportExpense) {
      return [];
    }

    const [butgetReportExpenseRevision] =
      await this.budgetReportExpenseRevisionRepository.find({
        budgetReportExpenseId: budgetReportExpense.id,
        orderBy: {
          id: OrderByTypeEnum.DESC,
        },
        pagination: { offset: 1, itemCount: 1 },
      } as any);

    return {
      budgetReportExpenseRevision: butgetReportExpenseRevision,
    };
  }

  async getBudgetReportIncomeDateList(query) {
    const [income] = await this.budgetReportIncomeRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    } as any);

    if (!income) return [];

    const rows = await this.budgetReportIncomeRevisionRepository.find({
      budgetReportIncomeId: income.id,
      submittedAt: { isNotNull: true },
      orderBy: { id: OrderByTypeEnum.ASC },
    } as any);

    return rows.map(r => r.submittedAt as unknown as string);
  }

  async getBudgetReportExpenseDateList(query) {
    const [expense] = await this.budgetReportExpenseRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    } as any);

    if (!expense) return [];

    const rows = await this.budgetReportExpenseRevisionRepository.find({
      budgetReportExpenseId: expense.id,
      submittedAt: { isNotNull: true },
      orderBy: { id: OrderByTypeEnum.ASC },
    } as any);

    return rows.map(r => r.submittedAt as unknown as string);
  }

  async getBudgetReportIncomeRevisionsByDate(query) {
    const start = new Date(`${query.date}T00:00:00.000Z`);
    const end = new Date(`${query.date}T23:59:59.999Z`);

    const Parents = await this.budgetReportIncomeRepository.find({
      organizationId: query.organization,
    } as any);

    if (!Parents.length) {
      return { budgetReportIncomeRevisions: [] };
    }

    const parentIds = Parents.map(p => p.id);
    const rows = await this.budgetReportIncomeRevisionRepository.find({
      budgetReportIncomeId: parentIds,
      submittedAt: { isNotNull: true, between: [start, end] },
      orderBy: {
        id: OrderByTypeEnum.ASC,
      },
    } as any);

    return { budgetReportIncomeRevisions: rows };
  }

  async getBudgetReportExpenseRevisionsByDate(query) {
    const start = new Date(`${query.date}T00:00:00.000Z`);
    const end = new Date(`${query.date}T23:59:59.999Z`);

    const Parents = await this.budgetReportExpenseRepository.find({
      organizationId: query.organization,
    } as any);

    if (!Parents.length) {
      return { budgetReportExpenseRevisions: [] };
    }

    const parentIds = Parents.map(p => p.id);
    const rows = await this.budgetReportExpenseRevisionRepository.find({
      budgetReportExpenseId: parentIds,
      submittedAt: { isNotNull: true, between: [start, end] },
      orderBy: {
        id: OrderByTypeEnum.ASC,
      },
    } as any);

    return { budgetReportExpenseRevisions: rows };
  }
  // 하단은 staff 서비스

  async createBudgetReportIncomeDocumentReview(student, body) {
    const existing = await this.budgetReportIncomeRevisionRepository.find({
      id: body.budgetReportIncomeRevision.id,
    });
    if (!existing.length) {
      throw new ConflictException("BudgetReportIncomeRevision does not exist.");
    }

    // 동일 revisionId의 documentReview을 soft delete
    await this.budgetReportIncomeDocumentReviewRepository.delete({
      budgetReportIncomeRevisionId: body.budgetReportIncomeRevision.id,
    });

    const { studentId } = student;

    // 승인, 사후 승인일 때 detail = null
    const detail =
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.Accepted ||
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.LateAccepted
        ? null
        : (body.detail ?? null);

    const budgetReportIncomeDocumentReviewCreateDto = {
      ...body,
      detail,
      student: { id: studentId },
    };

    // 생성
    const [newBudgetReportIncomeDocumentReview] =
      await this.budgetReportIncomeDocumentReviewRepository.create(
        budgetReportIncomeDocumentReviewCreateDto,
      );
    return {
      budgetReportIncomeDocumentReview: newBudgetReportIncomeDocumentReview,
    };
  }

  async createBudgetReportExpenseDocumentReview(student, body) {
    const existing = await this.budgetReportExpenseRevisionRepository.find({
      id: body.budgetReportExpenseRevision.id,
    });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetReportExpenseRevision does not exist.",
      );
    }

    // 동일 revisionId의 documentReview을 soft delete
    await this.budgetReportExpenseDocumentReviewRepository.delete({
      budgetReportExpenseRevisionId: body.budgetReportExpenseRevision.id,
    });

    const { studentId } = student;

    // 승인, 사후 승인일 때 detail = null
    const detail =
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.Accepted ||
      body.documentReviewStatusEnum === DocumentReviewStatusEnum.LateAccepted
        ? null
        : (body.detail ?? null);

    const budgetReportExpenseDocumentReviewCreateDto = {
      ...body,
      detail,
      student: { id: studentId },
    };

    // 생성
    const [newBudgetReportExpenseDocumentReview] =
      await this.budgetReportExpenseDocumentReviewRepository.create(
        budgetReportExpenseDocumentReviewCreateDto,
      );
    return {
      budgetReportExpenseDocumentReview: newBudgetReportExpenseDocumentReview,
    };
  }

  async readBudgetReportIncomeDocumentReview(param) {
    const review = await this.budgetReportIncomeDocumentReviewRepository.find({
      budgetReportIncomeRevisionId: param.budgetReportIncomeRevisionId,
    });

    return { budgetReportIncomeDocumentReview: review };
  }

  async readBudgetReportExpenseDocumentReview(param) {
    const review = await this.budgetReportExpenseDocumentReviewRepository.find({
      budgetReportExpenseRevisionId: param.budgetReportExpenseRevisionId,
    });

    return { budgetReportExpenseDocumentReview: review };
  }

  async deleteBudgetReportIncomeDocumentReview(param) {
    const existing = await this.budgetReportIncomeDocumentReviewRepository.find(
      {
        id: param.budgetReportIncomeDocumentReviewId,
      },
    );
    if (!existing.length) {
      throw new ConflictException(
        "BudgetReportIncomeDocumentReview does not exist.",
      );
    }

    await this.budgetReportIncomeDocumentReviewRepository.delete({
      id: param.budgetReportIncomeDocumentReviewId,
    });
  }

  async deleteBudgetReportExpenseDocumentReview(param) {
    const existing =
      await this.budgetReportExpenseDocumentReviewRepository.find({
        id: param.budgetReportExpenseDocumentReviewId,
      });
    if (!existing.length) {
      throw new ConflictException(
        "BudgetReportExpenseDocumentReview does not exist.",
      );
    }

    await this.budgetReportExpenseDocumentReviewRepository.delete({
      id: param.budgetReportExpenseDocumentReviewId,
    });
  }
}
