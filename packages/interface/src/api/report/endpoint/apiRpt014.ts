import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";
import { zBudgetReportIncomeRevision } from "../type/budget-report-income.type";
import { zBudgetReportExpenseRevision } from "../type/budget-report-expense.type";

const url = () => ``;
const method = "";
export const ApiRpt014RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetReport: z.object({
      budgetReportIncomes: z.array(
        z.object({
          id: zExtractId(zBudgetReportIncomeRevision),
          budgetDomain: z.nativeEnum(BudgetDomainEnum),
          budgetDivision: z.nativeEnum(BudgetDivisionIncomeEnum),
          name: z.string(),
          proposalAmount: z.number(),
          reportAmount: z.number(),
          detail: z.string(),
          note: z.string(),
        }),
      ),
      budgetReportExpenses: z.array(
        z.object({
          id: zExtractId(zBudgetReportExpenseRevision),
          budgetDomain: z.nativeEnum(BudgetDomainEnum),
          budgetDivision: z.nativeEnum(BudgetDivisionExpenseEnum),
          name: z.string(),
          budgetClassExpense: z.nativeEnum(BudgetClassExpenseEnum),
          proposalAmount: z.number(),
          reportAmount: z.number(),
          detail: z.string(),
          note: z.string(),
        }),
      ),
    }),
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
type ApiRpt014ResponseOk = z.infer<(typeof apiRpt014.responseBodyMap)[200]>;

export default apiRpt014;

export type {
  ApiRpt014RequestParam,
  ApiRpt014RequestQuery,
  ApiRpt014RequestBody,
  ApiRpt014ResponseOk,
};
