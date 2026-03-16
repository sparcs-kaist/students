import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";

/**
 * @version v0.1
 * @description 매니저(manager) 권한으로 예산안 지출(budgetProposalExpense)을 삭제합니다.
 */

const url = () => `/manager/proposals/budget-proposals/expense/delete`;
const method = "DELETE";
export const ApiBudPrp011RequestUrl =
  "/manager/proposals/budget-proposals/expense/delete";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {};

const responseErrorMap = {};

const apiBudPrp011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp011RequestParam = z.infer<typeof apiBudPrp011.requestParam>;
type ApiBudPrp011RequestQuery = z.infer<typeof apiBudPrp011.requestQuery>;
type ApiBudPrp011RequestBody = z.infer<typeof apiBudPrp011.requestBody>;

export default apiBudPrp011;

export type {
  ApiBudPrp011RequestParam,
  ApiBudPrp011RequestQuery,
  ApiBudPrp011RequestBody,
};
