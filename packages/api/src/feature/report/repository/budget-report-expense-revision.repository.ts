import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetReportExpenseRevision } from "@sparcs-students/api/drizzle/schema/budget-report.schema";
import {
  IBudgetReportExpenseRevisionCreate,
  MBudgetReportExpenseRevision,
} from "@sparcs-students/api/feature/report/model/budget-report-expense-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetReportExpenseRevisionQuery = {
  // id: number; // id 는 기본 내장
  budgetReportExpenseId: number;
  code: number;
};

type BudgetReportExpenseRevisionOrderByKeys = "id";
type BudgetReportExpenseRevisionQuerySupport = EmptyObject; // Query Support 용

type BudgetReportExpenseRevisionTable = typeof BudgetReportExpenseRevision;
type BudgetReportExpenseRevisionDbSelect =
  InferSelectModel<BudgetReportExpenseRevisionTable>;
type BudgetReportExpenseRevisionDbUpdate =
  Partial<BudgetReportExpenseRevisionDbSelect>;
type BudgetReportExpenseRevisionDbInsert =
  InferInsertModel<BudgetReportExpenseRevisionTable>;

type BudgetReportExpenseRevisionFieldMapKeys = BaseTableFieldMapKeys<
  BudgetReportExpenseRevisionQuery,
  BudgetReportExpenseRevisionOrderByKeys,
  BudgetReportExpenseRevisionQuerySupport
>;

export type BudgetReportExpenseRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetReportExpenseRevisionQuery,
    BudgetReportExpenseRevisionOrderByKeys
  >;
export type BudgetReportExpenseRevisionRepositoryQuery =
  BaseRepositoryQuery<BudgetReportExpenseRevisionQuery>;

@Injectable()
export class BudgetReportExpenseRevisionRepository extends BaseSingleTableRepository<
  MBudgetReportExpenseRevision,
  IBudgetReportExpenseRevisionCreate,
  BudgetReportExpenseRevisionTable,
  BudgetReportExpenseRevisionQuery,
  BudgetReportExpenseRevisionOrderByKeys,
  BudgetReportExpenseRevisionQuerySupport
> {
  constructor() {
    super(BudgetReportExpenseRevision, MBudgetReportExpenseRevision);
  }

  protected dbToModelMapping(
    result: BudgetReportExpenseRevisionDbSelect,
  ): MBudgetReportExpenseRevision {
    return new MBudgetReportExpenseRevision({
      id: result.id,
      budgetReportExpense: { id: result.budgetReportExpenseId },
      budgetDomainEnum: result.budgetDomainEnum,
      budgetDivisionExpenseEnum: result.budgetDivisionExpenseEnum,
      budgetClassExpenseEnum: result.budgetClassExpenseEnum,
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
    model: MBudgetReportExpenseRevision,
  ): BudgetReportExpenseRevisionDbUpdate {
    return {
      id: model.id,
      budgetReportExpenseId: model.budgetReportExpense.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionExpenseEnum: model.budgetDivisionExpenseEnum,
      budgetClassExpenseEnum: model.budgetClassExpenseEnum,
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
    model: IBudgetReportExpenseRevisionCreate,
  ): BudgetReportExpenseRevisionDbInsert {
    return {
      budgetReportExpenseId: model.budgetReportExpense.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionExpenseEnum: model.budgetDivisionExpenseEnum,
      budgetClassExpenseEnum: model.budgetClassExpenseEnum,
      name: model.name,
      amount: model.amount,
      detail: model.detail,
      code: model.code,
    };
  }

  protected fieldMap(
    field: BudgetReportExpenseRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetReportExpenseRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetReportExpenseRevision,
      budgetReportExpenseId: BudgetReportExpenseRevision,
      code: BudgetReportExpenseRevision,
      submittedAt: BudgetReportExpenseRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
