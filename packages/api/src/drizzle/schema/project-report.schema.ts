import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
  text,
  date,
  boolean,
} from "drizzle-orm/mysql-core";
import { Semester } from "./semester.schema";
import { Organization } from "./organization.schema";
import { User } from "./user.schema";
import { File } from "./file.schema";
import { ProjectProposal } from "./project-proposal.schema";

export const ProjectReport = mysqlTable(
  "project_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    projectId: int("project_id").notNull(),
    revisionId: int("revision_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
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
    projectReportProjectIdFk: foreignKey({
      columns: [table.projectId],
      foreignColumns: [ProjectProposal.id],
      name: "project_report_project_id_fk",
    }),
  }),
);

export const ProjectReportRevision = mysqlTable(
  "project_report_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    method: text("method"),
    prepareStartTerm: timestamp("prepare_start_term"),
    prepareEndTerm: timestamp("prepare_end_term"),
    startTerm: timestamp("start_term"),
    endTerm: timestamp("end_term"),
    teamId: int("team_id"),
    managerId: int("manager_id"),
    target: text("target"),
    detail: text("detail"),
    result: text("result"),
    unmet: text("unmet"),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
    agendaId: int("agenda_id"),
  },
  table => ({
    projectReportRevisionDocumentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [ProjectReport.id],
      name: "project_report_revision_document_id_fk",
    }),
    // projectReportRevisionTeamIdFk: foreignKey({
    //   columns: [table.teamId],
    //   foreignColumns: [Team.id],
    //   name: "project_report_revision_team_id_fk",
    // }),
    projectReportRevisionManagerIdFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [User.id],
      name: "project_report_revision_manager_id_fk",
    }),
    //   projectReportRevisionAgendaIdFk: foreignKey({
    //     columns: [table.agendaId],
    //     foreignColumns: [Agenda.id],
    //     name: "project_report_revision_agenda_id_fk",
    //   }),
  }),
);

export const ProjectReportTimeline = mysqlTable(
  "project_report_timeline",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectId: int("project_id").notNull(),
    startTerm: timestamp("start_term").notNull(),
    endTerm: timestamp("end_term").notNull(),
    detail: text("detail").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectReportTimelineProjectIdFk: foreignKey({
      columns: [table.projectId],
      foreignColumns: [ProjectReport.id],
      name: "project_report_timeline_project_id_fk",
    }),
  }),
);

export const ProjectDetailFile = mysqlTable(
  "project_detail_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectId: int("project_id").notNull(),
    fileId: int("file_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectDetailFileProjectIdFk: foreignKey({
      columns: [table.projectId],
      foreignColumns: [ProjectReport.id],
      name: "project_detail_file_project_id_fk",
    }),
    projectDetailFileFileIdFk: foreignKey({
      columns: [table.fileId],
      foreignColumns: [File.id],
      name: "project_detail_file_file_id_fk",
    }),
  }),
);

export const OperationReport = mysqlTable(
  "operation_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    organizationDiagramId: int("organization_diagram_id").notNull(),
    note: text("note"),
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
    operationReportDiagramIdFk: foreignKey({
      columns: [table.organizationDiagramId],
      foreignColumns: [File.id],
      name: "operation_report_organization_diagram_id_fk",
    }),
  }),
);

export const Recruit = mysqlTable(
  "recruit",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    recruitOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "recruit_organization_id_fk",
    }),
    recruitSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "recruit_semester_id_fk",
    }),
  }),
);

export const RecruitEvidenceFile = mysqlTable(
  "recruit_evidence_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    recruitId: int("recruit_id").notNull(),
    fileId: int("file_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    recruitEvidenceFileRecruitIdFk: foreignKey({
      columns: [table.recruitId],
      foreignColumns: [Recruit.id],
      name: "recruit_evidence_file_recruit_id_fk",
    }),
    recruitEvidenceFileFileIdFk: foreignKey({
      columns: [table.fileId],
      foreignColumns: [File.id],
      name: "recruit_evidence_file_file_id_fk",
    }),
  }),
);

export const RecruitMember = mysqlTable(
  "recruit_member",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    recruitId: int("recruit_id").notNull(),
    userId: int("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    recruitMemberRecruitIdFk: foreignKey({
      columns: [table.recruitId],
      foreignColumns: [Recruit.id],
      name: "recruit_member_recruit_id_fk",
    }),
    recruitMemberUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "recruit_member_user_id_fk",
    }),
  }),
);

export const OperatingCommitteeReport = mysqlTable(
  "operating_committee_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeReportOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "operating_committee_report_organization_id_fk",
    }),
    operatingCommitteeReportSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "operating_committee_report_semester_id_fk",
    }),
  }),
);
export const OperatingCommitteeMeeting = mysqlTable(
  "operating_committee_meeting",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    place: varchar("place", { length: 255 }).notNull(),
    note: text("note"),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeMeetingOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "operating_committee_meeting_organization_id_fk",
    }),
    operatingCommitteeMeetingSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "operating_committee_meeting_semester_id_fk",
    }),
  }),
);

export const OperatingCommitteeResult = mysqlTable(
  "operating_committee_result",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    meetingId: int("meeting_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    decisionText: text("decision_text"),
    attendance: int("attendance").notNull(),
    agree: int("agree").notNull(),
    disagree: int("disagree").notNull(),
    abstain: int("abstain").notNull(),
    approval: boolean("approval").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeResultMeetingIdFk: foreignKey({
      columns: [table.meetingId],
      foreignColumns: [OperatingCommitteeMeeting.id],
      name: "operating_committee_result_meeting_id_fk",
    }),
  }),
);
