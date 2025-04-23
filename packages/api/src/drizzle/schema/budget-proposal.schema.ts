import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";
import { Organization } from "./organization.schema";
import { Semester } from "./semester.schema";
import { ProjectProposal } from "./project-proposal.schema";
import { User } from "./user.schema";

export const BudgetProposalIncome = mysqlTable(
  "budget_proposal_income",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalIncomeOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "budget_proposal_income_organization_id_fk",
    }),
    budgetProposalIncomeSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "budget_proposal_income_semester_id_fk",
    }),
  }),
);

export const BudgetProposalIncomeRevision = mysqlTable(
  "budget_proposal_income_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetProposalId: int("budget_proposal_id").notNull(),
    budgetDomainEnum: int("budget_domain_enum"),
    budgetDivisionIncomeEnum: int("budget_division_income_enum"),
    name: varchar("name", { length: 30 }).notNull(),
    amount: int("amount"),
    detail: text("detail"),
    submittedAt: timestamp("submitted_at"),
    agendaId: int("agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalIncomeRevisionBudgetProposalIdFk: foreignKey({
      columns: [table.budgetProposalId],
      foreignColumns: [BudgetProposalIncome.id],
      name: "budget_proposal_income_revision_budget_proposal_id_fk",
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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalExpenseOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "budget_proposal_expense_organization_id_fk",
    }),
    budgetProposalExpenseSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "budget_proposal_expense_semester_id_fk",
    }),
  }),
);

export const BudgetProposalExpenseRevision = mysqlTable(
  "budget_proposal_expense_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetProposalExpenseId: int("budget_proposal_expense_id").notNull(),
    budgetDomainEnum: int("budget_domain_enum"),
    budgetDivisionExpenseEnum: int("budget_division_expense_enum"),
    projectId: int("project_id"),
    budgetClassExpenseEnum: int("budget_class_expense_enum"),
    amount: int("amount"),
    detail: text("detail"),
    submittedAt: timestamp("submitted_at"),
    agendaId: int("agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetProposalExpenseRevisionBudgetProposalExpenseIdFk: foreignKey({
      columns: [table.budgetProposalExpenseId],
      foreignColumns: [BudgetProposalExpense.id],
      name: "budget_proposal_expense_revision_budget_proposal_expense_id_fk",
    }),
    budgetProposalExpenseRevisionProjectIdFk: foreignKey({
      columns: [table.projectId],
      foreignColumns: [ProjectProposal.id],
      name: "budget_proposal_expense_revision_project_id_fk",
    }),
    // budgetProposalExpenseRevisionAgendaIdFk: foreignKey({
    //   columns: [table.agendaId],
    //   foreignColumns: [Agenda.id],
    //   name: "budget_proposal_expense_revision_agenda_id_fk",
    // }),
  }),
);

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
      name: "budget_proposal_income_review_budget_proposal_id_fk",
    }),
    budgetProposalIncomeReviewUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "budget_proposal_income_review_user_id_fk",
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
      name: "budget_proposal_expense_review_budget_proposal_expense_id_fk",
    }),
    budgetProposalExpenseReviewUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "budget_proposal_expense_review_user_id_fk",
    }),
  }),
);
