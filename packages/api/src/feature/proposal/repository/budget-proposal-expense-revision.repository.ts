import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";

import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { BudgetProposalExpenseRevision } from "src/drizzle/schema";

import {
  IBudgetProposalExpenseRevisionCreate,
  MBudgetProposalExpenseRevision,
} from "../model/budget-proposal-expense-revision.model";

export type BudgetProposalExpenseRevisionQuery = {
  budgetProposalExpenseId: number;
};

type BudgetProposalExpenseRevisionOrderByKeys =
  | "id"
  | "budgetDomainEnum"
  | "budgetDivisionExpenseEnum"
  | "budgetClassExpenseEnum"
  | "documentStatusEnum";
type BudgetProposalExpenseRevisionQuerySupport = EmptyObject;

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
      budgetClassExpenseEnum: result.budgetClassExpenseEnum,
      amount: result.amount,
      detail: result.detail,
      documentStatusEnum: result.documentStatusEnum,
      submittedAt: result.submittedAt,
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
      budgetClassExpenseEnum: model.budgetClassExpenseEnum,
      amount: model.amount,
      detail: model.detail,
      documentStatusEnum: model.documentStatusEnum,
      submittedAt: model.submittedAt,
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
      budgetClassExpenseEnum: model.budgetClassExpenseEnum,
      amount: model.amount,
      detail: model.detail,
      documentStatusEnum: model.documentStatusEnum,
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
      meetingId: BudgetProposalExpenseRevision,
      agendaStatusEnum: BudgetProposalExpenseRevision,
      submittedAt: BudgetProposalExpenseRevision,
      name: BudgetProposalExpenseRevision,
      detail: BudgetProposalExpenseRevision,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
