import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 집행부원(staff) 권한으로 IncomeDocumentReview를 삭제합니다.
 */

const url = () =>
  `/staff/proposals/budget-proposals/income-document-review/delete`;
const method = "DELETE";
export const ApiPrp018RequestUrl =
  "/staff/proposals/budget-proposals/income-document-review/delete";

const requestParam = z.object({
  budgetProposalIncomeDocumentReviewId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiPrp018 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp018RequestParam = z.infer<typeof apiPrp018.requestParam>;
type ApiPrp018RequestQuery = z.infer<typeof apiPrp018.requestQuery>;
type ApiPrp018RequestBody = z.infer<typeof apiPrp018.requestBody>;
type ApiPrp018ResponseCreated = z.infer<
  (typeof apiPrp018.responseBodyMap)[200]
>;

export default apiPrp018;

export type {
  ApiPrp018RequestParam,
  ApiPrp018RequestQuery,
  ApiPrp018RequestBody,
  ApiPrp018ResponseCreated,
};
