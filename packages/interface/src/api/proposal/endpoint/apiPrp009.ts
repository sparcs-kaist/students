import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalIncomeRevision,
  zBudgetProposalIncomeRevisionRequestCreate,
} from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 새로운 예산안(수입) Revision을 생성합니다.
 */

const url = () => `/manager/proposals/budget-proposals/income-revision/create`;
const method = "POST";
export const ApiPrp009RequestUrl =
  "/manager/proposals/budget-proposals/income-revision/create";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalIncomeRevision: zBudgetProposalIncomeRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetProposalIncomeRevision: zBudgetProposalIncomeRevision,
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

const apiPrp009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp009RequestParam = z.infer<typeof apiPrp009.requestParam>;
type ApiPrp009RequestQuery = z.infer<typeof apiPrp009.requestQuery>;
type ApiPrp009RequestBody = z.infer<typeof apiPrp009.requestBody>;
type ApiPrp009ResponseCreated = z.infer<
  (typeof apiPrp009.responseBodyMap)[201]
>;

export default apiPrp009;

export type {
  ApiPrp009RequestParam,
  ApiPrp009RequestQuery,
  ApiPrp009RequestBody,
  ApiPrp009ResponseCreated,
};
