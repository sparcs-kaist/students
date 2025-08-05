import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
  text,
  // boolean,
} from "drizzle-orm/mysql-core";
import { Organization } from "./organization.schema";
import { Semester } from "./semester.schema";
import { ProjectProposal } from "./project-proposal.schema";
import { User } from "./user.schema";

// eslint-disable-next-line import/no-cycle
import {
  BudgetReportExpense,
  BudgetReportIncome,
} from "./budget-report.schema";
import { Agenda } from "./meeting.schema";

export const BudgetProposalIncome = mysqlTable(
  "budget_proposal_income",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("halfyear_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalIncomeOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "bud_prop_inc_org_id_fk",
    }),
    budgetProposalIncomeSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "bud_prop_inc_sem_id_fk",
    }),
  }),
);

export const BudgetProposalIncomeRevision = mysqlTable(
  "budget_proposal_income_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetProposalId: int("budget_proposal_id").notNull(),
    previousBudgetReportIncomeId: int("previous_budget_report_income_id"),
    budgetDomainEnum: int("budget_domain_enum").notNull(),
    budgetDivisionIncomeEnum: int("budget_division_income_enum").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    amount: int("amount").notNull(),
    detail: text("detail").notNull(),
    note: text("note").notNull(),
    // documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    // isRemoved: boolean("is_removed"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalIncomeRevisionBudgetProposalIdFk: foreignKey({
      columns: [table.budgetProposalId],
      foreignColumns: [BudgetProposalIncome.id],
      name: "bud_prop_inc_rev_orig_id_fk",
    }),
    budgetProposalIncomeRevisionPreviousBudgetReportIncomeIdFk: foreignKey({
      columns: [table.previousBudgetReportIncomeId],
      foreignColumns: [BudgetReportIncome.id],
      name: "bud_prop_inc_rev_prev_id_fk",
    }),
    budgetProposalIncomeRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_inc_rev_cog_id_fk",
    }),
    budgetProposalIncomeRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_inc_rev_gsrc_id_fk",
    }),
    // TODO: Agenda
    // budgetProposalIncomeRevisionAgendaIdFk: foreignKey({
    //   columns: [table.agendaId],
    //   foreignColumns: [Agenda.id],
    //   name: "budget_proposal_income_revision_agenda_id_fk",
    // }),
  }),
);

export const BudgetProposalExpense = mysqlTable(
  "budget_proposal_expense",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    projectProposalId: int("project_proposal_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalExpenseOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "bud_prop_exp_org_id_fk",
    }),
    budgetProposalExpenseSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "bud_prop_exp_sem_id_fk",
    }),
    budgetProposalExpenseProjectProposalIdFk: foreignKey({
      columns: [table.projectProposalId],
      foreignColumns: [ProjectProposal.id],
      name: "bud_prop_exp_proj_id_fk",
    }),
  }),
);

export const BudgetProposalExpenseRevision = mysqlTable(
  "budget_proposal_expense_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetProposalExpenseId: int("budget_proposal_expense_id").notNull(),
    previousBudgetReportExpenseId: int("previous_budget_report_expense_id"),
    budgetDomainEnum: int("budget_domain_enum"),
    budgetDivisionExpenseEnum: int("budget_division_expense_enum"),
    budgetClassExpenseEnum: int("budget_class_expense_enum"),
    amount: int("amount"),
    detail: text("detail"),
    // documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    // isRemoved: boolean("is_removed"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalExpenseRevisionBudgetProposalExpenseIdFk: foreignKey({
      columns: [table.budgetProposalExpenseId],
      foreignColumns: [BudgetProposalExpense.id],
      name: "bud_prop_exp_rev_prop_id_fk",
    }),
    budgetProposalExpenseRevisionPreviousBudgetReportExpenseIdFk: foreignKey({
      columns: [table.previousBudgetReportExpenseId],
      foreignColumns: [BudgetReportExpense.id],
      name: "bud_prop_exp_rev_prev_id_fk",
    }),
    budgetProposalExpenseRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_exp_rev_cog_id_fk",
    }),
    budgetProposalExpenseRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_exp_rev_gsrc_id_fk",
    }),
  }),
);

// TODO: Review 관련

export const BudgetProposalIncomeReview = mysqlTable(
  "budget_proposal_income_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetProposalId: int("budget_proposal_id").notNull(),
    userId: int("user_id").notNull(),
    documentReviewStatusEnum: int("document_review_status_enum").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalIncomeReviewBudgetProposalIdFk: foreignKey({
      columns: [table.budgetProposalId],
      foreignColumns: [BudgetProposalIncome.id],
      name: "bud_prop_inc_rev_prop_id_fk",
    }),
    budgetProposalIncomeReviewUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "bud_prop_inc_rev_usr_id_fk",
    }),
  }),
);

export const BudgetProposalExpenseReview = mysqlTable(
  "budget_proposal_expense_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetProposalExpenseId: int("budget_proposal_expense_id").notNull(),
    userId: int("user_id").notNull(),
    documentReviewStatusEnum: int("document_review_status_enum").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalExpenseReviewBudgetProposalExpenseIdFk: foreignKey({
      columns: [table.budgetProposalExpenseId],
      foreignColumns: [BudgetProposalExpense.id],
      name: "bud_prop_exp_review_prop_id_fk",
    }),
    budgetProposalExpenseReviewUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "bud_prop_exp_rev_usr_id_fk",
    }),
  }),
);
