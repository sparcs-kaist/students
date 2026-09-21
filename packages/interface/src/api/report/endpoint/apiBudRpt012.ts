import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetReportIncomeRevision } from "@sparcs-students/interface/api/report/type/budget-report-income.type";

/**
 * @version v0.1
 * @description 결산안 수입 revision(budgetReportIncomeRevision) 최신본을 조회합니다.
 */

const url = () => `student/reports/budget-reports/income/getRecent`;
const method = "GET";
export const ApiBudRpt012RequestUrl =
  "student/reports/budget-reports/income/getRecent";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncomeRevision: zBudgetReportIncomeRevision,
  }),
};

const responseErrorMap = {};

const apiBudRpt012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt012RequestParam = z.infer<typeof apiBudRpt012.requestParam>;
type ApiBudRpt012RequestQuery = z.infer<typeof apiBudRpt012.requestQuery>;
type ApiBudRpt012RequestBody = z.infer<typeof apiBudRpt012.requestBody>;
type ApiBudRpt012ResponseOk = z.infer<
  (typeof apiBudRpt012.responseBodyMap)[200]
>;

export default apiBudRpt012;

export type {
  ApiBudRpt012RequestParam,
  ApiBudRpt012RequestQuery,
  ApiBudRpt012RequestBody,
  ApiBudRpt012ResponseOk,
};
