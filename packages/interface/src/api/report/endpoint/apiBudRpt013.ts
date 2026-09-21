import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetReportExpenseRevision } from "@sparcs-students/interface/api/report/type/budget-report-expense.type";

/**
 * @version v0.1
 * @description 결산안 지출 revision(budgetReportExpenseRevision) 최신본을 조회합니다.
 */

const url = () => `student/reports/budget-reports/expense/getRecent`;
const method = "GET";
export const ApiBudRpt013RequestUrl =
  "student/reports/budget-reports/expense/getRecent";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpenseRevision: zBudgetReportExpenseRevision,
  }),
};

const responseErrorMap = {};

const apiBudRpt013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt013RequestParam = z.infer<typeof apiBudRpt013.requestParam>;
type ApiBudRpt013RequestQuery = z.infer<typeof apiBudRpt013.requestQuery>;
type ApiBudRpt013RequestBody = z.infer<typeof apiBudRpt013.requestBody>;
type ApiBudRpt013ResponseOk = z.infer<
  (typeof apiBudRpt013.responseBodyMap)[200]
>;

export default apiBudRpt013;

export type {
  ApiBudRpt013RequestParam,
  ApiBudRpt013RequestQuery,
  ApiBudRpt013RequestBody,
  ApiBudRpt013ResponseOk,
};
