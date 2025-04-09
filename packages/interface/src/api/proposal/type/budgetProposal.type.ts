import { zId } from "@sparcs-students/interface/common/type/ids";
import { z } from "zod";
import { zOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import { zHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
  DocumentItemStatusEnum,
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
  documentItemStatusEnum: z.nativeEnum(DocumentItemStatusEnum),
  budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
  budgetDivisionIncomeEnum: z.nativeEnum(BudgetDivisionIncomeEnum),
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
  documentItemStatusEnum: z.nativeEnum(DocumentItemStatusEnum),
  budgetDomainEnum: z.nativeEnum(BudgetDomainEnum),
  budgetDivisionExpenseEnum: z.nativeEnum(BudgetDivisionExpenseEnum),
  budgetClassExpenseEnum: z.nativeEnum(BudgetClassExpenseEnum),
  amount: zMoney,
  detail: z.string(),
  submittedAt: zDateTime.nullable(),
});
