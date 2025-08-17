import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeSubmitRequestUpdate,
  zBudgetReportIncomeSubmitResponse,
} from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt018RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncome: zBudgetReportIncomeSubmitRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncome: zBudgetReportIncomeSubmitResponse,
  }),
};

const responseErrorMap = {};

const apiRpt018 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt018RequestParam = z.infer<typeof apiRpt018.requestParam>;
type ApiRpt018RequestQuery = z.infer<typeof apiRpt018.requestQuery>;
type ApiRpt018RequestBody = z.infer<typeof apiRpt018.requestBody>;
type ApiRpt018ResponseOk = z.infer<(typeof apiRpt018.responseBodyMap)[200]>;

export default apiRpt018;

export type {
  ApiRpt018RequestParam,
  ApiRpt018RequestQuery,
  ApiRpt018RequestBody,
  ApiRpt018ResponseOk,
};
