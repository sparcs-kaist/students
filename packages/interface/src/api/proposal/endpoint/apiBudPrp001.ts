import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zExtractId, zId } from "@sparcs-students/interface/common/type/ids";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum";
import {
  zBudgetProposalIncome,
  zBudgetProposalIncomeRevision,
} from "@sparcs-students/interface/api/proposal/type/budget-proposal-income.type";
import {
  zBudgetProposalExpense,
  zBudgetProposalExpenseRevision,
} from "../type/budget-proposal-expense.type";

/**
 * @version v0.1
 * @description 예산안 수입 지출을 일괄 조회합니다.
 */

const url = () => `student/proposals/budget-proposals/getProposals`;
const method = "GET";
export const ApiBudPrp001RequestUrl =
  "student/proposals/budget-proposals/getProposals";

const requestParam = z.object({});

const requestQuery = z.object({
  organization: zId,
  semester: zId,
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    budgetProposal: z.object({
      budgetProposalIncomes: z.array(
        z.object({
          id: zExtractId(zBudgetProposalIncomeRevision),
          budtgetProposal: zExtractId(zBudgetProposalIncome),
          budgetDomain: z.nativeEnum(BudgetDomainEnum),
          budgetDivision: z.nativeEnum(BudgetDivisionIncomeEnum),
          name: z.string(),
          amount: z.number(),
          detail: z.string(),
          code: z.number(),
        }),
      ),
      budgetProposalExpenses: z.array(
        z.object({
          id: zExtractId(zBudgetProposalExpenseRevision),
          budgetProposalExpense: zExtractId(zBudgetProposalExpense),
          budgetDomain: z.nativeEnum(BudgetDomainEnum),
          budgetDivision: z.nativeEnum(BudgetDivisionExpenseEnum),
          budgetClassExpense: z.nativeEnum(BudgetClassExpenseEnum),
          name: z.string(),
          amount: z.number(),
          detail: z.string(),
          note: z.string(),
        }),
      ),
    }),
  }),
};

const responseErrorMap = {};

const apiBudPrp001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiBudPrp001RequestParam = z.infer<typeof apiBudPrp001.requestParam>;
type ApiBudPrp001RequestQuery = z.infer<typeof apiBudPrp001.requestQuery>;
type ApiBudPrp001RequestBody = z.infer<typeof apiBudPrp001.requestBody>;
type ApiBudPrp001ResponseOk = z.infer<
  (typeof apiBudPrp001.responseBodyMap)[200]
>;

export default apiBudPrp001;

export type {
  ApiBudPrp001RequestParam,
  ApiBudPrp001RequestQuery,
  ApiBudPrp001RequestBody,
  ApiBudPrp001ResponseOk,
};
