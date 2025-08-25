import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetProposalIncomeDocumentReview } from "@sparcs-students/api/drizzle/schema/budget-proposal.schema";
import {
  IBudgetProposalIncomeDocumentReviewCreate,
  MBudgetProposalIncomeDocumentReview,
} from "@sparcs-students/api/feature/proposal/model/budget-proposal-income-document-review.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetProposalIncomeDocumentReviewQuery = {
  budgetProposalIncomeRevisionId: number;
  studentId: number;
};

type BudgetProposalIncomeDocumentReviewOrderByKeys = "id";
type BudgetProposalIncomeDocumentReviewQuerySupport = EmptyObject;

type BudgetProposalIncomeDocumentReviewTable =
  typeof BudgetProposalIncomeDocumentReview;
type BudgetProposalIncomeDocumentReviewDbSelect =
  InferSelectModel<BudgetProposalIncomeDocumentReviewTable>;
type BudgetProposalIncomeDocumentReviewDbUpdate =
  Partial<BudgetProposalIncomeDocumentReviewDbSelect>;
type BudgetProposalIncomeDocumentReviewDbInsert =
  InferInsertModel<BudgetProposalIncomeDocumentReviewTable>;

type BudgetProposalIncomeDocumentReviewFieldMapKeys = BaseTableFieldMapKeys<
  BudgetProposalIncomeDocumentReviewQuery,
  BudgetProposalIncomeDocumentReviewOrderByKeys,
  BudgetProposalIncomeDocumentReviewQuerySupport
>;

export type BudgetProposalIncomeDocumentReviewRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetProposalIncomeDocumentReviewQuery,
    BudgetProposalIncomeDocumentReviewOrderByKeys
  >;
export type BudgetProposalIncomeDocumentReviewRepositoryQuery =
  BaseRepositoryQuery<BudgetProposalIncomeDocumentReviewQuery>;

@Injectable()
export class BudgetProposalIncomeDocumentReviewRepository extends BaseSingleTableRepository<
  MBudgetProposalIncomeDocumentReview,
  IBudgetProposalIncomeDocumentReviewCreate,
  BudgetProposalIncomeDocumentReviewTable,
  BudgetProposalIncomeDocumentReviewQuery,
  BudgetProposalIncomeDocumentReviewOrderByKeys,
  BudgetProposalIncomeDocumentReviewQuerySupport
> {
  constructor() {
    super(
      BudgetProposalIncomeDocumentReview,
      MBudgetProposalIncomeDocumentReview,
    );
  }

  protected dbToModelMapping(
    result: BudgetProposalIncomeDocumentReviewDbSelect,
  ): MBudgetProposalIncomeDocumentReview {
    return new MBudgetProposalIncomeDocumentReview({
      id: result.id,
      budgetProposalIncomeRevision: {
        id: result.budgetProposalIncomeRevisionId,
      },
      student: { id: result.studentId },
      documentReviewStatusEnum: result.documentReviewStatusEnum,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(
    model: MBudgetProposalIncomeDocumentReview,
  ): BudgetProposalIncomeDocumentReviewDbUpdate {
    return {
      id: model.id,
      budgetProposalIncomeRevisionId: model.budgetProposalIncomeRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected createToDBMapping(
    model: IBudgetProposalIncomeDocumentReviewCreate,
  ): BudgetProposalIncomeDocumentReviewDbInsert {
    return {
      budgetProposalIncomeRevisionId: model.budgetProposalIncomeRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: BudgetProposalIncomeDocumentReviewFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetProposalIncomeDocumentReviewFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetProposalIncomeDocumentReview,
      budgetProposalIncomeRevisionId: BudgetProposalIncomeDocumentReview,
      studentId: BudgetProposalIncomeDocumentReview,
    };
    if (!(field in fieldMappings)) {
      return undefined;
    }
    return fieldMappings[field];
  }
}
