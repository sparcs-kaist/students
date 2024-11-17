import {
  int,
  varchar,
  text,
  datetime,
  date,
  timestamp,
  mysqlTable,
} from "drizzle-orm/mysql-core";
import { InferSelectModel } from "drizzle-orm";
import {
  OrganizationTypeEnum,
  BudgetDomainEnum,
  AssistantPermissionEnum,
} from "./enum.schema";
import { User } from "./user.schema";
import { Semester } from "./semester.schema";
import { File } from "./file.schema";

export const Organization = mysqlTable("organization", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  nameEng: varchar("name_eng", { length: 100 }).notNull(),
  organizationTypeEnumId: int("organization_type_enum_id")
    .notNull()
    .references(() => OrganizationTypeEnum.id),
  foundingYear: int("founding_year").notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const OrganizationPresident = mysqlTable("organization_president", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  organizationPresidentTypeEnumId: int(
    "organization_president_type_enum_id",
  ).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const OrganizationMember = mysqlTable("organization_member", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .notNull()
    .references(() => Organization.id),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const OperatingCommitteeMember = mysqlTable(
  "operating_committee_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id")
      .notNull()
      .references(() => Organization.id),
    userId: int("user_id")
      .notNull()
      .references(() => User.id),
    role: varchar("role", { length: 30 }).notNull(),
    legalBasis: varchar("legal_basis", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

export const Team = mysqlTable("team", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .notNull()
    .references(() => Organization.id),
  semesterId: int("semester_id")
    .notNull()
    .references(() => Semester.id),
  name: varchar("name", { length: 30 }).notNull(),
  detail: text("detail"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const TeamLeader = mysqlTable("team_leader", {
  id: int("id").autoincrement().primaryKey().notNull(),
  teamId: int("team_id")
    .notNull()
    .references(() => Team.id),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  role: varchar("role", { length: 30 }).notNull(),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const TeamMember = mysqlTable("team_member", {
  id: int("id").autoincrement().primaryKey().notNull(),
  teamId: int("team_id")
    .notNull()
    .references(() => Team.id),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const Account = mysqlTable("account", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .notNull()
    .references(() => Organization.id),
  ownerName: varchar("owner_name", { length: 255 }).notNull(),
  budgetDomainEnumId: int("budget_domain_enum_id")
    .notNull()
    .references(() => BudgetDomainEnum.id),
  accountNumber: varchar("account_number", { length: 255 }).notNull(),
  accountBank: varchar("account_bank", { length: 255 }).notNull(),
  accountFileId: int("account_file_id").references(() => File.id),
  cardNumber: varchar("card_number", { length: 255 }),
  cardFileId: int("card_file_id").references(() => File.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const OrganizationManager = mysqlTable("organization_manager", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  organizationId: int("organization_id")
    .notNull()
    .references(() => Organization.id),
  semesterId: int("semester_id")
    .notNull()
    .references(() => Semester.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const AssistantManager = mysqlTable("assistant_manager", {
  id: int("id").autoincrement().primaryKey().notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  assistantPermissionEnumId: int("assistant_permission_enum_id")
    .notNull()
    .references(() => AssistantPermissionEnum.id),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type OrganizationT = InferSelectModel<typeof Organization>;
export type OrganizationPresidentT = InferSelectModel<
  typeof OrganizationPresident
>;
export type OrganizationMemberT = InferSelectModel<typeof OrganizationMember>;
export type OperatingCommitteeMemberT = InferSelectModel<
  typeof OperatingCommitteeMember
>;
export type TeamT = InferSelectModel<typeof Team>;
export type TeamLeaderT = InferSelectModel<typeof TeamLeader>;
export type TeamMemberT = InferSelectModel<typeof TeamMember>;
export type AccountT = InferSelectModel<typeof Account>;
export type OrganizationManagerT = InferSelectModel<typeof OrganizationManager>;
export type AssistantManagerT = InferSelectModel<typeof AssistantManager>;
