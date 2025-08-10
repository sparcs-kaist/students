import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetProposalIncomeRevision } from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 예산안(수입) Revision을 조회합니다.
 */

const url = () => `/president/proposals/budget-proposals/income-revision/read`;
const method = "GET";
export const ApiPrp010RequestUrl =
  "/president/proposals/budget-proposals/income-revision/read";

const requestParam = z.object({
  budgetProposalIncomeId: z.coerce.number(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeRevisions: z.array(zBudgetProposalIncomeRevision),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: z.object({
    status: z.literal("Error"),
    message: z.literal("Unauthorized"),
  }),
};

const apiPrp010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiPrp010RequestParam = z.infer<typeof apiPrp010.requestParam>;
type ApiPrp010RequestQuery = z.infer<typeof apiPrp010.requestQuery>;
type ApiPrp010RequestBody = z.infer<typeof apiPrp010.requestBody>;
type ApiPrp010ResponseOk = z.infer<(typeof apiPrp010.responseBodyMap)[200]>;

export default apiPrp010;

export type {
  ApiPrp010RequestParam,
  ApiPrp010RequestQuery,
  ApiPrp010RequestBody,
  ApiPrp010ResponseOk,
};
