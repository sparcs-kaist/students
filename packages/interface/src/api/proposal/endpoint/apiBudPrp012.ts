import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetProposalIncomeRevision } from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 예산안 수입 revision 최신본을 조회합니다.
 */

const url = () => `student/proposals/budget-proposals/income/getRecent`;
const method = "GET";
export const ApiBudPrp012RequestUrl =
  "student/proposals/budget-proposals/income/getRecent";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeRevision: zBudgetProposalIncomeRevision,
  }),
};

const responseErrorMap = {};

const apiBudPrp012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp012RequestParam = z.infer<typeof apiBudPrp012.requestParam>;
type ApiBudPrp012RequestQuery = z.infer<typeof apiBudPrp012.requestQuery>;
type ApiBudPrp012RequestBody = z.infer<typeof apiBudPrp012.requestBody>;
type ApiBudPrp012ResponseOk = z.infer<
  (typeof apiBudPrp012.responseBodyMap)[200]
>;

export default apiBudPrp012;

export type {
  ApiBudPrp012RequestParam,
  ApiBudPrp012RequestQuery,
  ApiBudPrp012RequestBody,
  ApiBudPrp012ResponseOk,
};
