import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";

import { zMoney } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";
import { zProjectReport } from "./project-report.type";

// BudgetReportExpense: 결산안 엔티티
export const zBudgetReportExpense = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
  projectReport: zExtractId(zProjectReport), // 기반 사업보고서
});

export type IBudgetReportExpense = z.infer<typeof zBudgetReportExpense>;

// BudgetReportExpenseRevision: 결산안 각 행 엔티티
export const zBudgetReportExpenseRevision = z
  .object({
    id: zId,
    budgetReportExpense: zExtractId(zBudgetReportExpense), // 원본
    amount: zMoney,
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IBudgetReportExpenseRevision = z.infer<
  typeof zBudgetReportExpenseRevision
>;

export const zBudgetReportExpenseRequestCreate = zBudgetReportExpense.omit({
  id: true,
});

export const zBudgetReportExpenseRequestUpdate = zBudgetReportExpenseRevision;

export const zBudgetReportExpenseResponse = zBudgetReportExpenseRevision.pick({
  id: true,
});

export const zBudgetReportExpenseRevisionRequestCreate =
  zBudgetReportExpenseRevision.omit({ id: true });

export const zBudgetReportExpenseRevisionResponse =
  zBudgetReportExpenseRevision.pick({
    id: true,
  });

export const zBudgetReportExpenseSubmitRequestUpdate =
  zBudgetReportExpenseRevision.pick({ id: true });

export const zBudgetReportExpenseSubmitResponse = zBudgetReportExpense.pick({
  id: true,
});

export const zBudgetReportExpenseRequestDelete = zBudgetReportExpense.pick({
  id: true,
});

export type IBudgetReportExpenseRequestCreate = z.infer<
  typeof zBudgetReportExpenseRequestCreate
>;
export type IBudgetReportExpenseRequestUpdate = z.infer<
  typeof zBudgetReportExpenseRequestUpdate
>;
export type IBudgetReportExpenseResponse = z.infer<
  typeof zBudgetReportExpenseResponse
>;
export type IBudgetReportExpenseRevisionRequestCreate = z.infer<
  typeof zBudgetReportExpenseRevisionRequestCreate
>;
export type IBudgetReportExpenseRevisionResponse = z.infer<
  typeof zBudgetReportExpenseRevisionResponse
>;
export type IBudgetReportExpenseSubmitRequestUpdate = z.infer<
  typeof zBudgetReportExpenseSubmitRequestUpdate
>;
export type IBudgetReportExpenseSubmitResponse = z.infer<
  typeof zBudgetReportExpenseSubmitResponse
>;
export type IBudgetReportExpenseRequestDelete = z.infer<
  typeof zBudgetReportExpenseRequestDelete
>;
