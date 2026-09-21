import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetReportIncomeRevision } from "@sparcs-students/api/drizzle/schema/budget-report.schema";
import {
  IBudgetReportIncomeRevisionCreate,
  MBudgetReportIncomeRevision,
} from "@sparcs-students/api/feature/report/model/budget-report-income-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetReportIncomeRevisionQuery = {
  // id: number; // id 는 기본 내장
  budgetReportIncomeId: number;
  code: number;
};

type BudgetReportIncomeRevisionOrderByKeys = "id";
type BudgetReportIncomeRevisionQuerySupport = EmptyObject; // Query Support 용

type BudgetReportIncomeRevisionTable = typeof BudgetReportIncomeRevision;
type BudgetReportIncomeRevisionDbSelect =
  InferSelectModel<BudgetReportIncomeRevisionTable>;
type BudgetReportIncomeRevisionDbUpdate =
  Partial<BudgetReportIncomeRevisionDbSelect>;
type BudgetReportIncomeRevisionDbInsert =
  InferInsertModel<BudgetReportIncomeRevisionTable>;

type BudgetReportIncomeRevisionFieldMapKeys = BaseTableFieldMapKeys<
  BudgetReportIncomeRevisionQuery,
  BudgetReportIncomeRevisionOrderByKeys,
  BudgetReportIncomeRevisionQuerySupport
>;

export type BudgetReportIncomeRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetReportIncomeRevisionQuery,
    BudgetReportIncomeRevisionOrderByKeys
  >;
export type BudgetReportIncomeRevisionRepositoryQuery =
  BaseRepositoryQuery<BudgetReportIncomeRevisionQuery>;

@Injectable()
export class BudgetReportIncomeRevisionRepository extends BaseSingleTableRepository<
  MBudgetReportIncomeRevision,
  IBudgetReportIncomeRevisionCreate,
  BudgetReportIncomeRevisionTable,
  BudgetReportIncomeRevisionQuery,
  BudgetReportIncomeRevisionOrderByKeys,
  BudgetReportIncomeRevisionQuerySupport
> {
  constructor() {
    super(BudgetReportIncomeRevision, MBudgetReportIncomeRevision);
  }

  protected dbToModelMapping(
    result: BudgetReportIncomeRevisionDbSelect,
  ): MBudgetReportIncomeRevision {
    return new MBudgetReportIncomeRevision({
      id: result.id,
      budgetReportIncome: { id: result.budgetReportIncomeId },
      budgetDomainEnum: result.budgetDomainEnum,
      budgetDivisionIncomeEnum: result.budgetDivisionIncomeEnum,
      name: result.name,
      amount: result.amount,
      detail: result.detail,
      code: result.code,
      submittedAt: result.submittedAt,
      cogAgenda: { id: result.cogAgendaId },
      gsrcAgenda: { id: result.gsrcAgendaId },
    });
  }

  protected modelToDBMapping(
    model: MBudgetReportIncomeRevision,
  ): BudgetReportIncomeRevisionDbUpdate {
    return {
      id: model.id,
      budgetReportIncomeId: model.budgetReportIncome.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionIncomeEnum: model.budgetDivisionIncomeEnum,
      name: model.name,
      amount: model.amount,
      detail: model.detail,
      code: model.code,
      submittedAt: model.submittedAt,
      cogAgendaId: model.cogAgenda?.id,
      gsrcAgendaId: model.gsrcAgenda?.id,
    };
  }

  protected createToDBMapping(
    model: IBudgetReportIncomeRevisionCreate,
  ): BudgetReportIncomeRevisionDbInsert {
    return {
      budgetReportIncomeId: model.budgetReportIncome.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionIncomeEnum: model.budgetDivisionIncomeEnum,
      name: model.name,
      amount: model.amount,
      detail: model.detail,
      code: model.code,
    };
  }

  protected fieldMap(
    field: BudgetReportIncomeRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetReportIncomeRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetReportIncomeRevision,
      budgetReportIncomeId: BudgetReportIncomeRevision,
      code: BudgetReportIncomeRevision,
      submittedAt: BudgetReportIncomeRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
