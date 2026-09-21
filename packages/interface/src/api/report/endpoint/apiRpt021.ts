import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 각 집행부원 권한으로 ExpenseDocumentReview를 삭제합니다.
 */

const url = () =>
  `/staff/reports/budget-reports/expense-document-review/delete`;
const method = "DELETE";
export const ApiRpt021RequestUrl =
  "/staff/reports/budget-reports/expense-document-review/delete";

const requestParam = z.object({
  budgetProposalExpenseDocumentReviewId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiRpt021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt021RequestParam = z.infer<typeof apiRpt021.requestParam>;
type ApiRpt021RequestQuery = z.infer<typeof apiRpt021.requestQuery>;
type ApiRpt021RequestBody = z.infer<typeof apiRpt021.requestBody>;
type ApiRpt021ResponseCreated = z.infer<
  (typeof apiRpt021.responseBodyMap)[200]
>;

export default apiRpt021;

export type {
  ApiRpt021RequestParam,
  ApiRpt021RequestQuery,
  ApiRpt021RequestBody,
  ApiRpt021ResponseCreated,
};
