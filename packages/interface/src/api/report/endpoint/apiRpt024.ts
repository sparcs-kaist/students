import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetReportExpenseRequestDelete } from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt024RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpense: zBudgetReportExpenseRequestDelete,
});

const responseBodyMap = {
  [HttpStatusCode.NoContent]: z.object({}),
};

const responseErrorMap = {};

const apiRpt024 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt024RequestParam = z.infer<typeof apiRpt024.requestParam>;
type ApiRpt024RequestQuery = z.infer<typeof apiRpt024.requestQuery>;
type ApiRpt024RequestBody = z.infer<typeof apiRpt024.requestBody>;
type ApiRpt024ResponseNoContent = z.infer<
  (typeof apiRpt024.responseBodyMap)[204]
>;

export default apiRpt024;

export type {
  ApiRpt024RequestParam,
  ApiRpt024RequestQuery,
  ApiRpt024RequestBody,
  ApiRpt024ResponseNoContent,
};
