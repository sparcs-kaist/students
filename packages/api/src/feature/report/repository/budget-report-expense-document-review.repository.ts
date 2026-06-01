import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetReportExpenseDocumentReview } from "@sparcs-students/api/drizzle/schema/budget-report.schema";
import {
  IBudgetReportExpenseDocumentReviewCreate,
  MBudgetReportExpenseDocumentReview,
} from "@sparcs-students/api/feature/report/model/budget-report-expense-document-review.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetReportExpenseDocumentReviewQuery = {
  budgetReportExpenseRevisionId: number;
  studentId: number;
};

type BudgetReportExpenseDocumentReviewOrderByKeys = "id";
type BudgetReportExpenseDocumentReviewQuerySupport = EmptyObject;

type BudgetReportExpenseDocumentReviewTable =
  typeof BudgetReportExpenseDocumentReview;
type BudgetReportExpenseDocumentReviewDbSelect =
  InferSelectModel<BudgetReportExpenseDocumentReviewTable>;
type BudgetReportExpenseDocumentReviewDbUpdate =
  Partial<BudgetReportExpenseDocumentReviewDbSelect>;
type BudgetReportExpenseDocumentReviewDbInsert =
  InferInsertModel<BudgetReportExpenseDocumentReviewTable>;

type BudgetReportExpenseDocumentReviewFieldMapKeys = BaseTableFieldMapKeys<
  BudgetReportExpenseDocumentReviewQuery,
  BudgetReportExpenseDocumentReviewOrderByKeys,
  BudgetReportExpenseDocumentReviewQuerySupport
>;

export type BudgetReportExpenseDocumentReviewRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetReportExpenseDocumentReviewQuery,
    BudgetReportExpenseDocumentReviewOrderByKeys
  >;
export type BudgetReportExpenseDocumentReviewRepositoryQuery =
  BaseRepositoryQuery<BudgetReportExpenseDocumentReviewQuery>;

@Injectable()
export class BudgetReportExpenseDocumentReviewRepository extends BaseSingleTableRepository<
  MBudgetReportExpenseDocumentReview,
  IBudgetReportExpenseDocumentReviewCreate,
  BudgetReportExpenseDocumentReviewTable,
  BudgetReportExpenseDocumentReviewQuery,
  BudgetReportExpenseDocumentReviewOrderByKeys,
  BudgetReportExpenseDocumentReviewQuerySupport
> {
  constructor() {
    super(
      BudgetReportExpenseDocumentReview,
      MBudgetReportExpenseDocumentReview,
    );
  }

  protected dbToModelMapping(
    result: BudgetReportExpenseDocumentReviewDbSelect,
  ): MBudgetReportExpenseDocumentReview {
    return new MBudgetReportExpenseDocumentReview({
      id: result.id,
      budgetReportExpenseRevision: {
        id: result.budgetReportExpenseRevisionId,
      },
      student: { id: result.studentId },
      documentReviewStatusEnum: result.documentReviewStatusEnum,
      detail: result.detail,
    });
  }

  protected modelToDBMapping(
    model: MBudgetReportExpenseDocumentReview,
  ): BudgetReportExpenseDocumentReviewDbUpdate {
    return {
      id: model.id,
      budgetReportExpenseRevisionId: model.budgetReportExpenseRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected createToDBMapping(
    model: IBudgetReportExpenseDocumentReviewCreate,
  ): BudgetReportExpenseDocumentReviewDbInsert {
    return {
      budgetReportExpenseRevisionId: model.budgetReportExpenseRevision.id,
      studentId: model.student.id,
      documentReviewStatusEnum: model.documentReviewStatusEnum,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: BudgetReportExpenseDocumentReviewFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetReportExpenseDocumentReviewFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetReportExpenseDocumentReview,
      budgetReportExpenseRevisionId: BudgetReportExpenseDocumentReview,
      studentId: BudgetReportExpenseDocumentReview,
    };
    if (!(field in fieldMappings)) {
      return undefined;
    }
    return fieldMappings[field];
  }
}
