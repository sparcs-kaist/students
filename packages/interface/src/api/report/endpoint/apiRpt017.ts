import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetReportIncomeDocumentReview } from "../type/budget-report-income-document-review.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 IncomeDocumentReview를 조회합니다.
 */

const url = () => `/manager/reports/budget-reports/income-document-review/read`;
const method = "GET";
export const ApiRpt017RequestUrl =
  "/manager/reports/budget-reports/income-document-review/read";

const requestParam = z.object({
  budgetReportIncomeRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncomeDocumentReview: z.array(
      zBudgetReportIncomeDocumentReview,
    ),
  }),
};

const responseErrorMap = {};

const apiRpt017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt017RequestParam = z.infer<typeof apiRpt017.requestParam>;
type ApiRpt017RequestQuery = z.infer<typeof apiRpt017.requestQuery>;
type ApiRpt017RequestBody = z.infer<typeof apiRpt017.requestBody>;
type ApiRpt017ResponseCreated = z.infer<
  (typeof apiRpt017.responseBodyMap)[200]
>;

export default apiRpt017;

export type {
  ApiRpt017RequestParam,
  ApiRpt017RequestQuery,
  ApiRpt017RequestBody,
  ApiRpt017ResponseCreated,
};
