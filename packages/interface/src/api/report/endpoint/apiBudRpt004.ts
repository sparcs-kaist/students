import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeRequestUpdate,
  zBudgetReportIncomeResponse,
} from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 결산안 수입 revision(budgetReportIncomeRevision)을 수정합니다.
 * 만약 가장 최신의 revision이 submit되어있는 상태라면, 새로운 revision을 생성합니다.
 */

const url = () => `/manager/reports/budget-reports/income-revision/update`;
const method = "PATCH";
export const ApiBudRpt004RequestUrl =
  "/manager/reports/budget-reports/income-revision/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncomeRevision: zBudgetReportIncomeRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncomeRevision: zBudgetReportIncomeResponse,
  }),
};

const responseErrorMap = {};

const apiBudRpt004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt004RequestParam = z.infer<typeof apiBudRpt004.requestParam>;
type ApiBudRpt004RequestQuery = z.infer<typeof apiBudRpt004.requestQuery>;
type ApiBudRpt004RequestBody = z.infer<typeof apiBudRpt004.requestBody>;
type ApiBudRpt004ResponseOk = z.infer<
  (typeof apiBudRpt004.responseBodyMap)[200]
>;

export default apiBudRpt004;

export type {
  ApiBudRpt004RequestParam,
  ApiBudRpt004RequestQuery,
  ApiBudRpt004RequestBody,
  ApiBudRpt004ResponseOk,
};
