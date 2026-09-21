import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetReportExpenseRevision } from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description 해당 날짜에 제출된 결산안 지출 revision 제출본을 조회합니다.
 */

const url = () => `student/reports/budget-reports/expense/getRevisionsByDate`;
const method = "GET";
export const ApiBudRpt017RequestUrl =
  "student/reports/budget-reports/expense/getRevisionsByDate";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpenseRevisions: z.array(zBudgetReportExpenseRevision),
  }),
};

const responseErrorMap = {};

const apiBudRpt017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt017RequestParam = z.infer<typeof apiBudRpt017.requestParam>;
type ApiBudRpt017RequestQuery = z.infer<typeof apiBudRpt017.requestQuery>;
type ApiBudRpt017RequestBody = z.infer<typeof apiBudRpt017.requestBody>;
type ApiBudRpt017ResponseOk = z.infer<
  (typeof apiBudRpt017.responseBodyMap)[200]
>;

export default apiBudRpt017;

export type {
  ApiBudRpt017RequestParam,
  ApiBudRpt017RequestQuery,
  ApiBudRpt017RequestBody,
  ApiBudRpt017ResponseOk,
};
