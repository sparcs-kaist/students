import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zBudgetReportExpenseRequestDelete } from "../type/budget-report-expense.type";

/**
 * @version v0.1
 * @description
 */

const url = () => ``;
const method = "";
export const ApiRpt021RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  budgetReportExpense: zBudgetReportExpenseRequestDelete,
});

const responseBodyMap = {
  [HttpStatusCode.NoContent]: z.object({}),
};

const responseErrorMap = {};

const apiRpt021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt021RequestParam = z.infer<typeof apiRpt021.requestParam>;
type ApiRpt021RequestQuery = z.infer<typeof apiRpt021.requestQuery>;
type ApiRpt021RequestBody = z.infer<typeof apiRpt021.requestBody>;
type ApiRpt021ResponseNoContent = z.infer<
  (typeof apiRpt021.responseBodyMap)[204]
>;

export default apiRpt021;

export type {
  ApiRpt021RequestParam,
  ApiRpt021RequestQuery,
  ApiRpt021RequestBody,
  ApiRpt021ResponseNoContent,
};
