import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetReportIncomeResponse } from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 결산안 수입 revision(budgetReportIncomeRevision)을 제출합니다.
 */

const url = () => `/manager/reports/budget-reports/income-revision/submit`;
const method = "PATCH";
export const ApiBudRpt005RequestUrl =
  "/manager/reports/budget-reports/income-revision/submit";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({ budgetReportIncomeRevisionId: zId });

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncomeRevision: zBudgetReportIncomeResponse,
  }),
};

const responseErrorMap = {};

const apiBudRpt005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt005RequestParam = z.infer<typeof apiBudRpt005.requestParam>;
type ApiBudRpt005RequestQuery = z.infer<typeof apiBudRpt005.requestQuery>;
type ApiBudRpt005RequestBody = z.infer<typeof apiBudRpt005.requestBody>;
type ApiBudRpt005ResponseOk = z.infer<
  (typeof apiBudRpt005.responseBodyMap)[200]
>;

export default apiBudRpt005;

export type {
  ApiBudRpt005RequestParam,
  ApiBudRpt005RequestQuery,
  ApiBudRpt005RequestBody,
  ApiBudRpt005ResponseOk,
};
