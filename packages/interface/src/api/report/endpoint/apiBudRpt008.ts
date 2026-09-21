import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpenseRevision,
  zBudgetReportExpenseRevisionRequestCreate,
} from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 결산안 지출 revision(budgetReportExpenseRevision)을 생성합니다.
 */

const url = () => `/manager/reports/budget-reports/expense-revision/create`;
const method = "POST";
export const ApiBudRpt008RequestUrl =
  "/manager/reports/budget-reports/expense-revision/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpenseRevision: zBudgetReportExpenseRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportExpenseRevision: zBudgetReportExpenseRevision,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiBudRpt008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt008RequestParam = z.infer<typeof apiBudRpt008.requestParam>;
type ApiBudRpt008RequestQuery = z.infer<typeof apiBudRpt008.requestQuery>;
type ApiBudRpt008RequestBody = z.infer<typeof apiBudRpt008.requestBody>;
type ApiBudRpt008ResponseCreated = z.infer<
  (typeof apiBudRpt008.responseBodyMap)[201]
>;

export default apiBudRpt008;

export type {
  ApiBudRpt008RequestParam,
  ApiBudRpt008RequestQuery,
  ApiBudRpt008RequestBody,
  ApiBudRpt008ResponseCreated,
};
