import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetReportExpense } from "@sparcs-students/api/drizzle/schema/budget-report.schema";
import {
  IBudgetReportExpenseCreate,
  MBudgetReportExpense,
} from "@sparcs-students/api/feature/report/model/budget-report-expense.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetReportExpenseQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type BudgetReportExpenseOrderByKeys = "id";
type BudgetReportExpenseQuerySupport = EmptyObject; // Query Support 용

type BudgetReportExpenseTable = typeof BudgetReportExpense;
type BudgetReportExpenseDbSelect = InferSelectModel<BudgetReportExpenseTable>;
type BudgetReportExpenseDbUpdate = Partial<BudgetReportExpenseDbSelect>;
type BudgetReportExpenseDbInsert = InferInsertModel<BudgetReportExpenseTable>;

type BudgetReportExpenseFieldMapKeys = BaseTableFieldMapKeys<
  BudgetReportExpenseQuery,
  BudgetReportExpenseOrderByKeys,
  BudgetReportExpenseQuerySupport
>;

export type BudgetReportExpenseRepositoryFindQuery = BaseRepositoryFindQuery<
  BudgetReportExpenseQuery,
  BudgetReportExpenseOrderByKeys
>;
export type BudgetReportExpenseRepositoryQuery =
  BaseRepositoryQuery<BudgetReportExpenseQuery>;

@Injectable()
export class BudgetReportExpenseRepository extends BaseSingleTableRepository<
  MBudgetReportExpense,
  IBudgetReportExpenseCreate,
  BudgetReportExpenseTable,
  BudgetReportExpenseQuery,
  BudgetReportExpenseOrderByKeys,
  BudgetReportExpenseQuerySupport
> {
  constructor() {
    super(BudgetReportExpense, MBudgetReportExpense);
  }

  protected dbToModelMapping(
    result: BudgetReportExpenseDbSelect,
  ): MBudgetReportExpense {
    return new MBudgetReportExpense({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(
    model: MBudgetReportExpense,
  ): BudgetReportExpenseDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IBudgetReportExpenseCreate,
  ): BudgetReportExpenseDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: BudgetReportExpenseFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetReportExpenseFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetReportExpense,
      organizationId: BudgetReportExpense,
      semesterId: BudgetReportExpense,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
