import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetProposalExpenseDocumentReview } from "../type/budget-proposal-expense-document-review.type";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 ExpenseDocumentReview를 조회합니다.
 */

const url = () =>
  `/manager/proposals/budget-proposals/expense-document-review/read`;
const method = "GET";
export const ApiPrp020RequestUrl =
  "/manager/proposals/budget-proposals/expense-document-review/read";

const requestParam = z.object({
  budgetProposalExpenseRevisionId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalExpenseDocumentReview: z.array(
      zBudgetProposalExpenseDocumentReview,
    ),
  }),
};

const responseErrorMap = {};

const apiPrp020 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp020RequestParam = z.infer<typeof apiPrp020.requestParam>;
type ApiPrp020RequestQuery = z.infer<typeof apiPrp020.requestQuery>;
type ApiPrp020RequestBody = z.infer<typeof apiPrp020.requestBody>;
type ApiPrp020ResponseCreated = z.infer<
  (typeof apiPrp020.responseBodyMap)[200]
>;

export default apiPrp020;

export type {
  ApiPrp020RequestParam,
  ApiPrp020RequestQuery,
  ApiPrp020RequestBody,
  ApiPrp020ResponseCreated,
};
