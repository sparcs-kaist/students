import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 집행부원(staff) 권한으로 IncomeDocumentReview를 삭제합니다.
 */

const url = () => `/staff/reports/budget-reports/income-document-review/delete`;
const method = "DELETE";
export const ApiRpt018RequestUrl =
  "/staff/reports/budget-reports/income-document-review/delete";

const requestParam = z.object({
  budgetReportIncomeDocumentReviewId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiRpt018 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt018RequestParam = z.infer<typeof apiRpt018.requestParam>;
type ApiRpt018RequestQuery = z.infer<typeof apiRpt018.requestQuery>;
type ApiRpt018RequestBody = z.infer<typeof apiRpt018.requestBody>;
type ApiRpt018ResponseCreated = z.infer<
  (typeof apiRpt018.responseBodyMap)[200]
>;

export default apiRpt018;

export type {
  ApiRpt018RequestParam,
  ApiRpt018RequestQuery,
  ApiRpt018RequestBody,
  ApiRpt018ResponseCreated,
};
