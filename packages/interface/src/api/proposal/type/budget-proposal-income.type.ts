import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";

import {
  zDocumentItemName,
  zMoney,
} from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

// BudgetProposalIncome: 예산안 수입 각 행 엔티티
export const zBudgetProposalIncome = z
  .object({
    id: zId,
    organization: zExtractId(zOrganization),
    halfYear: zExtractId(zHalfYear),
  })
  .merge(zRevisionBase);

export type IBudgetProposalIncome = z.infer<typeof zBudgetProposalIncome>;

export const zBudgetProposalIncomeRevision = z
  .object({
    id: zId,
    budgetProposalIncome: zExtractId(zBudgetProposalIncome),
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionIncomeEnum: z.nativeEnum(BudgetDivisionIncomeEnum),
    name: zDocumentItemName,
    amount: zMoney,
    detail: z.string(),
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IBudgetProposalIncomeRevision = z.infer<
  typeof zBudgetProposalIncomeRevision
>;
