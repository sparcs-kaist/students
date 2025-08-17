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
export const ApiRpt022RequestUrl = "";

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

const apiRpt022 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt022RequestParam = z.infer<typeof apiRpt022.requestParam>;
type ApiRpt022RequestQuery = z.infer<typeof apiRpt022.requestQuery>;
type ApiRpt022RequestBody = z.infer<typeof apiRpt022.requestBody>;
type ApiRpt022ResponseOk = z.infer<(typeof apiRpt022.responseBodyMap)[200]>;

export default apiRpt022;

export type {
  ApiRpt022RequestParam,
  ApiRpt022RequestQuery,
  ApiRpt022RequestBody,
  ApiRpt022ResponseOk,
};
