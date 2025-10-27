import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

import {
  zDocumentItemName,
  zMoney,
} from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpense = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export const zBudgetProposalExpenseRequestCreate = zBudgetProposalExpense.omit({
  id: true,
});

export type IBudgetProposalExpense = z.infer<typeof zBudgetProposalExpense>;
export type IBudgetProposalExpenseRequestCreate = z.infer<
  typeof zBudgetProposalExpenseRequestCreate
>;

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpenseRevision = z
  .object({
    id: zId,
    budgetProposalExpense: zExtractId(zBudgetProposalExpense),
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
    budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
    name: zDocumentItemName,
    amount: zMoney,
    detail: z.string(),
    code: z.coerce.number(),
  })
  .merge(zRevisionBase);

export const zBudgetProposalExpenseRevisionRequestCreate =
  zBudgetProposalExpenseRevision.omit({
    id: true,
  });

export const zBudgetProposalExpenseRequestUpdate =
  zBudgetProposalExpenseRevision;

export const zBudgetProposalExpenseResponse =
  zBudgetProposalExpenseRevision.pick({
    id: true,
  });

export type IBudgetProposalExpenseRevision = z.infer<
  typeof zBudgetProposalExpenseRevision
>;
export type IBudgetProposalExpenseRevisionRequestCreate = z.infer<
  typeof zBudgetProposalExpenseRevisionRequestCreate
>;
export type IBudgetProposalExpenseRequestUpdate = z.infer<
  typeof zBudgetProposalExpenseRequestUpdate
>;
export type IBudgetProposalExpenseResponse = z.infer<
  typeof zBudgetProposalExpenseResponse
>;
