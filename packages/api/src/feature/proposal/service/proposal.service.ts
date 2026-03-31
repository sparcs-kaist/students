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
import { OrderByTypeEnum } from "@sparcs-students/api/common/enums";
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

    // const orgId = budgetIncome.organization.id;
    // const prevSemesterId = budgetIncome.semester.id - 1;

    // const [prevReport] = await this.budgetReportIncomeRepository.find({
    //   organizationId: orgId as unknown,
    //   semesterId: prevSemesterId as unknown,
    // });

    const budgetProposalIncomeRevisionCreateDto = {
      ...body,
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

    const [budgetProposalIncomeRevision] =
      await this.budgetProposalIncomeRevisionRepository.find({
        id: body.id,
      });
    const budgetProposalIncomeId =
      budgetProposalIncomeRevision.budgetProposalIncome.id;

    const [budgetProposalIncome] =
      await this.budgetProposalIncomeRepository.find({
        id: budgetProposalIncomeId,
      } as any);
    if (!budgetProposalIncome) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetProposalIncome.organization.id);

    const [target] = await this.budgetProposalIncomeRevisionRepository.find({
      id: body.id,
    });
    if (!target) {
      throw new NotFoundException("No Budget Proposal Income Exists");
    }

    // revision이 제출 상태라면 새 revision 생성. 이외에는 수정.
    const newBudgetProposalIncome = await (target.submittedAt !== null
      ? this.budgetProposalIncomeRevisionRepository.create({
          budgetProposalIncome: { id: budgetProposalIncome.id },
          budgetDomainEnum: body.budgetDomainEnum ?? target.budgetDomainEnum,
          budgetDivisionIncomeEnum:
            body.budgetDivisionIncomeEnum ?? target.budgetDivisionIncomeEnum,
          name: body.name ?? target.name,
          amount: body.amount ?? target.amount,
          detail: body.detail ?? target.detail,
          code: body.code ?? target.code,
        })
      : this.budgetProposalIncomeRevisionRepository.patch(
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

    return { budgetProposalIncomeRevision: newBudgetProposalIncome };
  }

  async submitBudgetProposalIncomeRevision(student, body) {
    const { studentId } = student;

    const [budgetProposalIncomeRevision] =
      await this.budgetProposalIncomeRevisionRepository.find({
        id: body.budgetProposalIncomeRevisionId,
      });
    if (!budgetProposalIncomeRevision) {
      throw new NotFoundException("No Budget Proposal Income Exists");
    }
    if (budgetProposalIncomeRevision.submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }

    // 단체의 매니저가 맞는지 확인
    const budgetProposalIncomeId =
      budgetProposalIncomeRevision.budgetProposalIncome.id;
    const [budgetProposalIncome] =
      await this.budgetProposalIncomeRepository.find({
        id: budgetProposalIncomeId,
      } as any);
    if (!budgetProposalIncome) {
      throw new NotFoundException("BudgetProposalIncome does not exist.");
    }
    await this.checkManager(studentId, budgetProposalIncome.organization.id);

    // 제출
    const newBudgetProposalIncome =
      await this.budgetProposalIncomeRevisionRepository.patch(
        { id: body.budgetProposalIncomeRevisionId },
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

    // const orgId = budgetExpense.organization.id;
    // const prevSemesterId = budgetExpense.semester.id - 1;

    // const [prevReport] = await this.budgetReportExpenseRepository.find({
    //   organizationId: orgId as unknown,
    //   semesterId: prevSemesterId as unknown,
    // });

    const budgetProposalExpenseRevisionCreateDto = {
      ...body,
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
    const [budgetProposalExpenseRevision] =
      await this.budgetProposalExpenseRevisionRepository.find({
        id: body.id,
      });
    const budgetProposalExpenseId =
      budgetProposalExpenseRevision.budgetProposalExpense.id;

    const [budgetProposalExpense] =
      await this.budgetProposalExpenseRepository.find({
        id: budgetProposalExpenseId,
      } as any);
    if (!budgetProposalExpense) {
      throw new NotFoundException("BudgetProposalExpense does not exist.");
    }
    await this.checkManager(studentId, budgetProposalExpense.organization.id);

    const [target] = await this.budgetProposalExpenseRevisionRepository.find({
      id: body.id,
    });
    if (!target) {
      throw new NotFoundException("No Budget Proposal Expense Exists");
    }

    // revision이 제출 상태라면 새 revision 생성. 이외에는 수정.
    const newBudgetProposalExpense = await (target.submittedAt !== null
      ? this.budgetProposalExpenseRevisionRepository.create({
          budgetProposalExpense: { id: budgetProposalExpense.id },
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
      : this.budgetProposalExpenseRevisionRepository.patch(
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
      budgetProposalExpenseRevision: newBudgetProposalExpense,
    };
  }

  async submitBudgetProposalExpenseRevision(student, body) {
    const { studentId } = student;

    const [budgetProposalExpenseRevision] =
      await this.budgetProposalExpenseRevisionRepository.find({
        id: body.budgetProposalExpenseRevisionId,
      });
    if (!budgetProposalExpenseRevision) {
      throw new NotFoundException("No Budget Proposal Expense Exists");
    }
    if (budgetProposalExpenseRevision.submittedAt !== null) {
      throw new NotFoundException("Already Submitted");
    }

    // 단체의 매니저가 맞는지 확인
    const budgetProposalExpenseId =
      budgetProposalExpenseRevision.budgetProposalExpense.id;
    const [budgetProposalExpense] =
      await this.budgetProposalExpenseRepository.find({
        id: budgetProposalExpenseId,
      } as any);
    if (!budgetProposalExpense) {
      throw new NotFoundException("BudgetProposalExpense does not exist.");
    }
    await this.checkManager(studentId, budgetProposalExpense.organization.id);

    // 제출
    const newBudgetProposalExpense =
      await this.budgetProposalExpenseRevisionRepository.patch(
        { id: body.budgetProposalExpenseRevisionId },
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

  async getRecentBudgetProposalIncome(query) {
    const [budgetProposalIncome] =
      await this.budgetProposalIncomeRepository.find({
        organizationId: query.organization,
        semesterId: query.semester,
      });

    if (!budgetProposalIncome) {
      return [];
    }

    const [butgetProposalIncomeRevision] =
      await this.budgetProposalIncomeRevisionRepository.find({
        budgetProposalIncomeId: budgetProposalIncome.id,
        orderBy: {
          id: OrderByTypeEnum.DESC,
        },
        pagination: { offset: 1, itemCount: 1 },
      } as any);

    return {
      budgetProposalIncomeRevision: butgetProposalIncomeRevision,
    };
  }

  async getRecentBudgetProposalExpense(query) {
    const [budgetProposalExpense] =
      await this.budgetProposalExpenseRepository.find({
        organizationId: query.organization,
        semesterId: query.semester,
      });

    if (!budgetProposalExpense) {
      return [];
    }

    const [butgetProposalExpenseRevision] =
      await this.budgetProposalExpenseRevisionRepository.find({
        budgetProposalExpenseId: budgetProposalExpense.id,
        orderBy: {
          id: OrderByTypeEnum.DESC,
        },
        pagination: { offset: 1, itemCount: 1 },
      } as any);

    return {
      budgetProposalExpenseRevision: butgetProposalExpenseRevision,
    };
  }

  async getBudgetProposalIncomeDateList(query) {
    const [income] = await this.budgetProposalIncomeRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    } as any);

    if (!income) return [];

    const rows = await this.budgetProposalIncomeRevisionRepository.find({
      budgetProposalIncomeId: income.id,
      submittedAt: { isNotNull: true },
      orderBy: { id: OrderByTypeEnum.ASC },
    } as any);

    return rows.map(r => r.submittedAt as unknown as string);
  }

  async getBudgetProposalExpenseDateList(query) {
    const [expense] = await this.budgetProposalExpenseRepository.find({
      organizationId: query.organization,
      semesterId: query.semester,
    } as any);

    if (!expense) return [];

    const rows = await this.budgetProposalExpenseRevisionRepository.find({
      budgetProposalExpenseId: expense.id,
      submittedAt: { isNotNull: true },
      orderBy: { id: OrderByTypeEnum.ASC },
    } as any);

    return rows.map(r => r.submittedAt as unknown as string);
  }

  async getBudgetProposalIncomeRevisionsByDate(query) {
    const start = new Date(`${query.date}T00:00:00.000Z`);
    const end = new Date(`${query.date}T23:59:59.999Z`);

    const Parents = await this.budgetProposalIncomeRepository.find({
      organizationId: query.organization,
    } as any);

    if (!Parents.length) {
      return { budgetProposalIncomeRevisions: [] };
    }

    const parentIds = Parents.map(p => p.id);
    const rows = await this.budgetProposalIncomeRevisionRepository.find({
      budgetProposalIncomeId: parentIds,
      submittedAt: { isNotNull: true, between: [start, end] },
      orderBy: {
        id: OrderByTypeEnum.ASC,
      },
    } as any);

    return { budgetProposalIncomeRevisions: rows };
  }

  async getBudgetProposalExpenseRevisionsByDate(query) {
    const start = new Date(`${query.date}T00:00:00.000Z`);
    const end = new Date(`${query.date}T23:59:59.999Z`);

    const Parents = await this.budgetProposalExpenseRepository.find({
      organizationId: query.organization,
    } as any);

    if (!Parents.length) {
      return { budgetProposalExpenseRevisions: [] };
    }

    const parentIds = Parents.map(p => p.id);
    const rows = await this.budgetProposalExpenseRevisionRepository.find({
      budgetProposalExpenseId: parentIds,
      submittedAt: { isNotNull: true, between: [start, end] },
      orderBy: {
        id: OrderByTypeEnum.ASC,
      },
    } as any);

    return { budgetProposalExpenseRevisions: rows };
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
