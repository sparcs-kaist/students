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
import { Student } from "./user.schema";

// eslint-disable-next-line import/no-cycle
import { Agenda } from "./meeting.schema";

export const BudgetReportIncome = mysqlTable(
  "budget_report_income",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportIncomeOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "bud_prop_inc_org_id_fk",
    }),
    budgetReportIncomeSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "bud_prop_inc_sem_id_fk",
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
    amount: int("amount").notNull(),
    detail: text("detail").notNull(),
    code: int("code").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportIncomeRevisionBudgetReportIdFk: foreignKey({
      columns: [table.budgetReportIncomeId],
      foreignColumns: [BudgetReportIncome.id],
      name: "bud_prop_inc_rev_orig_id_fk",
    }),
    budgetReportIncomeRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_inc_rev_cog_id_fk",
    }),
    budgetReportIncomeRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_inc_rev_gsrc_id_fk",
    }),
    // TODO: Agenda
    // budgetReportIncomeRevisionAgendaIdFk: foreignKey({
    //   columns: [table.agendaId],
    //   foreignColumns: [Agenda.id],
    //   name: "budget_report_income_revision_agenda_id_fk",
    // }),
  }),
);

export const BudgetReportExpense = mysqlTable(
  "budget_report_expense",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportExpenseOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "bud_prop_exp_org_id_fk",
    }),
    budgetReportExpenseSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "bud_prop_exp_sem_id_fk",
    }),
  }),
);

export const BudgetReportExpenseRevision = mysqlTable(
  "budget_report_expense_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetReportExpenseId: int("budget_report_expense_id").notNull(),
    budgetDomainEnum: int("budget_domain_enum"),
    budgetDivisionExpenseEnum: int("budget_division_expense_enum"),
    budgetClassExpenseEnum: int("budget_class_expense_enum"),
    name: varchar("name", { length: 30 }).notNull(),
    amount: int("amount"),
    detail: text("detail"),
    code: int("code").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportExpenseRevisionBudgetReportExpenseIdFk: foreignKey({
      columns: [table.budgetReportExpenseId],
      foreignColumns: [BudgetReportExpense.id],
      name: "bud_prop_exp_rev_prop_id_fk",
    }),
    budgetReportExpenseRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_exp_rev_cog_id_fk",
    }),
    budgetReportExpenseRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "bud_prop_exp_rev_gsrc_id_fk",
    }),
  }),
);

export const BudgetReportIncomeDocumentReview = mysqlTable(
  "budget_report_income_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetReportIncomeRevisionId: int(
      "budget_report_income_revision_id",
    ).notNull(),
    studentId: int("student_id").notNull(),
    documentReviewStatusEnum: int("document_review_status_enum").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportIncomeDocumentReviewBudgetReportIncomeRevisionIdFk: foreignKey({
      columns: [table.budgetReportIncomeRevisionId],
      foreignColumns: [BudgetReportIncomeRevision.id],
      name: "bud_prop_inc_rev_prop_id_fk",
    }),
    budgetReportIncomeDocumentReviewStudentIdFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "bud_prop_inc_rev_student_id_fk",
    }),
  }),
);

export const BudgetReportExpenseDocumentReview = mysqlTable(
  "budget_report_expense_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    budgetReportExpenseRevisionId: int(
      "budget_report_expense_revision_id",
    ).notNull(),
    studentId: int("student_id").notNull(),
    documentReviewStatusEnum: int("document_review_status_enum").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    budgetReportExpenseDocumentReviewBudgetReportExpenseRevisionIdFk:
      foreignKey({
        columns: [table.budgetReportExpenseRevisionId],
        foreignColumns: [BudgetReportExpense.id],
        name: "bud_prop_exp_review_prop_id_fk",
      }),
    budgetReportExpenseDocuemntReviewStudentIdFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "bud_prop_exp_rev_student_id_fk",
    }),
  }),
);
