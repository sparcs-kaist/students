import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zBudgetReportIncomeRequestUpdate,
  zBudgetReportIncomeResponse,
} from "../type/budget-report-income.type";

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
  budgetReportIncomeRevision: zBudgetReportIncomeRequestUpdate,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReportIncomeRevision: zBudgetReportIncomeResponse,
  }),
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
type ApiRpt017ResponseOk = z.infer<(typeof apiRpt017.responseBodyMap)[200]>;

export default apiRpt017;

export type {
  ApiRpt017RequestParam,
  ApiRpt017RequestQuery,
  ApiRpt017RequestBody,
  ApiRpt017ResponseOk,
};
