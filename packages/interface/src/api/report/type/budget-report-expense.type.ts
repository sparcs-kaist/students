import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
// eslint-disable-next-line import/no-cycle
import { zBudgetProposalExpense } from "@sparcs-students/interface/api/proposal/type/budget-proposal-expense.type";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

import { zMoney } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";
import { zProjectReport } from "./project-report.type";

// BudgetReportExpense: 예산안 각 행 엔티티
export const zBudgetReportExpense = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
  projectReport: zExtractId(zProjectReport), // 기반 사업보고서
  budgetProposalExpense: zExtractId(zBudgetProposalExpense), // 참조 예산안
});

export type IBudgetReportExpense = z.infer<typeof zBudgetReportExpense>;

// BudgetReportExpense: 예산안 각 행 엔티티
export const zBudgetReportExpenseRevision = z
  .object({
    id: zId,
    budgetReportExpense: zExtractId(zBudgetReportExpense), // 원본
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
    budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
    amount: zMoney,
    detail: z.string(),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IBudgetReportExpenseRevision = z.infer<
  typeof zBudgetReportExpenseRevision
>;
