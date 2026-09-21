import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpenseRequestUpdate,
  zBudgetReportExpenseResponse,
} from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 결산안 지출 revision(budgetReportExpenseRevision)을 수정합니다.
 * 만약 가장 최신의 revision이 submit되어있는 상태라면, 새로운 revision을 생성합니다
 */

const url = () => `/manager/reports/budget-reports/expense-revision/update`;
const method = "PATCH";
export const ApiBudRpt009RequestUrl =
  "/manager/reports/budget-reports/expense-revision/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpenseRevision: zBudgetReportExpenseRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpenseRevision: zBudgetReportExpenseResponse,
  }),
};

const responseErrorMap = {};

const apiBudRpt009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt009RequestParam = z.infer<typeof apiBudRpt009.requestParam>;
type ApiBudRpt009RequestQuery = z.infer<typeof apiBudRpt009.requestQuery>;
type ApiBudRpt009RequestBody = z.infer<typeof apiBudRpt009.requestBody>;
type ApiBudRpt009ResponseOk = z.infer<
  (typeof apiBudRpt009.responseBodyMap)[200]
>;

export default apiBudRpt009;

export type {
  ApiBudRpt009RequestParam,
  ApiBudRpt009RequestQuery,
  ApiBudRpt009RequestBody,
  ApiBudRpt009ResponseOk,
};
