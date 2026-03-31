import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalExpense,
  zBudgetProposalExpenseRequestCreate,
} from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 예산안 지출(budgetProposalExpense)을 생성합니다.
 */

const url = () => `/manager/proposals/budget-proposals/expense/create`;
const method = "POST";
export const ApiBudPrp007RequestUrl =
  "/manager/proposals/budget-proposals/expense/create";

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

const apiBudPrp007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp007RequestParam = z.infer<typeof apiBudPrp007.requestParam>;
type ApiBudPrp007RequestQuery = z.infer<typeof apiBudPrp007.requestQuery>;
type ApiBudPrp007RequestBody = z.infer<typeof apiBudPrp007.requestBody>;
type ApiBudPrp007ResponseCreated = z.infer<
  (typeof apiBudPrp007.responseBodyMap)[201]
>;

export default apiBudPrp007;

export type {
  ApiBudPrp007RequestParam,
  ApiBudPrp007RequestQuery,
  ApiBudPrp007RequestBody,
  ApiBudPrp007ResponseCreated,
};
