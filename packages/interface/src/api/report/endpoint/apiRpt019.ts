import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpenseRequestUpdate,
  zBudgetReportExpenseResponse,
} from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt019RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpense: zBudgetReportExpenseRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpense: zBudgetReportExpenseResponse,
  }),
};

const responseErrorMap = {};

const apiRpt019 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt019RequestParam = z.infer<typeof apiRpt019.requestParam>;
type ApiRpt019RequestQuery = z.infer<typeof apiRpt019.requestQuery>;
type ApiRpt019RequestBody = z.infer<typeof apiRpt019.requestBody>;
type ApiRpt019ResponseOk = z.infer<(typeof apiRpt019.responseBodyMap)[200]>;

export default apiRpt019;

export type {
  ApiRpt019RequestParam,
  ApiRpt019RequestQuery,
  ApiRpt019RequestBody,
  ApiRpt019ResponseOk,
};
