import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetProposalExpenseResponse } from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 예산안 지출 revision(budgetProposalExpenseRevision)을 제출합니다.
 */

const url = () => `/manager/proposals/budget-proposals/expense-revision/submit`;
const method = "PATCH";
export const ApiBudPrp010RequestUrl =
  "/manager/proposals/budget-proposals/expense-revision/submit";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({ budgetProposalExpenseRevisionId: zId });

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalExpenseRevision: zBudgetProposalExpenseResponse,
  }),
};

const responseErrorMap = {};

const apiBudPrp010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp010RequestParam = z.infer<typeof apiBudPrp010.requestParam>;
type ApiBudPrp010RequestQuery = z.infer<typeof apiBudPrp010.requestQuery>;
type ApiBudPrp010RequestBody = z.infer<typeof apiBudPrp010.requestBody>;
type ApiBudPrp010ResponseOk = z.infer<
  (typeof apiBudPrp010.responseBodyMap)[200]
>;

export default apiBudPrp010;

export type {
  ApiBudPrp010RequestParam,
  ApiBudPrp010RequestQuery,
  ApiBudPrp010RequestBody,
  ApiBudPrp010ResponseOk,
};
