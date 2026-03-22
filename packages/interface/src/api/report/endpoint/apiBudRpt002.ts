import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncome,
  zBudgetReportIncomeRequestCreate,
} from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 결산안 수입(budgetReportIncome)을 생성합니다.
 */

const url = () => `/manager/reports/budget-reports/income/create`;
const method = "POST";
export const ApiBudRpt002RequestUrl =
  "/manager/reports/budget-reports/income/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncome: zBudgetReportIncomeRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportIncome: zBudgetReportIncome,
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

const apiBudRpt002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt002RequestParam = z.infer<typeof apiBudRpt002.requestParam>;
type ApiBudRpt002RequestQuery = z.infer<typeof apiBudRpt002.requestQuery>;
type ApiBudRpt002RequestBody = z.infer<typeof apiBudRpt002.requestBody>;
type ApiBudRpt002ResponseCreated = z.infer<
  (typeof apiBudRpt002.responseBodyMap)[201]
>;

export default apiBudRpt002;

export type {
  ApiBudRpt002RequestParam,
  ApiBudRpt002RequestQuery,
  ApiBudRpt002RequestBody,
  ApiBudRpt002ResponseCreated,
};
