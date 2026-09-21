import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpenseDocumentReview,
  zBudgetReportExpenseDocumentReviewRequestCreate,
} from "../type/budget-report-expense-document-review.type";

/**
 * @version v0.1
 * @description 각 집행부원 권한으로 ExpenseDocumentReview를 생성합니다.
 */

const url = () =>
  `/staff/reports/budget-reports/expense-document-review/create`;
const method = "POST";
export const ApiRpt019RequestUrl =
  "/staff/reports/budget-reports/expense-document-review/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpenseDocumentReview:
    zBudgetReportExpenseDocumentReviewRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportExpenseDocumentReview: zBudgetReportExpenseDocumentReview,
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
  [HttpStatusCode.Forbidden]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiRpt019 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt019RequestParam = z.infer<typeof apiRpt019.requestParam>;
type ApiRpt019RequestQuery = z.infer<typeof apiRpt019.requestQuery>;
type ApiRpt019RequestBody = z.infer<typeof apiRpt019.requestBody>;
type ApiRpt019ResponseCreated = z.infer<
  (typeof apiRpt019.responseBodyMap)[201]
>;

export default apiRpt019;

export type {
  ApiRpt019RequestParam,
  ApiRpt019RequestQuery,
  ApiRpt019RequestBody,
  ApiRpt019ResponseCreated,
};
