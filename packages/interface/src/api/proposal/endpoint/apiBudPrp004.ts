import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetProposalIncomeRequestUpdate,
  zBudgetProposalIncomeResponse,
} from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 예산안 수입 revision(budgetProposalIncomeRevision)을 수정합니다.
 * 만약 가장 최신의 revision이 submit되어있는 상태라면, 새로운 revision을 생성합니다.
 */

const url = () => `/manager/proposals/budget-proposals/income-revision/update`;
const method = "PATCH";
export const ApiBudPrp004RequestUrl =
  "/manager/proposals/budget-proposals/income-revision/update";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetProposalIncomeRevision: zBudgetProposalIncomeRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeRevision: zBudgetProposalIncomeResponse,
  }),
};

const responseErrorMap = {};

const apiBudPrp004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp004RequestParam = z.infer<typeof apiBudPrp004.requestParam>;
type ApiBudPrp004RequestQuery = z.infer<typeof apiBudPrp004.requestQuery>;
type ApiBudPrp004RequestBody = z.infer<typeof apiBudPrp004.requestBody>;
type ApiBudPrp004ResponseOk = z.infer<
  (typeof apiBudPrp004.responseBodyMap)[200]
>;

export default apiBudPrp004;

export type {
  ApiBudPrp004RequestParam,
  ApiBudPrp004RequestQuery,
  ApiBudPrp004RequestBody,
  ApiBudPrp004ResponseOk,
};
