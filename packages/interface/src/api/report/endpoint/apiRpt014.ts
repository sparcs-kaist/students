import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeRequestCreate,
  zBudgetReportIncomeResponse,
} from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt014RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncome: zBudgetReportIncomeRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportIncome: zBudgetReportIncomeResponse,
  }),
};

const responseErrorMap = {};

const apiRpt014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt014RequestParam = z.infer<typeof apiRpt014.requestParam>;
type ApiRpt014RequestQuery = z.infer<typeof apiRpt014.requestQuery>;
type ApiRpt014RequestBody = z.infer<typeof apiRpt014.requestBody>;
type ApiRpt014ResponseCreated = z.infer<
  (typeof apiRpt014.responseBodyMap)[201]
>;

export default apiRpt014;

export type {
  ApiRpt014RequestParam,
  ApiRpt014RequestQuery,
  ApiRpt014RequestBody,
  ApiRpt014ResponseCreated,
};
