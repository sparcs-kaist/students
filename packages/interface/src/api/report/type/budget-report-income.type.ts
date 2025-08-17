import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";

import { zMoney } from "@sparcs-students/interface/common/stringLength";
import { zRevisionBase } from "@sparcs-students/interface/common/type/revision-base.type";

// BudgetReportIncome: 예산안 수입 각 행 엔티티
export const zBudgetReportIncome = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export type IBudgetReportIncome = z.infer<typeof zBudgetReportIncome>;

export const zBudgetReportIncomeRevision = z
  .object({
    id: zId,
    budgetReportIncome: zExtractId(zBudgetReportIncome), // 원본
    amount: zMoney,
    note: z.string(),
  })
  .merge(zRevisionBase);

export type IBudgetReportIncomeRevision = z.infer<
  typeof zBudgetReportIncomeRevision
>;

export const zBudgetReportIncomeRequestCreate = zBudgetReportIncome.omit({
  id: true,
});

export const zBudgetReportIncomeRequestUpdate = zBudgetReportIncomeRevision;

export const zBudgetReportIncomeResponse = zBudgetReportIncomeRevision.pick({
  id: true,
});

export const zBudgetReportIncomeRevisionRequestCreate =
  zBudgetReportIncomeRevision.omit({ id: true });

export const zBudgetReportIncomeRevisionResponse =
  zBudgetReportIncomeRevision.pick({
    id: true,
  });

export const zBudgetReportIncomeSubmitRequestUpdate =
  zBudgetReportIncomeRevision.pick({ id: true });

export const zBudgetReportIncomeSubmitResponse = zBudgetReportIncome.pick({
  id: true,
});

export const zBudgetReportIncomeRequestDelete = zBudgetReportIncome.pick({
  id: true,
});

export type IBudgetReportIncomeRequestCreate = z.infer<
  typeof zBudgetReportIncomeRequestCreate
>;
export type IBudgetReportIncomeRequestUpdate = z.infer<
  typeof zBudgetReportIncomeRequestUpdate
>;
export type IBudgetReportIncomeResponse = z.infer<
  typeof zBudgetReportIncomeResponse
>;
export type IBudgetReportIncomeRevisionRequestCreate = z.infer<
  typeof zBudgetReportIncomeRevisionRequestCreate
>;
export type IBudgetReportIncomeRevisionResponse = z.infer<
  typeof zBudgetReportIncomeRevisionResponse
>;
export type IBudgetReportIncomeSubmitRequestUpdate = z.infer<
  typeof zBudgetReportIncomeSubmitRequestUpdate
>;
export type IBudgetReportIncomeSubmitResponse = z.infer<
  typeof zBudgetReportIncomeResponse
>;
export type IBudgetReportIncomeRequestDelete = z.infer<
  typeof zBudgetReportIncomeRequestDelete
>;
