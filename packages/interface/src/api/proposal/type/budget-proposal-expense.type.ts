import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

import { zMoney } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";
// eslint-disable-next-line import/no-cycle
import { zBudgetReportExpense } from "@sparcs-students/interface/api/report/type/budget-report-expense.type";
import {
  zProjectProposal,
  zProjectProposalRevision,
} from "./project-proposal.type";

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpense = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
  projectProposal: zExtractId(zProjectProposal),
});

export type IBudgetProposalExpense = z.infer<typeof zBudgetProposalExpense>;

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpenseRevision = z
  .object({
    id: zId,
    budgetProposalExpense: zExtractId(zBudgetProposalExpense),
    previousBudgetReportExpense: zExtractId(zBudgetReportExpense),
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
    projectProposalRevision: zExtractId(zProjectProposalRevision),
    budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
    amount: zMoney,
    detail: z.string(),
    code: z.coerce.number(),
  })
  .merge(zRevisionBase);

export type IBudgetProposalExpenseRevision = z.infer<
  typeof zBudgetProposalExpenseRevision
>;
