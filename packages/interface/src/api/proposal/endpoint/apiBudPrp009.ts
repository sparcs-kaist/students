import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalExpenseRequestUpdate,
  zBudgetProposalExpenseResponse,
} from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 각 매니저 권한으로 예산 지출을 수정합니다.
 * 만약 가장 최신의 revision이 submit되어있는 상태라면, 새로운 revision을 생성합니다
 */

const url = () => `/manager/proposals/budget-proposals/expense-revision/update`;
const method = "PUT";
export const ApiBudPrp009RequestUrl =
  "/manager/proposals/budget-proposals/expense-revision/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalExpenseRevision: zBudgetProposalExpenseRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalExpenseRevision: zBudgetProposalExpenseResponse,
  }),
};

const responseErrorMap = {};

const apiBudPrp009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp009RequestParam = z.infer<typeof apiBudPrp009.requestParam>;
type ApiBudPrp009RequestQuery = z.infer<typeof apiBudPrp009.requestQuery>;
type ApiBudPrp009RequestBody = z.infer<typeof apiBudPrp009.requestBody>;
type ApiBudPrp009ResponseOk = z.infer<
  (typeof apiBudPrp009.responseBodyMap)[200]
>;

export default apiBudPrp009;

export type {
  ApiBudPrp009RequestParam,
  ApiBudPrp009RequestQuery,
  ApiBudPrp009RequestBody,
  ApiBudPrp009ResponseOk,
};
