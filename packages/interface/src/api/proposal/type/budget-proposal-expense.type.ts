import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

import { zMoney } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";
import { zProjectProposal } from "./project-proposal.type";

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpense = z
  .object({
    id: zId,
    organization: zExtractId(zOrganization),
    halfYear: zExtractId(zHalfYear),
  })
  .merge(zRevisionBase);

export type IBudgetProposalExpense = z.infer<typeof zBudgetProposalExpense>;

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpenseRevision = z
  .object({
    id: zId,
    projectProposal: zExtractId(zProjectProposal),
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
    budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
    amount: zMoney,
    detail: z.string(),
  })
  .merge(zRevisionBase);

export type IBudgetProposalExpenseRevision = z.infer<
  typeof zBudgetProposalExpenseRevision
>;
