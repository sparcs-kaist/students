import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalExpenseRevision,
  zBudgetProposalExpenseRevisionRequestCreate,
} from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 각 단체장단 권한으로 새로운 예산안(수출) Revision을 생성합니다.
 */

const url = () =>
  `/president/proposals/budget-proposals/expense-revision/create`;
const method = "POST";
export const ApiPrp012RequestUrl =
  "/president/proposals/budget-proposals/expense-revision/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalExpenseRevision: zBudgetProposalExpenseRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetProposalExpenseRevision: zBudgetProposalExpenseRevision,
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

const apiPrp012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp012RequestParam = z.infer<typeof apiPrp012.requestParam>;
type ApiPrp012RequestQuery = z.infer<typeof apiPrp012.requestQuery>;
type ApiPrp012RequestBody = z.infer<typeof apiPrp012.requestBody>;
type ApiPrp012ResponseCreated = z.infer<
  (typeof apiPrp012.responseBodyMap)[201]
>;

export default apiPrp012;

export type {
  ApiPrp012RequestParam,
  ApiPrp012RequestQuery,
  ApiPrp012RequestBody,
  ApiPrp012ResponseCreated,
};
