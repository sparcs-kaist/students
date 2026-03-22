import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetReportExpenseResponse } from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 결산안 지출 revision(budgetReportExpenseRevision)을 제출합니다.
 */

const url = () => `/manager/reports/budget-reports/expense-revision/submit`;
const method = "PATCH";
export const ApiBudRpt010RequestUrl =
  "/manager/reports/budget-reports/expense-revision/submit";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({ budgetReportExpenseRevisionId: zId });

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpenseRevision: zBudgetReportExpenseResponse,
  }),
};

const responseErrorMap = {};

const apiBudRpt010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudRpt010RequestParam = z.infer<typeof apiBudRpt010.requestParam>;
type ApiBudRpt010RequestQuery = z.infer<typeof apiBudRpt010.requestQuery>;
type ApiBudRpt010RequestBody = z.infer<typeof apiBudRpt010.requestBody>;
type ApiBudRpt010ResponseOk = z.infer<
  (typeof apiBudRpt010.responseBodyMap)[200]
>;

export default apiBudRpt010;

export type {
  ApiBudRpt010RequestParam,
  ApiBudRpt010RequestQuery,
  ApiBudRpt010RequestBody,
  ApiBudRpt010ResponseOk,
};
