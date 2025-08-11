import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetReportIncomeRequestDelete } from "../type/budget-report-income.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt017RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportIncome: zBudgetReportIncomeRequestDelete,
});

const responseBodyMap = {
  [HttpStatusCode.NoContent]: z.object({}),
};

const responseErrorMap = {};

const apiRpt017 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt017RequestParam = z.infer<typeof apiRpt017.requestParam>;
type ApiRpt017RequestQuery = z.infer<typeof apiRpt017.requestQuery>;
type ApiRpt017RequestBody = z.infer<typeof apiRpt017.requestBody>;
type ApiRpt017ResponseNoContent = z.infer<
  (typeof apiRpt017.responseBodyMap)[204]
>;

export default apiRpt017;

export type {
  ApiRpt017RequestParam,
  ApiRpt017RequestQuery,
  ApiRpt017RequestBody,
  ApiRpt017ResponseNoContent,
};
