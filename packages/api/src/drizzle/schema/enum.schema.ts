import { InferSelectModel } from "drizzle-orm";
import { int, varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";

export const OrganizationTypeEnum = mysqlTable("org_typ_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const OrganizationPresidentTypeEnum = mysqlTable("org_pre_typ_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const BudgetDomainEnum = mysqlTable("bud_dom_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const BudgetDivisionIncomeEnum = mysqlTable("bud_div_inc_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const BudgetDivisionExpenseEnum = mysqlTable("bud_div_exp_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const BudgetClassExpenseEnum = mysqlTable("bud_cla_exp_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const TransactionTypeEnum = mysqlTable("tra_typ_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const ReportFileTypeEnum = mysqlTable("rep_fil_typ_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const AssistantPermissionEnum = mysqlTable("ass_per_e", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type OrganizationTypeEnumT = InferSelectModel<
  typeof OrganizationTypeEnum
>;
export type OrganizationPresidentTypeEnumT = InferSelectModel<
  typeof OrganizationPresidentTypeEnum
>;
