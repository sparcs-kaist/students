import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportExpenseRequestCreate,
  zBudgetReportExpenseResponse,
} from "../type/budget-report-expense.type";

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
  budgetReportExpense: zBudgetReportExpenseRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportExpense: zBudgetReportExpenseResponse,
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
type ApiRpt018ResponseCreated = z.infer<
  (typeof apiRpt018.responseBodyMap)[201]
>;

export default apiRpt018;

export type {
  ApiRpt018RequestParam,
  ApiRpt018RequestQuery,
  ApiRpt018RequestBody,
  ApiRpt018ResponseCreated,
};
