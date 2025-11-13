import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zId } from "@sparcs-students/interface/common/type/ids";
import { zBudgetProposalIncomeRevision } from "../type/budget-proposal-income.type";

/**
 * @version v0.1
 * @description 해당 날짜에 제출된 예산안 수입 revision 제출본을 조회합니다.
 */

const url = () =>
  `student/proposals/budget-proposals/income/getRevisionsByDate`;
const method = "GET";
export const ApiBudPrp016RequestUrl =
  "student/proposals/budget-proposals/income/getRevisionsByDate";

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

const apiBudPrp016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp016RequestParam = z.infer<typeof apiBudPrp016.requestParam>;
type ApiBudPrp016RequestQuery = z.infer<typeof apiBudPrp016.requestQuery>;
type ApiBudPrp016RequestBody = z.infer<typeof apiBudPrp016.requestBody>;
type ApiBudPrp016ResponseOk = z.infer<
  (typeof apiBudPrp016.responseBodyMap)[200]
>;

export default apiBudPrp016;

export type {
  ApiBudPrp016RequestParam,
  ApiBudPrp016RequestQuery,
  ApiBudPrp016RequestBody,
  ApiBudPrp016ResponseOk,
};
