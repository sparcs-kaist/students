import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetClassExpenseE,
  BudgetDivisionExpenseE,
  BudgetDivisionIncomeE,
  BudgetDomainE,
  DocumentItemStatusE,
} from "@sparcs-students/interface/common/enum";
import { zDateTime } from "@sparcs-students/interface/common/type/time.type";
import {
  zDocumentItemName,
  zMoney,
} from "@sparcs-students/interface/common/stringLength";
import { zProjectProposal } from "./projectProposal.type";

// BudgetProposalIncome: 예산안 수입 각 행 엔티티
export const zBudgetProposalIncome = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  halfYear: zHalfYear.pick({ id: true }),
  // budgetReportIncome: zBudgetReportIncome.pick({ id: true }).nullable(),
  documentItemStatusEnum: z.nativeEnum(DocumentItemStatusE),
  budgetDomainEnum: z.nativeEnum(BudgetDomainE),
  budgetDivisionIncomeEnum: z.nativeEnum(BudgetDivisionIncomeE),
  name: zDocumentItemName,
  amount: zMoney,
  detail: z.string(),
  submittedAt: zDateTime.nullable(),
});

// BudgetProposalExpense: 예산안 각 행 엔티티
export const zBudgetProposalExpense = z.object({
  id: zId,
  organization: zOrganization.pick({ id: true }),
  halfYear: zHalfYear.pick({ id: true }),
  projectProposal: zProjectProposal.pick({ id: true }),
  // budgetReportReport: zBudgetReportIncome.pick({ id: true }).nullable(),
  documentItemStatusEnum: z.nativeEnum(DocumentItemStatusE),
  budgetDomainEnum: z.nativeEnum(BudgetDomainE),
  budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseE),
  budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseE),
  amount: zMoney,
  detail: z.string(),
  submittedAt: zDateTime.nullable(),
});
