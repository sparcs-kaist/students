import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpense,
  zBudgetReportExpenseRequestCreate,
} from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 결산안 지출(budgetReportExpense)을 생성합니다.
 */

const url = () => `/manager/reports/budget-reports/expense/create`;
const method = "POST";
export const ApiBudRpt007RequestUrl =
  "/manager/reports/budget-reports/expense/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpense: zBudgetReportExpenseRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportExpense: zBudgetReportExpense,
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

const apiBudRpt007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt007RequestParam = z.infer<typeof apiBudRpt007.requestParam>;
type ApiBudRpt007RequestQuery = z.infer<typeof apiBudRpt007.requestQuery>;
type ApiBudRpt007RequestBody = z.infer<typeof apiBudRpt007.requestBody>;
type ApiBudRpt007ResponseCreated = z.infer<
  (typeof apiBudRpt007.responseBodyMap)[201]
>;

export default apiBudRpt007;

export type {
  ApiBudRpt007RequestParam,
  ApiBudRpt007RequestQuery,
  ApiBudRpt007RequestBody,
  ApiBudRpt007ResponseCreated,
};
