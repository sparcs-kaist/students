import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalExpenseRevision,
  zBudgetProposalExpenseRevisionRequestCreate,
} from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 매니저(organizationManager) 권한으로 새로운 예산안 지출 revision(budgetProposalExpenseRevision)을 생성합니다.
 */

const url = () => `/manager/proposals/budget-proposals/expense-revision/create`;
const method = "POST";
export const ApiBudPrp008RequestUrl =
  "/manager/proposals/budget-proposals/expense-revision/create";

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

const apiBudPrp008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp008RequestParam = z.infer<typeof apiBudPrp008.requestParam>;
type ApiBudPrp008RequestQuery = z.infer<typeof apiBudPrp008.requestQuery>;
type ApiBudPrp008RequestBody = z.infer<typeof apiBudPrp008.requestBody>;
type ApiBudPrp008ResponseCreated = z.infer<
  (typeof apiBudPrp008.responseBodyMap)[201]
>;

export default apiBudPrp008;

export type {
  ApiBudPrp008RequestParam,
  ApiBudPrp008RequestQuery,
  ApiBudPrp008RequestBody,
  ApiBudPrp008ResponseCreated,
};
