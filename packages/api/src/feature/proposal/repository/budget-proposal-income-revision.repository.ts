import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetProposalIncomeRevision } from "@sparcs-students/api/drizzle/schema/budget-proposal.schema";
import {
  IBudgetProposalIncomeRevisionCreate,
  MBudgetProposalIncomeRevision,
} from "@sparcs-students/api/feature/proposal/model/budget-proposal-income-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetProposalIncomeRevisionQuery = {
  // id: number; // id 는 기본 내장
  organizationId: number;
  semesterId: number;
  projectProposalId: number;
};

type BudgetProposalIncomeRevisionOrderByKeys = "id";
type BudgetProposalIncomeRevisionQuerySupport = EmptyObject; // Query Support 용

type BudgetProposalIncomeRevisionTable = typeof BudgetProposalIncomeRevision;
type BudgetProposalIncomeRevisionDbSelect =
  InferSelectModel<BudgetProposalIncomeRevisionTable>;
type BudgetProposalIncomeRevisionDbUpdate =
  Partial<BudgetProposalIncomeRevisionDbSelect>;
type BudgetProposalIncomeRevisionDbInsert =
  InferInsertModel<BudgetProposalIncomeRevisionTable>;

type BudgetProposalIncomeRevisionFieldMapKeys = BaseTableFieldMapKeys<
  BudgetProposalIncomeRevisionQuery,
  BudgetProposalIncomeRevisionOrderByKeys,
  BudgetProposalIncomeRevisionQuerySupport
>;

export type BudgetProposalIncomeRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetProposalIncomeRevisionQuery,
    BudgetProposalIncomeRevisionOrderByKeys
  >;
export type BudgetProposalIncomeRevisionRepositoryQuery =
  BaseRepositoryQuery<BudgetProposalIncomeRevisionQuery>;

@Injectable()
export class BudgetProposalIncomeRevisionRepository extends BaseSingleTableRepository<
  MBudgetProposalIncomeRevision,
  IBudgetProposalIncomeRevisionCreate,
  BudgetProposalIncomeRevisionTable,
  BudgetProposalIncomeRevisionQuery,
  BudgetProposalIncomeRevisionOrderByKeys,
  BudgetProposalIncomeRevisionQuerySupport
> {
  constructor() {
    super(BudgetProposalIncomeRevision, MBudgetProposalIncomeRevision);
  }

  protected dbToModelMapping(
    result: BudgetProposalIncomeRevisionDbSelect,
  ): MBudgetProposalIncomeRevision {
    return new MBudgetProposalIncomeRevision({
      id: result.id,
      budgetProposalIncome: { id: result.budgetProposalId },
      previousBudgetReportIncome: { id: result.previousBudgetReportIncomeId },
      budgetDomainEnum: result.budgetDomainEnum,
      budgetDivisionIncomeEnum: result.budgetDivisionIncomeEnum,
      name: result.name,
      amount: result.amount,
      detail: result.detail,
      note: result.note,
      // documentStatusEnum: result.documentStatusEnum,
      submittedAt: result.submittedAt,
      cogAgenda: { id: result.cogAgendaId },
      gsrcAgenda: { id: result.gsrcAgendaId },
      // isRemoved: result.isRemoved,
    });
  }

  protected modelToDBMapping(
    model: MBudgetProposalIncomeRevision,
  ): BudgetProposalIncomeRevisionDbUpdate {
    return {
      id: model.id,
      budgetProposalId: model.budgetProposalIncome.id,
      previousBudgetReportIncomeId: model.previousBudgetReportIncome.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionIncomeEnum: model.budgetDivisionIncomeEnum,
      name: model.name,
      amount: model.amount,
      detail: model.detail,
      note: model.note,
      // documentStatusEnum: model.documentStatusEnum,
      submittedAt: model.submittedAt,
      cogAgendaId: model.cogAgenda?.id,
      gsrcAgendaId: model.gsrcAgenda?.id,
      // isRemoved: model.isRemoved,
    };
  }

  protected createToDBMapping(
    model: IBudgetProposalIncomeRevisionCreate,
  ): BudgetProposalIncomeRevisionDbInsert {
    return {
      budgetProposalId: model.budgetProposalIncome.id,
      previousBudgetReportIncomeId: model.previousBudgetReportIncome.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionIncomeEnum: model.budgetDivisionIncomeEnum,
      name: model.name,
      amount: model.amount,
      detail: model.detail,
      note: model.note,
      // documentStatusEnum: model.documentStatusEnum,
    };
  }

  protected fieldMap(
    field: BudgetProposalIncomeRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetProposalIncomeRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetProposalIncomeRevision,
      organizationId: BudgetProposalIncomeRevision,
      semesterId: BudgetProposalIncomeRevision,
      projectProposalId: BudgetProposalIncomeRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
