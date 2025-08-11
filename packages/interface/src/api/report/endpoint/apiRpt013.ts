import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zExtractId } from "@sparcs-students/interface/common/type/ids";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zSemester } from "@sparcs-students/interface/api/semester/";
import { zBudgetReportIncomeRevision } from "../type/budget-report-income.type";
import { zBudgetReportExpenseRevision } from "../type/budget-report-expense.type";

const url = () => ``;
const method = "";
export const ApiRpt013RequestUrl = "";

const requestParam = z.object({});

const requestQuery = z.object({
  budgetReportInfo: z.object({
    organization: zExtractId(zOrganization),
    semester: zExtractId(zSemester),
  }),
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

const apiRpt013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRpt013RequestParam = z.infer<typeof apiRpt013.requestParam>;
type ApiRpt013RequestQuery = z.infer<typeof apiRpt013.requestQuery>;
type ApiRpt013RequestBody = z.infer<typeof apiRpt013.requestBody>;
type ApiRpt013ResponseOk = z.infer<(typeof apiRpt013.responseBodyMap)[200]>;

export default apiRpt013;

export type {
  ApiRpt013RequestParam,
  ApiRpt013RequestQuery,
  ApiRpt013RequestBody,
  ApiRpt013ResponseOk,
};
