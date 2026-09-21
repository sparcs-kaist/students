import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 결산안 지출(budgetReportExpense)을 삭제합니다.
 */

const url = () => `/manager/reports/budget-reports/expense/delete`;
const method = "DELETE";
export const ApiBudRpt011RequestUrl =
  "/manager/reports/budget-reports/expense/delete";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {};

const responseErrorMap = {};

const apiBudRpt011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt011RequestParam = z.infer<typeof apiBudRpt011.requestParam>;
type ApiBudRpt011RequestQuery = z.infer<typeof apiBudRpt011.requestQuery>;
type ApiBudRpt011RequestBody = z.infer<typeof apiBudRpt011.requestBody>;

export default apiBudRpt011;

export type {
  ApiBudRpt011RequestParam,
  ApiBudRpt011RequestQuery,
  ApiBudRpt011RequestBody,
};
