import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { BudgetProposalExpenseRevision } from "@sparcs-students/api/drizzle/schema/budget-proposal.schema";
import {
  IBudgetProposalExpenseRevisionCreate,
  MBudgetProposalExpenseRevision,
} from "@sparcs-students/api/feature/proposal/model/budget-proposal-expense-revision.model";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";

export type BudgetProposalExpenseRevisionQuery = {
  // id: number; // id 는 기본 내장
  budgetProposalExpenseId: number;
  previousBudgetReportExpenseId: number;
  projectProposalRevisionId: number;
};

type BudgetProposalExpenseRevisionOrderByKeys = "id";
type BudgetProposalExpenseRevisionQuerySupport = EmptyObject; // Query Support 용

type BudgetProposalExpenseRevisionTable = typeof BudgetProposalExpenseRevision;
type BudgetProposalExpenseRevisionDbSelect =
  InferSelectModel<BudgetProposalExpenseRevisionTable>;
type BudgetProposalExpenseRevisionDbUpdate =
  Partial<BudgetProposalExpenseRevisionDbSelect>;
type BudgetProposalExpenseRevisionDbInsert =
  InferInsertModel<BudgetProposalExpenseRevisionTable>;

type BudgetProposalExpenseRevisionFieldMapKeys = BaseTableFieldMapKeys<
  BudgetProposalExpenseRevisionQuery,
  BudgetProposalExpenseRevisionOrderByKeys,
  BudgetProposalExpenseRevisionQuerySupport
>;

export type BudgetProposalExpenseRevisionRepositoryFindQuery =
  BaseRepositoryFindQuery<
    BudgetProposalExpenseRevisionQuery,
    BudgetProposalExpenseRevisionOrderByKeys
  >;
export type BudgetProposalExpenseRevisionRepositoryQuery =
  BaseRepositoryQuery<BudgetProposalExpenseRevisionQuery>;

@Injectable()
export class BudgetProposalExpenseRevisionRepository extends BaseSingleTableRepository<
  MBudgetProposalExpenseRevision,
  IBudgetProposalExpenseRevisionCreate,
  BudgetProposalExpenseRevisionTable,
  BudgetProposalExpenseRevisionQuery,
  BudgetProposalExpenseRevisionOrderByKeys,
  BudgetProposalExpenseRevisionQuerySupport
> {
  constructor() {
    super(BudgetProposalExpenseRevision, MBudgetProposalExpenseRevision);
  }

  protected dbToModelMapping(
    result: BudgetProposalExpenseRevisionDbSelect,
  ): MBudgetProposalExpenseRevision {
    return new MBudgetProposalExpenseRevision({
      id: result.id,
      budgetProposalExpense: { id: result.budgetProposalExpenseId },
      previousBudgetReportExpense: { id: result.previousBudgetReportExpenseId },
      budgetDomainEnum: result.budgetDomainEnum,
      budgetDivisionExpenseEnum: result.budgetDivisionExpenseEnum,
      projectProposalRevision: { id: result.projectProposalRevisionId },
      budgetClassExpenseEnum: result.budgetClassExpenseEnum,
      amount: result.amount,
      detail: result.detail,
      submittedAt: result.submittedAt,
      cogAgenda: { id: result.cogAgendaId },
      gsrcAgenda: { id: result.gsrcAgendaId },
    });
  }

  protected modelToDBMapping(
    model: MBudgetProposalExpenseRevision,
  ): BudgetProposalExpenseRevisionDbUpdate {
    return {
      id: model.id,
      budgetProposalExpenseId: model.budgetProposalExpense.id,
      previousBudgetReportExpenseId: model.previousBudgetReportExpense.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionExpenseEnum: model.budgetDivisionExpenseEnum,
      projectProposalRevisionId: model.projectProposalRevision.id,
      budgetClassExpenseEnum: model.budgetClassExpenseEnum,
      amount: model.amount,
      detail: model.detail,
      submittedAt: model.submittedAt,
      cogAgendaId: model.cogAgenda?.id,
      gsrcAgendaId: model.gsrcAgenda?.id,
    };
  }

  protected createToDBMapping(
    model: IBudgetProposalExpenseRevisionCreate,
  ): BudgetProposalExpenseRevisionDbInsert {
    return {
      budgetProposalExpenseId: model.budgetProposalExpense.id,
      previousBudgetReportExpenseId: model.previousBudgetReportExpense.id,
      budgetDomainEnum: model.budgetDomainEnum,
      budgetDivisionExpenseEnum: model.budgetDivisionExpenseEnum,
      projectProposalRevisionId: model.projectProposalRevision.id,
      budgetClassExpenseEnum: model.budgetClassExpenseEnum,
      amount: model.amount,
      detail: model.detail,
    };
  }

  protected fieldMap(
    field: BudgetProposalExpenseRevisionFieldMapKeys,
  ): TableWithID | null | undefined {
    const fieldMappings: Record<
      BudgetProposalExpenseRevisionFieldMapKeys,
      TableWithID | null
    > = {
      id: BudgetProposalExpenseRevision,
      budgetProposalExpenseId: BudgetProposalExpenseRevision,
      previousBudgetReportExpenseId: BudgetProposalExpenseRevision,
      projectProposalRevisionId: BudgetProposalExpenseRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
