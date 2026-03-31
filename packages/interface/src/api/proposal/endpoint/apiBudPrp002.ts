import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalIncome,
  zBudgetProposalIncomeRequestCreate,
} from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 예산안 수입(budgetProposalIncome)을 생성합니다.
 */

const url = () => `/manager/proposals/budget-proposals/income/create`;
const method = "POST";
export const ApiBudPrp002RequestUrl =
  "/manager/proposals/budget-proposals/income/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalIncome: zBudgetProposalIncomeRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetProposalIncome: zBudgetProposalIncome,
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

const apiBudPrp002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp002RequestParam = z.infer<typeof apiBudPrp002.requestParam>;
type ApiBudPrp002RequestQuery = z.infer<typeof apiBudPrp002.requestQuery>;
type ApiBudPrp002RequestBody = z.infer<typeof apiBudPrp002.requestBody>;
type ApiBudPrp002ResponseCreated = z.infer<
  (typeof apiBudPrp002.responseBodyMap)[201]
>;

export default apiBudPrp002;

export type {
  ApiBudPrp002RequestParam,
  ApiBudPrp002RequestQuery,
  ApiBudPrp002RequestBody,
  ApiBudPrp002ResponseCreated,
};
