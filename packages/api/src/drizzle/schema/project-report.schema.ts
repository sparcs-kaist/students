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

export const ProjectReport = mysqlTable(
  "project_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectReportOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "project_report_organization_id_fk",
    }),
    projectReportSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "project_report_semester_id_fk",
    }),
  }),
);

export const ProjectReportRevision = mysqlTable(
  "project_report_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectReportId: int("project_report_id").notNull(),
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
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectReportRevisionProjectReportIdFk: foreignKey({
      columns: [table.projectReportId],
      foreignColumns: [ProjectReport.id],
      name: "project_report_revision_project_report_id_fk",
    }),
    projectReportRevisionTeamIdFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "project_report_revision_team_id_fk",
    }),
    projectReportRevisionManagerIdFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [Student.id],
      name: "project_report_revision_manager_id_fk",
    }),
    projectReportRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "project_report_revision_cog_agenda_id_fk",
    }),
    projectReportRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "project_report_revision_gsrc_agenda_id_fk",
    }),
  }),
);

export const ProjectReportTimeline = mysqlTable(
  "project_report_timeline",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectReportRevisionId: int("project_report_revision_id").notNull(),
    startTerm: timestamp("start_term").notNull(),
    endTerm: timestamp("end_term").notNull(),
    detail: text("detail").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectReportTimelineProjectReportRevisionIdFk: foreignKey({
      columns: [table.projectReportRevisionId],
      foreignColumns: [ProjectReportRevision.id],
      name: "project_report_timeline_revision_id_fk",
    }),
  }),
);

export const OperationReport = mysqlTable(
  "operation_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operationReportOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "operation_report_organization_id_fk",
    }),
    operationReportSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "operation_report_semester_id_fk",
    }),
  }),
);

export const OperationReportRevision = mysqlTable(
  "operation_report_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operationReportId: int("operation_report_id").notNull(),
    organizationDiagramId: int("organization_diagram_id").notNull(),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operationReportRevisionOperationReportIdFk: foreignKey({
      columns: [table.operationReportId],
      foreignColumns: [OperationReport.id],
      name: "operation_report_revision_operation_report_id_fk",
    }),
    operationReportRevisionOrganizationDiagramIdFk: foreignKey({
      columns: [table.organizationDiagramId],
      foreignColumns: [File.id],
      name: "operation_report_revision_organization_diagram_id_fk",
    }),
    operationReportRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "operation_report_revision_cog_agenda_id_fk",
    }),
    operationReportRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "operation_report_revision_gsrc_agenda_id_fk",
    }),
  }),
);

export const OperatingCommitteeReport = mysqlTable(
  "operating_committee_report_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operationReportRevisionId: int("operation_report_revision_id").notNull(),
    operatingCommitteeId: int("operating_committee_id").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeReportRevisionOperationReportRevisionIdFk: foreignKey({
      columns: [table.operationReportRevisionId],
      foreignColumns: [OperationReportRevision.id],
      name: "operating_committee_report_operation_report_revision_id_fk",
    }),
    operatingCommitteeReportRevisionOperatingCommitteeIdFk: foreignKey({
      columns: [table.operatingCommitteeId],
      foreignColumns: [OperatingCommittee.id],
      name: "operating_committee_report_ope_com_id_fk",
    }),
  }),
);

export const TeamOperationReport = mysqlTable(
  "team_operation_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operationReportRevisionId: int("operation_report_revision_id").notNull(),
    teamId: int("team_id").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    teamOperationReportOperationReportRevisionIdFk: foreignKey({
      columns: [table.operationReportRevisionId],
      foreignColumns: [OperationReportRevision.id],
      name: "team_operation_report_operation_report_revision_id_fk",
    }),
    teamOperationReportTeamIdFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "team_operation_report_team_id_fk",
    }),
  }),
);

export const ProjectReportDocumentReview = mysqlTable(
  "project_report_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectReportRevisionId: int("project_report_revision_id").notNull(),
    studentId: int("student_id").notNull(),
    documentReviewStatusEnum: int("document_review_status_enum").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectReportDocumentReviewProjectReportRevisionIdFk: foreignKey({
      columns: [table.projectReportRevisionId],
      foreignColumns: [ProjectReportRevision.id],
      name: "proj_prop_doc_review_proj_prop_rev_id_fk",
    }),
    projectReportDocumentReviewStudentIdFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "proj_prop_doc_review_student_id_fk",
    }),
  }),
);
