import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeDocumentReview,
  zBudgetReportIncomeDocumentReviewRequestCreate,
} from "../type/budget-report-income-document-review.type";

/**
 * @version v0.1
 * @description 집행부원(staff) 권한으로 IncomeDocumentReview를 생성합니다.
 */

const url = () => `/staff/reports/budget-reports/income-document-review/create`;
const method = "POST";
export const ApiRpt016RequestUrl =
  "/staff/reports/budget-reports/income-document-review/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncomeDocumentReview:
    zBudgetReportIncomeDocumentReviewRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportIncomeDocumentReview: zBudgetReportIncomeDocumentReview,
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

const apiRpt016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt016RequestParam = z.infer<typeof apiRpt016.requestParam>;
type ApiRpt016RequestQuery = z.infer<typeof apiRpt016.requestQuery>;
type ApiRpt016RequestBody = z.infer<typeof apiRpt016.requestBody>;
type ApiRpt016ResponseCreated = z.infer<
  (typeof apiRpt016.responseBodyMap)[201]
>;

export default apiRpt016;

export type {
  ApiRpt016RequestParam,
  ApiRpt016RequestQuery,
  ApiRpt016RequestBody,
  ApiRpt016ResponseCreated,
};
