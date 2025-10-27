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
export const ApiBudPrp003RequestUrl =
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

const apiBudPrp003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp003RequestParam = z.infer<typeof apiBudPrp003.requestParam>;
type ApiBudPrp003RequestQuery = z.infer<typeof apiBudPrp003.requestQuery>;
type ApiBudPrp003RequestBody = z.infer<typeof apiBudPrp003.requestBody>;
type ApiBudPrp003ResponseCreated = z.infer<
  (typeof apiBudPrp003.responseBodyMap)[201]
>;

export default apiBudPrp003;

export type {
  ApiBudPrp003RequestParam,
  ApiBudPrp003RequestQuery,
  ApiBudPrp003RequestBody,
  ApiBudPrp003ResponseCreated,
};
