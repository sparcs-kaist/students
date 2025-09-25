import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetProposalExpenseDocumentReview } from "@sparcs-students/api/drizzle/schema/budget-proposal.schema";
import {
  IBudgetProposalExpenseDocumentReviewCreate,
  MBudgetProposalExpenseDocumentReview,
} from "@sparcs-students/api/feature/proposal/model/budget-proposal-expense-document-review.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetProposalExpenseDocumentReviewQuery = {
  budgetProposalExpenseRevisionId: number;
  studentId: number;
};

type BudgetProposalExpenseDocumentReviewOrderByKeys = "id";
type BudgetProposalExpenseDocumentReviewQuerySupport = EmptyObject;

type BudgetProposalExpenseDocumentReviewTable =
  typeof BudgetProposalExpenseDocumentReview;
type BudgetProposalExpenseDocumentReviewDbSelect =
  InferSelectModel<BudgetProposalExpenseDocumentReviewTable>;
type BudgetProposalExpenseDocumentReviewDbUpdate =
  Partial<BudgetProposalExpenseDocumentReviewDbSelect>;
type BudgetProposalExpenseDocumentReviewDbInsert =
  InferInsertModel<BudgetProposalExpenseDocumentReviewTable>;

type BudgetProposalExpenseDocumentReviewFieldMapKeys = BaseTableFieldMapKeys<
  BudgetProposalExpenseDocumentReviewQuery,
  BudgetProposalExpenseDocumentReviewOrderByKeys,
  BudgetProposalExpenseDocumentReviewQuerySupport
>;

export type BudgetProposalExpenseDocumentReviewRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetProposalExpenseDocumentReviewQuery,
    BudgetProposalExpenseDocumentReviewOrderByKeys
  >;
export type BudgetProposalExpenseDocumentReviewRepositoryQuery =
  BaseRepositoryQuery<BudgetProposalExpenseDocumentReviewQuery>;

@Injectable()
export class BudgetProposalExpenseDocumentReviewRepository extends BaseSingleTableRepository<
  MBudgetProposalExpenseDocumentReview,
  IBudgetProposalExpenseDocumentReviewCreate,
  BudgetProposalExpenseDocumentReviewTable,
  BudgetProposalExpenseDocumentReviewQuery,
  BudgetProposalExpenseDocumentReviewOrderByKeys,
  BudgetProposalExpenseDocumentReviewQuerySupport
> {
  constructor() {
    super(
      BudgetProposalExpenseDocumentReview,
      MBudgetProposalExpenseDocumentReview,
    );
  }

  protected dbToModelMapping(
    result: BudgetProposalExpenseDocumentReviewDbSelect,
  ): MBudgetProposalExpenseDocumentReview {
    return new MBudgetProposalExpenseDocumentReview({
      id: result.id,
      budgetProposalExpenseRevision: {
        id: result.budgetProposalExpenseRevisionId,
      },
      student: { id: result.studentId },
      documentReviewStatusEnum: result.documentReviewStatusEnum,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(
    model: MBudgetProposalExpenseDocumentReview,
  ): BudgetProposalExpenseDocumentReviewDbUpdate {
    return {
      id: model.id,
      budgetProposalExpenseRevisionId: model.budgetProposalExpenseRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected createToDBMapping(
    model: IBudgetProposalExpenseDocumentReviewCreate,
  ): BudgetProposalExpenseDocumentReviewDbInsert {
    return {
      budgetProposalExpenseRevisionId: model.budgetProposalExpenseRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: BudgetProposalExpenseDocumentReviewFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetProposalExpenseDocumentReviewFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetProposalExpenseDocumentReview,
      budgetProposalExpenseRevisionId: BudgetProposalExpenseDocumentReview,
      studentId: BudgetProposalExpenseDocumentReview,
    };
    if (!(field in fieldMappings)) {
      return undefined;
    }
    return fieldMappings[field];
  }
}
