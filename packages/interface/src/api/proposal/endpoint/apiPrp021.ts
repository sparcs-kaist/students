import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 각 집행부원 권한으로 ExpenseDocumentReview를 삭제합니다.
 */

const url = () =>
  `/staff/proposals/budget-proposals/expense-document-review/delete`;
const method = "DELETE";
export const ApiPrp021RequestUrl =
  "/staff/proposals/budget-proposals/expense-document-review/delete";

const requestParam = z.object({
  budgetProposalExpenseDocumentReviewId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiPrp021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp021RequestParam = z.infer<typeof apiPrp021.requestParam>;
type ApiPrp021RequestQuery = z.infer<typeof apiPrp021.requestQuery>;
type ApiPrp021RequestBody = z.infer<typeof apiPrp021.requestBody>;
type ApiPrp021ResponseCreated = z.infer<
  (typeof apiPrp021.responseBodyMap)[200]
>;

export default apiPrp021;

export type {
  ApiPrp021RequestParam,
  ApiPrp021RequestQuery,
  ApiPrp021RequestBody,
  ApiPrp021ResponseCreated,
};
