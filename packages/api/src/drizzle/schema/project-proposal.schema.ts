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
import { User } from "./user.schema";
import { File } from "./file.schema";
import { Agenda } from "./meeting.schema";

export const ProjectProposal = mysqlTable(
  "project_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectProposalOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "project_proposal_organization_id_fk",
    }),
    projectProposalSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "project_proposal_semester_id_fk",
    }),
  }),
);

export const ProjectProposalRevision = mysqlTable(
  "project_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectProposalId: int("project_proposal_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    method: text("method"), // TEXT 처리
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
    documentStatusEnum: int("document_status_enum").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectProposalRevisionProjectProposalIdFk: foreignKey({
      columns: [table.projectProposalId],
      foreignColumns: [ProjectProposal.id],
      name: "project_proposal_revision_project_proposal_id_fk",
    }),
    projectProposalRevisionTeamIdFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
      name: "project_proposal_revision_team_id_fk",
    }),
    projectProposalRevisionManagerIdFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [User.id],
      name: "project_proposal_revision_manager_id_fk",
    }),
    projectProposalRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "project_proposal_revision_cog_agenda_id_fk",
    }),
    projectProposalRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "project_proposal_revision_gsrc_agenda_id_fk",
    }),
  }),
);

export const ProjectProposalTimeline = mysqlTable(
  "project_proposal_timeline",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectProposalRevisionId: int("project_proposal_revision_id").notNull(),
    startTerm: timestamp("start_term").notNull(),
    endTerm: timestamp("end_term").notNull(),
    detail: text("detail").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectProposalTimelineProjectProposalRevisionIdFk: foreignKey({
      columns: [table.projectProposalRevisionId],
      foreignColumns: [ProjectProposalRevision.id],
      name: "project_proposal_timeline_revision_id_fk",
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
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operationProposalOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "operation_proposal_organization_id_fk",
    }),
    operationProposalSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "operation_proposal_semester_id_fk",
    }),
  }),
);

export const OperationProposalRevision = mysqlTable(
  "operation_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operationProposalId: int("operation_proposal_id").notNull(),
    organizationDiagramId: int("organization_diagram_id").notNull(),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    documentStatusEnum: int("document_status_enum").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operationProposalRevisionOperationProposalIdFk: foreignKey({
      columns: [table.operationProposalId],
      foreignColumns: [OperationProposal.id],
      name: "operation_proposal_revision_operation_proposal_id_fk",
    }),
    operationProposalRevisionOrganizationDiagramIdFk: foreignKey({
      columns: [table.organizationDiagramId],
      foreignColumns: [File.id],
      name: "operation_proposal_revision_organization_diagram_id_fk",
    }),
    operationProposalRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "operation_proposal_revision_cog_agenda_id_fk",
    }),
    operationProposalRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "operation_proposal_revision_gsrc_agenda_id_fk",
    }),
  }),
);

export const OperatingCommitteeProposal = mysqlTable(
  "operating_committee_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    operatingCommitteeId: int("operating_committee_id").notNull(),
    semesterId: int("semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeProposalOrganizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "operating_committee_proposal_organization_id_fk",
    }),
    operatingCommitteeProposalSemesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "operating_committee_proposal_semester_id_fk",
    }),
    operatingCommitteeProposalOperatingCommitteeIdFk: foreignKey({
      columns: [table.operatingCommitteeId],
      foreignColumns: [OperatingCommittee.id],
      name: "operating_committee_proposal_operating_committee_id_fk",
    }),
  }),
);

export const OperatingCommitteeProposalRevision = mysqlTable(
  "operating_committee_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    operatingCommitteeProposalId: int(
      "operating_committee_proposal_id",
    ).notNull(),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    cogAgendaId: int("cog_agenda_id"),
    gsrcAgendaId: int("gsrc_agenda_id"),
    documentStatusEnum: int("document_status_enum").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    operatingCommitteeProposalRevisionOperatingCommitteeProposalIdFk:
      foreignKey({
        columns: [table.operatingCommitteeProposalId],
        foreignColumns: [OperatingCommitteeProposal.id],
        name: "op_com_prop_rev_orig_id_fk",
      }),
    operatingCommitteeProposalRevisionCogAgendaIdFk: foreignKey({
      columns: [table.cogAgendaId],
      foreignColumns: [Agenda.id],
      name: "operating_committee_proposal_revision_cog_agenda_id_fk",
    }),
    operatingCommitteeProposalRevisionGsrcAgendaIdFk: foreignKey({
      columns: [table.gsrcAgendaId],
      foreignColumns: [Agenda.id],
      name: "operating_committee_proposal_revision_gsrc_agenda_id_fk",
    }),
  }),
);

// TODO: Review는 나중에
export const ProjectProposalDocumentReview = mysqlTable(
  "project_proposal_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectProposalId: int("project_proposal_id").notNull(),
    userId: int("user_id").notNull(),
    documentReviewStatusEnum: int("document_review_status_enum").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectProposalDocumentReviewProjectProposalIdFk: foreignKey({
      columns: [table.projectProposalId],
      foreignColumns: [ProjectProposal.id],
      name: "proj_prop_doc_rev_orig_id_fk",
    }),
    projectProposalDocumentReviewUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "project_proposal_document_review_user_id_fk",
    }),
  }),
);
