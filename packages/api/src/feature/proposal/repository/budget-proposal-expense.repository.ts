import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetProposalExpense } from "@sparcs-students/api/drizzle/schema/budget-proposal.schema";
import {
  IBudgetProposalExpenseCreate,
  MBudgetProposalExpense,
} from "@sparcs-students/api/feature/proposal/model/budget-proposal-expense.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetProposalExpenseQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type BudgetProposalExpenseOrderByKeys = "id";
type BudgetProposalExpenseQuerySupport = EmptyObject; // Query Support 용

type BudgetProposalExpenseTable = typeof BudgetProposalExpense;
type BudgetProposalExpenseDbSelect =
  InferSelectModel<BudgetProposalExpenseTable>;
type BudgetProposalExpenseDbUpdate = Partial<BudgetProposalExpenseDbSelect>;
type BudgetProposalExpenseDbInsert =
  InferInsertModel<BudgetProposalExpenseTable>;

type BudgetProposalExpenseFieldMapKeys = BaseTableFieldMapKeys<
  BudgetProposalExpenseQuery,
  BudgetProposalExpenseOrderByKeys,
  BudgetProposalExpenseQuerySupport
>;

export type BudgetProposalExpenseRepositoryFindQuery = BaseRepositoryFindQuery<
  BudgetProposalExpenseQuery,
  BudgetProposalExpenseOrderByKeys
>;
export type BudgetProposalExpenseRepositoryQuery =
  BaseRepositoryQuery<BudgetProposalExpenseQuery>;

@Injectable()
export class BudgetProposalExpenseRepository extends BaseSingleTableRepository<
  MBudgetProposalExpense,
  IBudgetProposalExpenseCreate,
  BudgetProposalExpenseTable,
  BudgetProposalExpenseQuery,
  BudgetProposalExpenseOrderByKeys,
  BudgetProposalExpenseQuerySupport
> {
  constructor() {
    super(BudgetProposalExpense, MBudgetProposalExpense);
  }

  protected dbToModelMapping(
    result: BudgetProposalExpenseDbSelect,
  ): MBudgetProposalExpense {
    return new MBudgetProposalExpense({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(
    model: MBudgetProposalExpense,
  ): BudgetProposalExpenseDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IBudgetProposalExpenseCreate,
  ): BudgetProposalExpenseDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: BudgetProposalExpenseFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetProposalExpenseFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetProposalExpense,
      organizationId: BudgetProposalExpense,
      semesterId: BudgetProposalExpense,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
