import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetProposalExpenseRevision } from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 예산안(수출) Revision을 조회합니다.
 */

const url = () => `/manager/proposals/budget-proposals/expense-revision/read`;
const method = "GET";
export const ApiPrp013RequestUrl =
  "/manager/proposals/budget-proposals/expense-revision/read";

const requestParam = z.object({
  budgetProposalExpenseId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalExpenseRevisions: z.array(zBudgetProposalExpenseRevision),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiPrp013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp013RequestParam = z.infer<typeof apiPrp013.requestParam>;
type ApiPrp013RequestQuery = z.infer<typeof apiPrp013.requestQuery>;
type ApiPrp013RequestBody = z.infer<typeof apiPrp013.requestBody>;
type ApiPrp013ResponseOk = z.infer<(typeof apiPrp013.responseBodyMap)[200]>;

export default apiPrp013;

export type {
  ApiPrp013RequestParam,
  ApiPrp013RequestQuery,
  ApiPrp013RequestBody,
  ApiPrp013ResponseOk,
};
