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
export const ApiRpt016RequestUrl = "";

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

const apiRpt016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt016RequestParam = z.infer<typeof apiRpt016.requestParam>;
type ApiRpt016RequestQuery = z.infer<typeof apiRpt016.requestQuery>;
type ApiRpt016RequestBody = z.infer<typeof apiRpt016.requestBody>;
type ApiRpt016ResponseOk = z.infer<(typeof apiRpt016.responseBodyMap)[200]>;

export default apiRpt016;

export type {
  ApiRpt016RequestParam,
  ApiRpt016RequestQuery,
  ApiRpt016RequestBody,
  ApiRpt016ResponseOk,
};
