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
import { OperatingCommittee, Organization, Team } from "./organization.schema";
import { Student, User } from "./user.schema";
import { File } from "./file.schema";
import { ProjectProposal } from "./project-proposal.schema";
import { Agenda } from "./meeting.schema";

export const ProjectReport = mysqlTable(
  "project_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    projectProposalId: int("project_proposal_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
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
    projectReportProjectProposalIdFk: foreignKey({
      columns: [table.projectProposalId],
      foreignColumns: [ProjectProposal.id],
      name: "project_report_project_proposal_id_fk",
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
    target: text("target"),
    detail: text("detail"),
    result: text("result"),
    unmet: text("unmet"),
    note: text("note"),
    documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
    agendaId: int("agenda_id"),
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
      foreignColumns: [User.id],
      name: "project_report_revision_manager_id_fk",
    }),
    projectReportRevisionAgendaIdFk: foreignKey({
      columns: [table.agendaId],
      foreignColumns: [Agenda.id],
      name: "project_report_revision_agenda_id_fk",
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
    updatedAt: timestamp("updated_at").onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectReportTimelineProjectReportRevisionIdFk: foreignKey({
      columns: [table.projectReportRevisionId],
      foreignColumns: [ProjectReportRevision.id],
      name: "project_report_timeline_project_report_id_fk",
    }),
  }),
);

export const ProjectDetailFile = mysqlTable(
  "project_detail_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectReportRevisionId: int("project_report_revision_id").notNull(),
    fileId: int("file_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectDetailFileProjectReportRevisionIdFk: foreignKey({
      columns: [table.projectReportRevisionId],
      foreignColumns: [ProjectReportRevision.id],
      name: "project_detail_file_project_report_revision_id_fk",
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
  "operation_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operationReportId: int("operation_report_id").notNull(),
    organizationDiagramId: int("organization_diagram_id").notNull(),
    note: text("note"),
    documentStatusEnum: int("document_status_enum").notNull(),
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
    operationReportCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "operation_report_cog_agenda_id_fk",
    }),
    operationReportGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "operation_report_gsrc_agenda_id_fk",
    }),
  }),
);

export const OperatingCommitteeReport = mysqlTable(
  "operating_committee_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    operatingCommitteeId: int("operating_committee_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
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
    operatingCommitteeReportOperatingCommitteeIdFk: foreignKey({
      columns: [table.operatingCommitteeId],
      foreignColumns: [OperatingCommittee.id],
      name: "operating_committee_report_operating_committee_id_fk",
    }),
  }),
);

export const OperatingCommitteeReportRevision = mysqlTable(
  "operating_committee_report_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operatingCommitteeReportId: int("operating_committee_report_id").notNull(),
    detail: text("detail"),
    documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeReportRevisionOperatingCommitteeReportIdFk: foreignKey({
      columns: [table.operatingCommitteeReportId],
      foreignColumns: [OperatingCommitteeReport.id],
      name: "operating_committee_report_revision_operating_committee_report_id_fk",
    }),
    operatingCommitteeReportCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "operating_committee_report_cog_agenda_id_fk",
    }),
    operatingCommitteeReportGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "operating_committee_report_gsrc_agenda_id_fk",
    }),
  }),
);

export const OperatingCommitteeMeeting = mysqlTable(
  "operating_committee_meeting",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operatingCommitteeId: int("operating_committee_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeMeetingOperatingCommitteeIdFk: foreignKey({
      columns: [table.operatingCommitteeId],
      foreignColumns: [OperatingCommittee.id],
      name: "operating_committee_meeting_operating_committee_id_fk",
    }),
  }),
);

export const OperatingCommitteeMeetingRevision = mysqlTable(
  "operating_committee_meeting_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operatingCommitteeMeetingId: int(
      "operating_committee_meeting_id",
    ).notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    place: varchar("place", { length: 255 }).notNull(),
    note: text("note"),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    documentStatusEnum: int("document_status_enum").notNull(),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeMeetingRevisionOperatingCommitteeMeetingIdFk: foreignKey({
      columns: [table.operatingCommitteeMeetingId],
      foreignColumns: [OperatingCommitteeMeeting.id],
      name: "operating_committee_meeting_revision_operating_committee_meeting_id_fk",
    }),
    operatingCommitteeMeetingCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "operating_committee_meeting_cog_agenda_id_fk",
    }),
    operatingCommitteeMeetingGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "operating_committee_meeting_gsrc_agenda_id_fk",
    }),
  }),
);

export const OperatingCommitteeMeetingResult = mysqlTable(
  "operating_committee_meeting_result",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    meetingRevisionId: int("meeting_revision_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    decisionText: text("decision_text"),
    attendance: int("attendance").notNull(),
    agree: int("agree").notNull(),
    disagree: int("disagree").notNull(),
    abstain: int("abstain").notNull(),
    approval: boolean("approval").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeResultMeetingRevisionIdFk: foreignKey({
      columns: [table.meetingRevisionId],
      foreignColumns: [OperatingCommitteeMeetingRevision.id],
      name: "operating_committee_meeting_result_meeting_revision_id_fk",
    }),
  }),
);

// TODO: RecruitReport / revision 추가하기

export const RecruitReport = mysqlTable(
  "recruit_report",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
  },
  table => ({
    recruitReportOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "recruit_report_organization_id_fk",
    }),
    recruitReportSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "recruit_report_semester_id_fk",
    }),
  }),
);

export const RecruitReportRevision = mysqlTable(
  "recruit_report_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    startTerm: date("start_term").notNull(),
    endTerm: date("end_term"),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    cogResultId: int("cog_result_id"),
    documentStatusEnum: int("document_status_enum").notNull(),
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
    recruitCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "recruit_cog_agenda_id_fk",
    }),
    recruitCogResultIdFk: foreignKey({
      columns: [table.cogResultId],
      foreignColumns: [Agenda.id],
      name: "recruit_cog_result_id_fk",
    }),
  }),
);

export const RecruitEvidenceFile = mysqlTable(
  "recruit_evidence_file",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    recruitReportRevisionId: int("recruit_report_revision_id").notNull(),
    fileId: int("file_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    recruitEvidenceFileRecruitReportRevisionIdFk: foreignKey({
      columns: [table.recruitReportRevisionId],
      foreignColumns: [RecruitReportRevision.id],
      name: "recruit_evidence_file_recruit_revision_id_fk",
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
    recruitReportRevisionId: int("recruit_report_revision_id").notNull(),
    studentId: int("student_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    recruitMemberRecruitIdFk: foreignKey({
      columns: [table.recruitReportRevisionId],
      foreignColumns: [RecruitReportRevision.id],
      name: "recruit_member_recruit_report_revision_id_fk",
    }),
    recruitMemberStudentIdFk: foreignKey({
      columns: [table.studentId],
      foreignColumns: [Student.id],
      name: "recruit_member_student_id_fk",
    }),
  }),
);
