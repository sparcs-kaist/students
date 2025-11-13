import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetProposalExpenseRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 예산안 지출 revision 최신본을 조회합니다.
 */

const url = () => `student/proposals/budget-proposals/expense/getRecent`;
const method = "GET";
export const ApiBudPrp013RequestUrl =
  "student/proposals/budget-proposals/expense/getRecent";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalExpenseRevision: zBudgetProposalExpenseRevision,
  }),
};

const responseErrorMap = {};

const apiBudPrp013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp013RequestParam = z.infer<typeof apiBudPrp013.requestParam>;
type ApiBudPrp013RequestQuery = z.infer<typeof apiBudPrp013.requestQuery>;
type ApiBudPrp013RequestBody = z.infer<typeof apiBudPrp013.requestBody>;
type ApiBudPrp013ResponseOk = z.infer<
  (typeof apiBudPrp013.responseBodyMap)[200]
>;

export default apiBudPrp013;

export type {
  ApiBudPrp013RequestParam,
  ApiBudPrp013RequestQuery,
  ApiBudPrp013RequestBody,
  ApiBudPrp013ResponseOk,
};
