import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetReportIncome } from "@sparcs-students/api/drizzle/schema/budget-report.schema";
import {
  IBudgetReportIncomeCreate,
  MBudgetReportIncome,
} from "@sparcs-students/api/feature/report/model/budget-report-income.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetReportIncomeQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
  projectReportId: number;
};

type BudgetReportIncomeOrderByKeys = "id";
type BudgetReportIncomeQuerySupport = EmptyObject; // Query Support 용

type BudgetReportIncomeTable = typeof BudgetReportIncome;
type BudgetReportIncomeDbSelect = InferSelectModel<BudgetReportIncomeTable>;
type BudgetReportIncomeDbUpdate = Partial<BudgetReportIncomeDbSelect>;
type BudgetReportIncomeDbInsert = InferInsertModel<BudgetReportIncomeTable>;

type BudgetReportIncomeFieldMapKeys = BaseTableFieldMapKeys<
  BudgetReportIncomeQuery,
  BudgetReportIncomeOrderByKeys,
  BudgetReportIncomeQuerySupport
>;

export type BudgetReportIncomeRepositoryFindQuery = BaseRepositoryFindQuery<
  BudgetReportIncomeQuery,
  BudgetReportIncomeOrderByKeys
>;
export type BudgetReportIncomeRepositoryQuery =
  BaseRepositoryQuery<BudgetReportIncomeQuery>;

@Injectable()
export class BudgetReportIncomeRepository extends BaseSingleTableRepository<
  MBudgetReportIncome,
  IBudgetReportIncomeCreate,
  BudgetReportIncomeTable,
  BudgetReportIncomeQuery,
  BudgetReportIncomeOrderByKeys,
  BudgetReportIncomeQuerySupport
> {
  constructor() {
    super(BudgetReportIncome, MBudgetReportIncome);
  }

  protected dbToModelMapping(
    result: BudgetReportIncomeDbSelect,
  ): MBudgetReportIncome {
    return new MBudgetReportIncome({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(
    model: MBudgetReportIncome,
  ): BudgetReportIncomeDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IBudgetReportIncomeCreate,
  ): BudgetReportIncomeDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: BudgetReportIncomeFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetReportIncomeFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetReportIncome,
      organizationId: BudgetReportIncome,
      semesterId: BudgetReportIncome,
      projectReportId: BudgetReportIncome,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
