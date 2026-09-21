import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetReportExpenseDocumentReview } from "../type/budget-report-expense-document-review.type";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 ExpenseDocumentReview를 조회합니다.
 */

const url = () =>
  `/manager/reports/budget-reports/expense-document-review/read`;
const method = "GET";
export const ApiRpt020RequestUrl =
  "/manager/reports/budget-reports/expense-document-review/read";

const requestParam = z.object({
  budgetReportExpenseRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpenseDocumentReview: z.array(
      zBudgetReportExpenseDocumentReview,
    ),
  }),
};

const responseErrorMap = {};

const apiRpt020 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt020RequestParam = z.infer<typeof apiRpt020.requestParam>;
type ApiRpt020RequestQuery = z.infer<typeof apiRpt020.requestQuery>;
type ApiRpt020RequestBody = z.infer<typeof apiRpt020.requestBody>;
type ApiRpt020ResponseCreated = z.infer<
  (typeof apiRpt020.responseBodyMap)[200]
>;

export default apiRpt020;

export type {
  ApiRpt020RequestParam,
  ApiRpt020RequestQuery,
  ApiRpt020RequestBody,
  ApiRpt020ResponseCreated,
};
