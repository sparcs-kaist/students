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

// BudgetReportExpense: 결산안 각 행 엔티티
export const zBudgetReportExpense = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export const zBudgetReportExpenseRequestCreate = zBudgetReportExpense.omit({
  id: true,
});

export type IBudgetReportExpense = z.infer<typeof zBudgetReportExpense>;
export type IBudgetReportExpenseRequestCreate = z.infer<
  typeof zBudgetReportExpenseRequestCreate
>;

// BudgetReportExpense: 결산안 각 행 엔티티
export const zBudgetReportExpenseRevision = z
  .object({
    id: zId,
    budgetReportExpense: zExtractId(zBudgetReportExpense),
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
    budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
    name: zDocumentItemName,
    amount: zMoney,
    detail: z.string(),
    code: z.coerce.number(),
  })
  .merge(zRevisionBase);

export const zBudgetReportExpenseRevisionRequestCreate =
  zBudgetReportExpenseRevision.omit({
    id: true,
  });

export const zBudgetReportExpenseRequestUpdate = z.object({ id: zId }).merge(
  zBudgetReportExpenseRevision
    .omit({
      id: true,
      budgetReportExpense: true,
    })
    .partial(),
);

export const zBudgetReportExpenseResponse = zBudgetReportExpenseRevision.pick({
  id: true,
});

export type IBudgetReportExpenseRevision = z.infer<
  typeof zBudgetReportExpenseRevision
>;
export type IBudgetReportExpenseRevisionRequestCreate = z.infer<
  typeof zBudgetReportExpenseRevisionRequestCreate
>;
export type IBudgetReportExpenseRequestUpdate = z.infer<
  typeof zBudgetReportExpenseRequestUpdate
>;
export type IBudgetReportExpenseResponse = z.infer<
  typeof zBudgetReportExpenseResponse
>;
