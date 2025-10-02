import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalExpenseDocumentReview,
  zBudgetProposalExpenseDocumentReviewRequestCreate,
} from "../type/budget-proposal-expense-document-review.type";

/**
 * @version v0.1
 * @description 각 집행부원 권한으로 ExpenseDocumentReview를 생성합니다.
 */

const url = () =>
  `/staff/proposals/budget-proposals/expense-document-review/create`;
const method = "POST";
export const ApiPrp019RequestUrl =
  "/staff/proposals/budget-proposals/expense-document-review/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalExpenseDocumentReview:
    zBudgetProposalExpenseDocumentReviewRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetProposalExpenseDocumentReview: zBudgetProposalExpenseDocumentReview,
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

const apiPrp019 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp019RequestParam = z.infer<typeof apiPrp019.requestParam>;
type ApiPrp019RequestQuery = z.infer<typeof apiPrp019.requestQuery>;
type ApiPrp019RequestBody = z.infer<typeof apiPrp019.requestBody>;
type ApiPrp019ResponseCreated = z.infer<
  (typeof apiPrp019.responseBodyMap)[201]
>;

export default apiPrp019;

export type {
  ApiPrp019RequestParam,
  ApiPrp019RequestQuery,
  ApiPrp019RequestBody,
  ApiPrp019ResponseCreated,
};
