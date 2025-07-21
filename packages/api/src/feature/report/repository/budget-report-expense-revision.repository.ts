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
  organizationId: number;
  semesterId: number;
  projectReportId: number;
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
      amount: result.amount,
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
      amount: model.amount,
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
      amount: model.amount,
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
      organizationId: BudgetReportExpenseRevision,
      semesterId: BudgetReportExpenseRevision,
      projectReportId: BudgetReportExpenseRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
