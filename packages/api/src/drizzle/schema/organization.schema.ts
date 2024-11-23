import {
  int,
  varchar,
  text,
  datetime,
  date,
  timestamp,
  mysqlTable,
  foreignKey,
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

export const Organization = mysqlTable(
  "organization",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    nameEng: varchar("name_eng", { length: 100 }).notNull(),
    organizationTypeEnumId: int("organization_type_enum_id").notNull(),
    foundingYear: int("founding_year").notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationTypeEnumIdFk: foreignKey({
      columns: [table.organizationTypeEnumId],
      foreignColumns: [OrganizationTypeEnum.id],
      name: "org_organization_type_enum_id_fk",
    }),
  }),
);

export const OrganizationPresident = mysqlTable(
  "organization_president",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    userId: int("user_id").notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    organizationPresidentTypeEnumId: int(
      "organization_president_type_enum_id",
    ).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    userFK: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
  }),
);

export const OrganizationMember = mysqlTable(
  "organization_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    userId: int("user_id").notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
  }),
);

export const OperatingCommitteeMember = mysqlTable(
  "operating_committee_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    userId: int("user_id").notNull(),
    role: varchar("role", { length: 30 }).notNull(),
    legalBasis: varchar("legal_basis", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "ope_com_mem_organization_id_fk",
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
  }),
);

export const Team = mysqlTable(
  "team",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
    }),
    semesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
    }),
  }),
);

export const TeamLeader = mysqlTable(
  "team_leader",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    teamId: int("team_id").notNull(),
    userId: int("user_id").notNull(),
    role: varchar("role", { length: 30 }).notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    teamIdFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
  }),
);

export const TeamMember = mysqlTable(
  "team_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    teamId: int("team_id").notNull(),
    userId: int("user_id").notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    teamIdFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
  }),
);

export const Account = mysqlTable(
  "account",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    ownerName: varchar("owner_name", { length: 255 }).notNull(),
    budgetDomainEnumId: int("budget_domain_enum_id").notNull(),
    accountNumber: varchar("account_number", { length: 255 }).notNull(),
    accountBank: varchar("account_bank", { length: 255 }).notNull(),
    accountFileId: int("account_file_id"),
    cardNumber: varchar("card_number", { length: 255 }),
    cardFileId: int("card_file_id"),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
    }),
    budgetDomainEnumIdFk: foreignKey({
      columns: [table.budgetDomainEnumId],
      foreignColumns: [BudgetDomainEnum.id],
      name: "acc_budget_domain_enum_id_fk",
    }),
    accountFileIdFk: foreignKey({
      columns: [table.accountFileId],
      foreignColumns: [File.id],
      name: "acc_account_file_id_fk",
    }),
    cardFileIdFk: foreignKey({
      columns: [table.cardFileId],
      foreignColumns: [File.id],
      name: "acc_card_file_id_fk",
    }),
  }),
);

export const OrganizationManager = mysqlTable(
  "organization_manager",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    userId: int("user_id").notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
    }),
    semesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
    }),
  }),
);

export const AssistantManager = mysqlTable(
  "assistant_manager",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    userId: int("user_id").notNull(),
    assistantPermissionEnumId: int("assistant_permission_enum_id").notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
    assistantPermissionEnumIdFk: foreignKey({
      columns: [table.assistantPermissionEnumId],
      foreignColumns: [AssistantPermissionEnum.id],
      name: "ass_man_assistant_permission_enum_id_fk",
    }),
  }),
);

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
