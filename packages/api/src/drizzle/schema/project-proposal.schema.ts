import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";
import { Semester } from "./semester.schema";
import { OperatingCommittee, Organization, Team } from "./organization.schema";
import { Student } from "./user.schema";
import { File } from "./file.schema";
import { Agenda } from "./meeting.schema";

export const ProjectProposal = mysqlTable(
  "project_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "proj_pro_org_id_fk",
    }),
    semesterFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "proj_pro_sem_id_fk",
    }),
  }),
);

export const ProjectProposalRevision = mysqlTable(
  "project_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectProposalId: int("project_proposal_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    method: text("method"),
    prepareStartTerm: timestamp("prepare_start_term"),
    prepareEndTerm: timestamp("prepare_end_term"),
    startTerm: timestamp("start_term"),
    endTerm: timestamp("end_term"),
    teamId: int("team_id"),
    managerId: int("manager_id"),
    purpose: text("purpose"),
    target: text("target"),
    detail: text("detail"),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
    code: int("code").unique().notNull(),
  },
  table => ({
    projectProposalFk: foreignKey({
      columns: [table.projectProposalId],
      foreignColumns: [ProjectProposal.id],
      name: "proj_prop_rev_proj_prop_id_fk",
    }),
    teamFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "proj_prop_rev_team_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [Student.id],
      name: "proj_prop_rev_st_id_fk",
    }),
    cogAgendaFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "proj_prop_rev_cog_age_id_fk",
    }),
    gsrcAgendaFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "proj_prop_rev_gsrc_age_id_fk",
    }),
  }),
);

export const ProjectProposalTimeline = mysqlTable(
  "project_proposal_timeline",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectProposalRevision: int("code").notNull(),
    startTerm: timestamp("start_term").notNull(),
    endTerm: timestamp("end_term").notNull(),
    detail: text("detail").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectProposalRevisionFk: foreignKey({
      columns: [table.projectProposalRevision],
      foreignColumns: [ProjectProposalRevision.code],
      name: "proj_prop_time_proj_prop_rev_code_fk",
    }),
  }),
);

export const OperationProposal = mysqlTable(
  "operation_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "op_prop_org_id_fk",
    }),
    semesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "op_prop_sem_id_fk",
    }),
  }),
);

export const OperationProposalRevision = mysqlTable(
  "operation_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operationProposalId: int("operation_proposal_id").notNull(),
    organizationDiagramId: int("organization_diagram_id").notNull().unique(),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operationProposalFk: foreignKey({
      columns: [table.operationProposalId],
      foreignColumns: [OperationProposal.id],
      name: "op_prop_rev_op_prop_id_fk",
    }),
    fileFk: foreignKey({
      columns: [table.organizationDiagramId],
      foreignColumns: [File.id],
      name: "op_prop_rev_file_id_fk",
    }),
    cogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "op_prop_rev_age_id_fk",
    }),
    gsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "op_prop_rev_gsrc_age_id_fk",
    }),
  }),
);

export const ExecutionProposal = mysqlTable(
  "execution_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operatingCommitteeId: int("operating_committee_id").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeFk: foreignKey({
      columns: [table.operatingCommitteeId],
      foreignColumns: [OperatingCommittee.id],
      name: "exe_pro_op_com_id_fk",
    }),
  }),
);

export const ExecutionProposalRevision = mysqlTable(
  "execution_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    executionProposalId: int("execution_proposal_id").notNull(),
    teamId: int("team_id").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    executionProposalFk: foreignKey({
      columns: [table.executionProposalId],
      foreignColumns: [ExecutionProposal.id],
      name: "exe_pro_rev_exe_pro_id_fk",
    }),
    teamFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "exe_pro_rev_team_id_fk",
    }),
  }),
);

export const ProjectProposalDocumentReview = mysqlTable(
  "project_proposal_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectProposalRevisionId: int("project_proposal_revision_id").notNull(),
    studentId: int("student_id").notNull(),
    documentReviewStatusEnumId: int("document_review_status_enum_id").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectProposalRevisionFk: foreignKey({
      columns: [table.projectProposalRevisionId],
      foreignColumns: [ProjectProposalRevision.id],
      name: "proj_prop_doc_review_proj_prop_rev_id_fk",
    }),
    studentFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "proj_prop_doc_review_st_id_fk",
    }),
  }),
);
