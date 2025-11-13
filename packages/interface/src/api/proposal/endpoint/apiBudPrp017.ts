import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetProposalIncomeRevision } from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 해당 날짜에 제출된 예산안 지출 revision 제출본을 조회합니다.
 */

const url = () =>
  `student/proposals/budget-proposals/expense/getRevisionsByDate`;
const method = "GET";
export const ApiBudPrp017RequestUrl =
  "student/proposals/budget-proposals/expense/getRevisionsByDate";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposalIncomeRevisions: z.array(zBudgetProposalIncomeRevision),
  }),
};

const responseErrorMap = {};

const apiBudPrp017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp017RequestParam = z.infer<typeof apiBudPrp017.requestParam>;
type ApiBudPrp017RequestQuery = z.infer<typeof apiBudPrp017.requestQuery>;
type ApiBudPrp017RequestBody = z.infer<typeof apiBudPrp017.requestBody>;
type ApiBudPrp017ResponseOk = z.infer<
  (typeof apiBudPrp017.responseBodyMap)[200]
>;

export default apiBudPrp017;

export type {
  ApiBudPrp017RequestParam,
  ApiBudPrp017RequestQuery,
  ApiBudPrp017RequestBody,
  ApiBudPrp017ResponseOk,
};
