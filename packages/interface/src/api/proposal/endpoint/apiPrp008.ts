import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalIncome,
  zBudgetProposalIncomeRequestCreate,
} from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 각 단체장단 권한으로 새로운 예산안(수입)을 생성합니다.
 */

const url = () => `/president/budget-proposals/income`;
const method = "POST";
export const ApiPrp008RequestUrl = "/president/budget-proposals/income";

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

const apiPrp008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp008RequestParam = z.infer<typeof apiPrp008.requestParam>;
type ApiPrp008RequestQuery = z.infer<typeof apiPrp008.requestQuery>;
type ApiPrp008RequestBody = z.infer<typeof apiPrp008.requestBody>;
type ApiPrp008ResponseCreated = z.infer<
  (typeof apiPrp008.responseBodyMap)[201]
>;

export default apiPrp008;

export type {
  ApiPrp008RequestParam,
  ApiPrp008RequestQuery,
  ApiPrp008RequestBody,
  ApiPrp008ResponseCreated,
};
