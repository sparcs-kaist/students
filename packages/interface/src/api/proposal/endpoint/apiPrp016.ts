import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalIncomeDocumentReview,
  zBudgetProposalIncomeDocumentReviewRequestCreate,
} from "../type/budget-proposal-income-document-review.type";

/**
 * @version v0.1
 * @description 각 집행부원 권한으로 IncomeDocumentReview를 생성합니다.
 */

const url = () =>
  `/staff/proposals/budget-proposals/income-document-review/create`;
const method = "POST";
export const ApiPrp016RequestUrl =
  "/staff/proposals/budget-proposals/income-document-review/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalIncomeDocumentReview:
    zBudgetProposalIncomeDocumentReviewRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetProposalIncomeDocumentReview: zBudgetProposalIncomeDocumentReview,
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

const apiPrp016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp016RequestParam = z.infer<typeof apiPrp016.requestParam>;
type ApiPrp016RequestQuery = z.infer<typeof apiPrp016.requestQuery>;
type ApiPrp016RequestBody = z.infer<typeof apiPrp016.requestBody>;
type ApiPrp016ResponseCreated = z.infer<
  (typeof apiPrp016.responseBodyMap)[201]
>;

export default apiPrp016;

export type {
  ApiPrp016RequestParam,
  ApiPrp016RequestQuery,
  ApiPrp016RequestBody,
  ApiPrp016ResponseCreated,
};
