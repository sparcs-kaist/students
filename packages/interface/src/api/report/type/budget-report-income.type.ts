import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

import {
  zDocumentItemName,
  zMoney,
} from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";
// eslint-disable-next-line import/no-cycle
import { zBudgetProposalIncome } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

// BudgetReportIncome: 예산안 수입 각 행 엔티티
export const zBudgetReportIncome = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
  budgetProposalIncome: zExtractId(zBudgetProposalIncome), // 참조 예산안
});

export type IBudgetReportIncome = z.infer<typeof zBudgetReportIncome>;

export const zBudgetReportIncomeRevision = z
  .object({
    id: zId,
    budgetReportIncome: zExtractId(zBudgetReportIncome), // 원본
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionIncomeEnum: z.nativeEnum(BudgetDivisionIncomeEnum),
    name: zDocumentItemName,
    amount: zMoney,
    detail: z.string(),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IBudgetReportIncomeRevision = z.infer<
  typeof zBudgetReportIncomeRevision
>;
