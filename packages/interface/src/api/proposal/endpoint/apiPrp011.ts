import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalExpense,
  zBudgetProposalExpenseRequestCreate,
} from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 각 단체장단 권한으로 새로운 예산안(수출)을 생성합니다.
 */

const url = () => `/president/proposals/budget-proposals/expense/create`;
const method = "POST";
export const ApiPrp011RequestUrl =
  "/president/proposals/budget-proposals/expense/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalExpense: zBudgetProposalExpenseRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetProposalExpense: zBudgetProposalExpense,
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

const apiPrp011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp011RequestParam = z.infer<typeof apiPrp011.requestParam>;
type ApiPrp011RequestQuery = z.infer<typeof apiPrp011.requestQuery>;
type ApiPrp011RequestBody = z.infer<typeof apiPrp011.requestBody>;
type ApiPrp011ResponseCreated = z.infer<
  (typeof apiPrp011.responseBodyMap)[201]
>;

export default apiPrp011;

export type {
  ApiPrp011RequestParam,
  ApiPrp011RequestQuery,
  ApiPrp011RequestBody,
  ApiPrp011ResponseCreated,
};
