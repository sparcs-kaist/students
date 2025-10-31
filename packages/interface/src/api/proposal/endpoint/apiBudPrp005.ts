import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetProposalIncomeResponse } from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 각 매니저의 권한으로 예산 수입을 제출합니다
 */

const url = () => `/manager/proposals/budget-proposals/income-revision/submit`;
const method = "PATCH";
export const ApiBudPrp005RequestUrl =
  "/manager/proposals/budget-proposals/income-revision/submit";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({ budgetProposalIncomeRevisionId: zId });

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeRevision: zBudgetProposalIncomeResponse,
  }),
};

const responseErrorMap = {};

const apiBudPrp005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp005RequestParam = z.infer<typeof apiBudPrp005.requestParam>;
type ApiBudPrp005RequestQuery = z.infer<typeof apiBudPrp005.requestQuery>;
type ApiBudPrp005RequestBody = z.infer<typeof apiBudPrp005.requestBody>;
type ApiBudPrp005ResponseOk = z.infer<
  (typeof apiBudPrp005.responseBodyMap)[200]
>;

export default apiBudPrp005;

export type {
  ApiBudPrp005RequestParam,
  ApiBudPrp005RequestQuery,
  ApiBudPrp005RequestBody,
  ApiBudPrp005ResponseOk,
};
