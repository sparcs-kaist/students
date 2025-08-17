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
export const ApiRpt015RequestUrl = "";

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

const apiRpt015 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt015RequestParam = z.infer<typeof apiRpt015.requestParam>;
type ApiRpt015RequestQuery = z.infer<typeof apiRpt015.requestQuery>;
type ApiRpt015RequestBody = z.infer<typeof apiRpt015.requestBody>;
type ApiRpt015ResponseCreated = z.infer<
  (typeof apiRpt015.responseBodyMap)[201]
>;

export default apiRpt015;

export type {
  ApiRpt015RequestParam,
  ApiRpt015RequestQuery,
  ApiRpt015RequestBody,
  ApiRpt015ResponseCreated,
};
