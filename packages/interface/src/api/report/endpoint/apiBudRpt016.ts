import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetReportIncomeRevision } from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description 해당 날짜에 제출된 결산안 수입 revision 제출본을 조회합니다.
 */

const url = () => `student/reports/budget-reports/income/getRevisionsByDate`;
const method = "GET";
export const ApiBudRpt016RequestUrl =
  "student/reports/budget-reports/income/getRevisionsByDate";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncomeRevisions: z.array(zBudgetReportIncomeRevision),
  }),
};

const responseErrorMap = {};

const apiBudRpt016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt016RequestParam = z.infer<typeof apiBudRpt016.requestParam>;
type ApiBudRpt016RequestQuery = z.infer<typeof apiBudRpt016.requestQuery>;
type ApiBudRpt016RequestBody = z.infer<typeof apiBudRpt016.requestBody>;
type ApiBudRpt016ResponseOk = z.infer<
  (typeof apiBudRpt016.responseBodyMap)[200]
>;

export default apiBudRpt016;

export type {
  ApiBudRpt016RequestParam,
  ApiBudRpt016RequestQuery,
  ApiBudRpt016RequestBody,
  ApiBudRpt016ResponseOk,
};
