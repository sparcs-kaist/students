import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetProposalIncomeDocumentReview } from "../type/budget-proposal-income-document-review.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 IncomeDocumentReview를 조회합니다.
 */

const url = () =>
  `/manager/proposals/budget-proposals/income-document-review/read`;
const method = "GET";
export const ApiPrp017RequestUrl =
  "/manager/proposals/budget-proposals/income-document-review/read";

const requestParam = z.object({
  budgetProposalIncomeRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeDocumentReview: z.array(
      zBudgetProposalIncomeDocumentReview,
    ),
  }),
};

const responseErrorMap = {};

const apiPrp017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp017RequestParam = z.infer<typeof apiPrp017.requestParam>;
type ApiPrp017RequestQuery = z.infer<typeof apiPrp017.requestQuery>;
type ApiPrp017RequestBody = z.infer<typeof apiPrp017.requestBody>;
type ApiPrp017ResponseCreated = z.infer<
  (typeof apiPrp017.responseBodyMap)[200]
>;

export default apiPrp017;

export type {
  ApiPrp017RequestParam,
  ApiPrp017RequestQuery,
  ApiPrp017RequestBody,
  ApiPrp017ResponseCreated,
};
