import { InferSelectModel } from "drizzle-orm";
import { int, varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";

export const OrganizationTypeEnum = mysqlTable("organization_type_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const OrganizationPresidentTypeEnum = mysqlTable(
  "organization_president_type_enum",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const BudgetDomainEnum = mysqlTable("budget_domain_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const BudgetDivisionIncomeEnum = mysqlTable(
  "budget_division_income_enum",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const BudgetDivisionExpenseEnum = mysqlTable(
  "budget_division_expense_enum",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const BudgetClassExpenseEnum = mysqlTable("budget_class_expense_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const TransactionTypeEnum = mysqlTable("transaction_type_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const ReportFileTypeEnum = mysqlTable("report_file_type_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const AssistantPermissionEnum = mysqlTable("assistant_permission_enum", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const AgendaAcceptedStatusEnum = mysqlTable(
  "agenda_accepted_status_enum",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const DocumentReviewStatusEnum = mysqlTable(
  "document_review_status_enum",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export type OrganizationTypeEnumT = InferSelectModel<
  typeof OrganizationTypeEnum
>;
export type OrganizationPresidentTypeEnumT = InferSelectModel<
  typeof OrganizationPresidentTypeEnum
>;
export type AgendaAcceptedStatusEnumT = InferSelectModel<
  typeof AgendaAcceptedStatusEnum
>;
export type DocumentReviewStatusEnumT = InferSelectModel<
  typeof DocumentReviewStatusEnum
>;
