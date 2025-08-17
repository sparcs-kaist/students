import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeRevisionRequestCreate,
  zBudgetReportIncomeRevisionResponse,
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
  budgetReportIncomeRevision: zBudgetReportIncomeRevisionRequestCreate,
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({
    budgetReportIncomeRevision: zBudgetReportIncomeRevisionResponse,
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
type ApiRpt016ResponseCreated = z.infer<
  (typeof apiRpt016.responseBodyMap)[201]
>;

export default apiRpt016;

export type {
  ApiRpt016RequestParam,
  ApiRpt016RequestQuery,
  ApiRpt016RequestBody,
  ApiRpt016ResponseCreated,
};
