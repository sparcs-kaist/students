import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeRevision,
  zBudgetReportIncomeRevisionRequestCreate,
} from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 결산안 수입 revision(budgetReportIncomeRevision)을 생성합니다.
 */

const url = () => `/manager/reports/budget-reports/income-revision/create`;
const method = "POST";
export const ApiBudRpt003RequestUrl =
  "/manager/reports/budget-reports/income-revision/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncomeRevision: zBudgetReportIncomeRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportIncomeRevision: zBudgetReportIncomeRevision,
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

const apiBudRpt003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt003RequestParam = z.infer<typeof apiBudRpt003.requestParam>;
type ApiBudRpt003RequestQuery = z.infer<typeof apiBudRpt003.requestQuery>;
type ApiBudRpt003RequestBody = z.infer<typeof apiBudRpt003.requestBody>;
type ApiBudRpt003ResponseCreated = z.infer<
  (typeof apiBudRpt003.responseBodyMap)[201]
>;

export default apiBudRpt003;

export type {
  ApiBudRpt003RequestParam,
  ApiBudRpt003RequestQuery,
  ApiBudRpt003RequestBody,
  ApiBudRpt003ResponseCreated,
};
