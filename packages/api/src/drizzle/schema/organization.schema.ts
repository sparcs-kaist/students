import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
  datetime,
} from "drizzle-orm/mysql-core";
import { Student } from "./user.schema";

// Organization 테이블
export const Organization = mysqlTable("organization", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEng: varchar("name_eng", { length: 255 }).notNull(),
  organizationTypeEnum: int("organization_type_enum").notNull(),
  foundingYear: int("founding_year").notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term"),
  organizationStateEnum: int("organization_state_enum").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// OperatingCommittee 테이블
export const OperatingCommittee = mysqlTable(
  "operating_committee",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    nameEng: varchar("name_eng", { length: 255 }).notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "op_com_org_id_fk",
    }),
  }),
);

// Team 테이블
export const Team = mysqlTable(
  "team",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "team_org_id_fk",
    }),
  }),
);

// OrganizationPresident 테이블
export const OrganizationPresident = mysqlTable(
  "organization_president",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    organizationPresidentTypeEnum: int(
      "organization_president_type_enum",
    ).notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    studentId: int("student_id").notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "org_pres_org_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id], // Assume student table exists
      name: "org_pres_stu_id_fk",
    }),
  }),
);

// OrganizationMember 테이블
export const OrganizationMember = mysqlTable(
  "organization_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    studentId: int("student_id").notNull(),
    startTerm: datetime("start_term"),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "org_mem_org_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "org_mem_stu_id_fk",
    }),
  }),
);

// OrganizationManager 테이블
export const OrganizationManager = mysqlTable(
  "organization_manager",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    studentId: int("student_id").notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "org_mgr_org_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "org_mgr_stu_id_fk",
    }),
  }),
);

// OperatingCommitteeMember 테이블
export const OperatingCommitteeMember = mysqlTable(
  "operating_committee_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operatingCommitteeId: int("operating_committee_id").notNull(),
    studentId: int("student_id").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    legalBasis: varchar("legal_basis", { length: 255 }).notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeFk: foreignKey({
      columns: [table.operatingCommitteeId],
      foreignColumns: [OperatingCommittee.id],
      name: "op_com_mem_com_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "op_com_mem_stu_id_fk",
    }),
  }),
);

// TeamMember 테이블
export const TeamMember = mysqlTable(
  "team_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    teamId: int("team_id").notNull(),
    studentId: int("student_id").notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    teamFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "team_mem_team_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "team_mem_stu_id_fk",
    }),
  }),
);

// TeamLeader 테이블
export const TeamLeader = mysqlTable(
  "team_leader",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    teamId: int("team_id").notNull(),
    studentId: int("student_id").notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    teamFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "team_ldr_team_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "team_ldr_stu_id_fk",
    }),
  }),
);
