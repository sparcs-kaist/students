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

// BudgetReportIncome: 예산안 수입 각 행 엔티티
export const zBudgetReportIncome = z.object({
  id: zId,
  organization: zExtractId(zOrganization),
  semester: zExtractId(zSemester),
});

export const zBudgetReportIncomeRequestCreate = zBudgetReportIncome.omit({
  id: true,
});

export type IBudgetReportIncome = z.infer<typeof zBudgetReportIncome>;
export type IBudgetReportIncomeRequestCreate = z.infer<
  typeof zBudgetReportIncomeRequestCreate
>;

export const zBudgetReportIncomeRevision = z
  .object({
    id: zId,
    budgetReportIncome: zExtractId(zBudgetReportIncome),
    budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
    budgetDivisionIncomeEnum: z.nativeEnum(BudgetDivisionIncomeEnum),
    name: zDocumentItemName,
    amount: zMoney,
    detail: z.string(),
    code: z.coerce.number(),
  })
  .merge(zRevisionBase);

export const zBudgetReportIncomeRevisionRequestCreate =
  zBudgetReportIncomeRevision.omit({
    id: true,
  });

export const zBudgetReportIncomeRequestUpdate = z.object({ id: zId }).merge(
  zBudgetReportIncomeRevision
    .omit({
      id: true,
      budgetReportIncome: true,
    })
    .partial(),
);

export const zBudgetReportIncomeResponse = zBudgetReportIncomeRevision.pick({
  id: true,
});

export type IBudgetReportIncomeRevision = z.infer<
  typeof zBudgetReportIncomeRevision
>;
export type IBudgetReportIncomeRevisionRequestCreate = z.infer<
  typeof zBudgetReportIncomeRevisionRequestCreate
>;

export type IBudgetReportIncomeRequestUpdate = z.infer<
  typeof zBudgetReportIncomeRequestUpdate
>;

export type IBudgetReportIncomeResponse = z.infer<
  typeof zBudgetReportIncomeResponse
>;
