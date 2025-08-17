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
export const ApiRpt020RequestUrl = "";

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

const apiRpt020 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt020RequestParam = z.infer<typeof apiRpt020.requestParam>;
type ApiRpt020RequestQuery = z.infer<typeof apiRpt020.requestQuery>;
type ApiRpt020RequestBody = z.infer<typeof apiRpt020.requestBody>;
type ApiRpt020ResponseCreated = z.infer<
  (typeof apiRpt020.responseBodyMap)[201]
>;

export default apiRpt020;

export type {
  ApiRpt020RequestParam,
  ApiRpt020RequestQuery,
  ApiRpt020RequestBody,
  ApiRpt020ResponseCreated,
};
