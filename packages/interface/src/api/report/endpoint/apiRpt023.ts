import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpenseSubmitRequestUpdate,
  zBudgetReportExpenseSubmitResponse,
} from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt023RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpense: zBudgetReportExpenseSubmitRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportExpense: zBudgetReportExpenseSubmitResponse,
  }),
};

const responseErrorMap = {};

const apiRpt023 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt023RequestParam = z.infer<typeof apiRpt023.requestParam>;
type ApiRpt023RequestQuery = z.infer<typeof apiRpt023.requestQuery>;
type ApiRpt023RequestBody = z.infer<typeof apiRpt023.requestBody>;
type ApiRpt023ResponseOk = z.infer<(typeof apiRpt023.responseBodyMap)[200]>;

export default apiRpt023;

export type {
  ApiRpt023RequestParam,
  ApiRpt023RequestQuery,
  ApiRpt023RequestBody,
  ApiRpt023ResponseOk,
};
