import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
  text,
  date,
} from "drizzle-orm/mysql-core";
import { Semester } from "./semester.schema";
import { Organization } from "./organization.schema";
import { User } from "./user.schema";
import { File } from "./file.schema";
// eslint-disable-next-line import/no-cycle
import {
  BudgetProposalExpense,
  BudgetProposalIncome,
} from "./budget-proposal.schema";
import { ProjectReport } from "./project-report.schema";
import { Agenda } from "./meeting.schema";

export const BudgetReportIncome = mysqlTable(
  "budget_report_income",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    budgetProposalIncomeId: int("budget_proposal_income_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportIncomeOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "budget_report_income_organization_id_fk",
    }),
    budgetReportIncomeSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "budget_report_income_semester_id_fk",
    }),
    budgetReportIncomeBudgetProposalIncomeIdFk: foreignKey({
      columns: [table.budgetProposalIncomeId],
      foreignColumns: [BudgetProposalIncome.id],
      name: "budget_report_income_budget_proposal_income_id_fk",
    }),
  }),
);

export const BudgetReportIncomeRevision = mysqlTable(
  "budget_report_income_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetReportIncomeId: int("budget_report_income_id").notNull(),
    budgetDomainEnum: int("budget_domain_enum").notNull(),
    budgetDivisionIncomeEnum: int("budget_division_income_enum").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    amount: int("amount"),
    detail: text("detail"),
    note: text("note"),
    documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportIncomeRevisionBudgetReportIncomeIdFk: foreignKey({
      columns: [table.budgetReportIncomeId],
      foreignColumns: [BudgetReportIncome.id],
      name: "budget_report_income_revision_budget_report_income_id_fk",
    }),
    budgetReportIncomeRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "budget_report_income_revision_cog_agenda_id_fk",
    }),
    budgetReportIncomeRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "budget_report_income_revision_gsrc_agenda_id_fk",
    }),
  }),
);

export const BudgetReportExpense = mysqlTable(
  "budget_report_expense",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    projectReportId: int("project_report_id").notNull(),
    budgetProposalExpenseId: int("budget_proposal_expense_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportExpenseOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "budget_report_expense_organization_id_fk",
    }),
    budgetReportExpenseSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "budget_report_expense_semester_id_fk",
    }),
    budgetReportExpenseProjectReportIdFk: foreignKey({
      columns: [table.projectReportId],
      foreignColumns: [ProjectReport.id],
      name: "budget_report_expense_project_report_id_fk",
    }),
    budgetReportExpenseBudgetProposalExpenseIdFk: foreignKey({
      columns: [table.budgetProposalExpenseId],
      foreignColumns: [BudgetProposalExpense.id],
      name: "budget_report_expense_budget_proposal_expense_id_fk",
    }),
  }),
);

export const BudgetReportExpenseRevision = mysqlTable(
  "budget_report_expense_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetReportExpenseId: int("budget_report_expense_id").notNull(),
    budgetDomainEnum: int("budget_domain_enum").notNull(),
    budgetDivisionExpenseEnum: int("budget_division_expense_enum").notNull(),
    budgetClassExpenseEnum: int("budget_class_expense_enum").notNull(),
    amount: int("amount"),
    detail: text("detail"),
    note: text("note"),
    documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportExpenseRevisionBudgetReportExpenseIdFk: foreignKey({
      columns: [table.budgetReportExpenseId],
      foreignColumns: [BudgetReportExpense.id],
      name: "budget_report_expense_revision_document_id_fk",
    }),
    budgetReportExpenseRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "budget_report_expense_revision_cog_agenda_id_fk",
    }),
    budgetReportExpenseRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "budget_report_expense_revision_gsrc_agenda_id_fk",
    }),
  }),
);

// 일단 아래는 스탑.
export const Account = mysqlTable(
  "account",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    ownerName: varchar("owner_name", { length: 255 }).notNull(),
    budgetDomainEnum: int("budget_domain_enum").notNull(),
    accountNumber: varchar("account_number", { length: 255 }).notNull(),
    accountBank: varchar("account_bank", { length: 255 }).notNull(),
    accountFileId: int("account_file_id").notNull(),
    cardNumber: varchar("card_number", { length: 255 }),
    cardFileId: int("card_file_id"),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    accountOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "account_organization_id_fk",
    }),
    accountFileIdFk: foreignKey({
      columns: [table.accountFileId],
      foreignColumns: [File.id],
      name: "account_account_file_id_fk",
    }),
    cardFileIdFk: foreignKey({
      columns: [table.cardFileId],
      foreignColumns: [File.id],
      name: "account_card_file_id_fk",
    }),
  }),
);

export const BudgetReportBankRecord = mysqlTable(
  "budget_report_bank_record",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    incomeId: int("income_id"),
    expenseId: int("expense_id"),
    managerId: int("manager_id").notNull(),
    budgetDomainEnum: int("budget_domain_enum").notNull(),
    accountId: int("account_id").notNull(),
    detail: text("detail").notNull(),
    transactionTypeEnum: int("transaction_type_enum").notNull(),
    amount: int("amount").notNull(),
    transactionDate: date("transaction_date").notNull(),
    targetAccount: varchar("target_account", { length: 255 }).notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportBankRecordIncomeIdFk: foreignKey({
      columns: [table.incomeId],
      foreignColumns: [BudgetReportIncome.id],
      name: "budget_report_bank_record_income_id_fk",
    }),
    budgetReportBankRecordExpenseIdFk: foreignKey({
      columns: [table.expenseId],
      foreignColumns: [BudgetReportExpense.id],
      name: "budget_report_bank_record_expense_id_fk",
    }),
    budgetReportBankRecordManagerIdFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [User.id],
      name: "budget_report_bank_record_manager_id_fk",
    }),
    budgetReportBankRecordAccountIdFk: foreignKey({
      columns: [table.accountId],
      foreignColumns: [Account.id],
      name: "budget_report_bank_record_account_id_fk",
    }),
  }),
);

export const BudgetReportFile = mysqlTable(
  "budget_report_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetReportRecordId: int("budget_report_record_id").notNull(),
    fileId: int("file_id").notNull(),
    reportFileTypeEnum: int("report_file_type_enum").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportFileRecordIdFk: foreignKey({
      columns: [table.budgetReportRecordId],
      foreignColumns: [BudgetReportBankRecord.id],
      name: "budget_report_file_budget_report_record_id_fk",
    }),
    budgetReportFileFileIdFk: foreignKey({
      columns: [table.fileId],
      foreignColumns: [File.id],
      name: "budget_report_file_file_id_fk",
    }),
  }),
);
