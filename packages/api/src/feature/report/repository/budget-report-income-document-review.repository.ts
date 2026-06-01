import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetReportIncomeDocumentReview } from "@sparcs-students/api/drizzle/schema/budget-report.schema";
import {
  IBudgetReportIncomeDocumentReviewCreate,
  MBudgetReportIncomeDocumentReview,
} from "@sparcs-students/api/feature/report/model/budget-report-income-document-review.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetReportIncomeDocumentReviewQuery = {
  budgetReportIncomeRevisionId: number;
  studentId: number;
};

type BudgetReportIncomeDocumentReviewOrderByKeys = "id";
type BudgetReportIncomeDocumentReviewQuerySupport = EmptyObject;

type BudgetReportIncomeDocumentReviewTable =
  typeof BudgetReportIncomeDocumentReview;
type BudgetReportIncomeDocumentReviewDbSelect =
  InferSelectModel<BudgetReportIncomeDocumentReviewTable>;
type BudgetReportIncomeDocumentReviewDbUpdate =
  Partial<BudgetReportIncomeDocumentReviewDbSelect>;
type BudgetReportIncomeDocumentReviewDbInsert =
  InferInsertModel<BudgetReportIncomeDocumentReviewTable>;

type BudgetReportIncomeDocumentReviewFieldMapKeys = BaseTableFieldMapKeys<
  BudgetReportIncomeDocumentReviewQuery,
  BudgetReportIncomeDocumentReviewOrderByKeys,
  BudgetReportIncomeDocumentReviewQuerySupport
>;

export type BudgetReportIncomeDocumentReviewRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetReportIncomeDocumentReviewQuery,
    BudgetReportIncomeDocumentReviewOrderByKeys
  >;
export type BudgetReportIncomeDocumentReviewRepositoryQuery =
  BaseRepositoryQuery<BudgetReportIncomeDocumentReviewQuery>;

@Injectable()
export class BudgetReportIncomeDocumentReviewRepository extends BaseSingleTableRepository<
  MBudgetReportIncomeDocumentReview,
  IBudgetReportIncomeDocumentReviewCreate,
  BudgetReportIncomeDocumentReviewTable,
  BudgetReportIncomeDocumentReviewQuery,
  BudgetReportIncomeDocumentReviewOrderByKeys,
  BudgetReportIncomeDocumentReviewQuerySupport
> {
  constructor() {
    super(BudgetReportIncomeDocumentReview, MBudgetReportIncomeDocumentReview);
  }

  protected dbToModelMapping(
    result: BudgetReportIncomeDocumentReviewDbSelect,
  ): MBudgetReportIncomeDocumentReview {
    return new MBudgetReportIncomeDocumentReview({
      id: result.id,
      budgetReportIncomeRevision: {
        id: result.budgetReportIncomeRevisionId,
      },
      student: { id: result.studentId },
      documentReviewStatusEnum: result.documentReviewStatusEnum,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(
    model: MBudgetReportIncomeDocumentReview,
  ): BudgetReportIncomeDocumentReviewDbUpdate {
    return {
      id: model.id,
      budgetReportIncomeRevisionId: model.budgetReportIncomeRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected createToDBMapping(
    model: IBudgetReportIncomeDocumentReviewCreate,
  ): BudgetReportIncomeDocumentReviewDbInsert {
    return {
      budgetReportIncomeRevisionId: model.budgetReportIncomeRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: BudgetReportIncomeDocumentReviewFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetReportIncomeDocumentReviewFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetReportIncomeDocumentReview,
      budgetReportIncomeRevisionId: BudgetReportIncomeDocumentReview,
      studentId: BudgetReportIncomeDocumentReview,
    };
    if (!(field in fieldMappings)) {
      return undefined;
    }
    return fieldMappings[field];
  }
}
