import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 결산안 수입(budgetReportIncome)을 삭제합니다.
 */

const url = () => `/manager/reports/budget-reports/income/delete`;
const method = "DELETE";
export const ApiBudRpt006RequestUrl =
  "/manager/reports/budget-reports/income/delete";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {};

const responseErrorMap = {};

const apiBudRpt006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt006RequestParam = z.infer<typeof apiBudRpt006.requestParam>;
type ApiBudRpt006RequestQuery = z.infer<typeof apiBudRpt006.requestQuery>;
type ApiBudRpt006RequestBody = z.infer<typeof apiBudRpt006.requestBody>;

export default apiBudRpt006;

export type {
  ApiBudRpt006RequestParam,
  ApiBudRpt006RequestQuery,
  ApiBudRpt006RequestBody,
};
