import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetProposalIncome } from "@sparcs-students/api/drizzle/schema/budget-proposal.schema";
import {
  IBudgetProposalIncomeCreate,
  MBudgetProposalIncome,
} from "@sparcs-students/api/feature/proposal/model/budget-proposal-income.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetProposalIncomeQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
};

type BudgetProposalIncomeOrderByKeys = "id";
type BudgetProposalIncomeQuerySupport = EmptyObject; // Query Support 용

type BudgetProposalIncomeTable = typeof BudgetProposalIncome;
type BudgetProposalIncomeDbSelect = InferSelectModel<BudgetProposalIncomeTable>;
type BudgetProposalIncomeDbUpdate = Partial<BudgetProposalIncomeDbSelect>;
type BudgetProposalIncomeDbInsert = InferInsertModel<BudgetProposalIncomeTable>;

type BudgetProposalIncomeFieldMapKeys = BaseTableFieldMapKeys<
  BudgetProposalIncomeQuery,
  BudgetProposalIncomeOrderByKeys,
  BudgetProposalIncomeQuerySupport
>;

export type BudgetProposalIncomeRepositoryFindQuery = BaseRepositoryFindQuery<
  BudgetProposalIncomeQuery,
  BudgetProposalIncomeOrderByKeys
>;
export type BudgetProposalIncomeRepositoryQuery =
  BaseRepositoryQuery<BudgetProposalIncomeQuery>;

@Injectable()
export class BudgetProposalIncomeRepository extends BaseSingleTableRepository<
  MBudgetProposalIncome,
  IBudgetProposalIncomeCreate,
  BudgetProposalIncomeTable,
  BudgetProposalIncomeQuery,
  BudgetProposalIncomeOrderByKeys,
  BudgetProposalIncomeQuerySupport
> {
  constructor() {
    super(BudgetProposalIncome, MBudgetProposalIncome);
  }

  protected dbToModelMapping(
    result: BudgetProposalIncomeDbSelect,
  ): MBudgetProposalIncome {
    return new MBudgetProposalIncome({
      id: result.id,
      organization: { id: result.organizationId },
      semester: { id: result.semesterId },
    });
  }

  protected modelToDBMapping(
    model: MBudgetProposalIncome,
  ): BudgetProposalIncomeDbUpdate {
    return {
      id: model.id,
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected createToDBMapping(
    model: IBudgetProposalIncomeCreate,
  ): BudgetProposalIncomeDbInsert {
    return {
      organizationId: model.organization.id,
      semesterId: model.semester.id,
    };
  }

  protected fieldMap(
    field: BudgetProposalIncomeFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetProposalIncomeFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetProposalIncome,
      organizationId: BudgetProposalIncome,
      semesterId: BudgetProposalIncome,
      projectProposalId: BudgetProposalIncome,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
