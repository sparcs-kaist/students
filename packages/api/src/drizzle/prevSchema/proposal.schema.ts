import {
  int,
  varchar,
  text,
  datetime,
  timestamp,
  mysqlTable,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { InferSelectModel } from "drizzle-orm";
import { Organization, Team } from "./organization.schema";
import { Semester } from "./semester.schema";
import { User } from "./user.schema";
import { Agenda } from "./meeting.schema";
import { File } from "./file.schema";
import {
  BudgetDomainEnum,
  BudgetDivisionIncomeEnum,
  BudgetDivisionExpenseEnum,
  BudgetClassExpenseEnum,
  DocumentReviewStatusEnum,
} from "./enum.schema";

// ProjectProposal 테이블
export const ProjectProposal = mysqlTable(
  "project_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    revisionId: int("revision_id"), // 실제 foreign key는 아님
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

// ProjectProposalRevision 테이블
export const ProjectProposalRevision = mysqlTable(
  "project_proposal_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    method: text("method"),
    prepareStartTerm: datetime("prepare_start_term"),
    prepareEndTerm: datetime("prepare_end_term"),
    startTerm: datetime("start_term"),
    endTerm: datetime("end_term"),
    teamId: int("team_id"),
    managerId: int("manager_id"),
    purpose: text("purpose"),
    target: text("target"),
    detail: text("detail"),
    note: text("note"),
    submittedAt: timestamp("submitted_at"),
    agendaId: int("agenda_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    teamIdFk: foreignKey({
      columns: [table.teamId],
      foreignColumns: [Team.id],
    }),
    managerIdFk: foreignKey({
      columns: [table.managerId],
      foreignColumns: [User.id],
    }),
    documentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [ProjectProposal.id],
      name: "pro_pro_rev_document_id_fk",
    }),
    agendaIdFk: foreignKey({
      columns: [table.agendaId],
      foreignColumns: [Agenda.id],
      name: "pro_pro_rev_agenda_id_fk",
    }),
  }),
);

// ProjectProposalTimeline 테이블
export const ProjectProposalTimeline = mysqlTable(
  "project_proposal_timeline",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    projectId: int("project_id").notNull(),
    startTerm: datetime("start_term").notNull(),
    endTerm: datetime("end_term").notNull(),
    detail: text("detail").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    projectIdFk: foreignKey({
      columns: [table.projectId],
      foreignColumns: [ProjectProposal.id],
      name: "pro_pro_tim_project_proposal_id_fk",
    }),
  }),
);

// OperationProposal 테이블
export const OperationProposal = mysqlTable(
  "operation_proposal",
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
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
    }),
    semesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
    }),
    organizationDiagramIdFk: foreignKey({
      columns: [table.organizationDiagramId],
      foreignColumns: [File.id],
      name: "ope_pro_organization_diagram_id_fk",
    }),
  }),
);

// OperatingCommitteeProposal 테이블
export const OperatingCommitteeProposal = mysqlTable(
  "operating_committee_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    note: text("note"),
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

// BudgetProposalIncome 테이블
export const BudgetProposalIncome = mysqlTable(
  "budget_proposal_income",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    revisionId: int("revision_id"), // 실제 foreign key는 아님
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

// BudgetProposalIncomeRevision 테이블
export const BudgetProposalIncomeRevision = mysqlTable(
  "budget_proposal_income_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    budgetDomainEnumId: int("budget_domain_enum_id"),
    budgetDivisionIncomeEnumId: int("budget_division_income_enum_id"),
    name: varchar("name", { length: 30 }).notNull(),
    amount: int("amount"),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
    agendaId: int("agenda_id"),
    submittedAt: timestamp("submitted_at"),
  },
  table => ({
    documentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [BudgetProposalIncome.id],
      name: "bud_div_inc_rev_document_id_fk",
    }),
    budgetDomainEnumIdFk: foreignKey({
      columns: [table.budgetDomainEnumId],
      foreignColumns: [BudgetDomainEnum.id],
      name: "bud_div_inc_budget_domain_enum_id_fk",
    }),
    budgetDivisionIncomeEnumIdFk: foreignKey({
      columns: [table.budgetDivisionIncomeEnumId],
      foreignColumns: [BudgetDivisionIncomeEnum.id],
      name: "bud_div_inc_budget_division_income_enum_id_fk",
    }),
    agendaIdFk: foreignKey({
      columns: [table.agendaId],
      foreignColumns: [Agenda.id],
      name: "bud_div_inc_agenda_id_fk",
    }),
  }),
);

// BudgetProposalExpense 테이블
export const BudgetProposalExpense = mysqlTable(
  "budget_proposal_expense",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id").notNull(),
    semesterId: int("semester_id").notNull(),
    revisionId: int("revision_id"), // 실제 foreign key는 아님
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    organizationIdFk: foreignKey({
      columns: [table.organizationId],
      foreignColumns: [Organization.id],
      name: "bud_pro_exp_organization_id_fk",
    }),
    semesterIdFk: foreignKey({
      columns: [table.semesterId],
      foreignColumns: [Semester.id],
      name: "bud_pro_exp_semester_id_fk",
    }),
  }),
);

// BudgetProposalExpenseRevision 테이블
export const BudgetProposalExpenseRevision = mysqlTable(
  "budget_proposal_expense_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    budgetDomainEnumId: int("budget_domain_enum_id"),
    budgetDivisionExpenseEnumId: int("budget_division_expense_enum_id"),
    projectId: int("project_id"),
    budgetClassExpenseEnumId: int("budget_class_expense_enum_id"),
    amount: int("amount"),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
    agendaId: int("agenda_id"),
    submittedAt: timestamp("submitted_at"),
  },
  table => ({
    documentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [BudgetProposalExpense.id],
      name: "bud_pro_exp_rev_document_id_fk",
    }),
    budgetDomainEnumIdFk: foreignKey({
      columns: [table.budgetDomainEnumId],
      foreignColumns: [BudgetDomainEnum.id],
      name: "bud_pro_exp_rev_budget_domain_enum_id_fk",
    }),
    budgetDivisionExpenseEnumIdFk: foreignKey({
      columns: [table.budgetDivisionExpenseEnumId],
      foreignColumns: [BudgetDivisionExpenseEnum.id],
      name: "bud_pro_exp_rev_budget_division_expense_enum_id_fk",
    }),
    projectIdFk: foreignKey({
      columns: [table.projectId],
      foreignColumns: [ProjectProposal.id],
      name: "bud_pro_exp_rev_project_id_fk",
    }),
    budgetClassExpenseEnumIdFk: foreignKey({
      columns: [table.budgetClassExpenseEnumId],
      foreignColumns: [BudgetClassExpenseEnum.id],
      name: "bud_pro_exp_rev_budget_class_expense_enum_id_fk",
    }),
    agendaIdFk: foreignKey({
      columns: [table.agendaId],
      foreignColumns: [Agenda.id],
      name: "bud_pro_exp_rev_agenda_id_fk",
    }),
  }),
);

// ProjectProposalDocumentReview 테이블
export const ProjectProposalDocumentReview = mysqlTable(
  "project_proposal_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    userId: int("user_id").notNull(),
    documentReviewStatusEnumId: int("document_review_status_enum_id").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    documentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [ProjectProposal.id],
      name: "pro_pro_doc_rev_document_id_fk",
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "pro_pro_doc_rev_user_id_fk",
    }),
    documentReviewStatusEnumIdFk: foreignKey({
      columns: [table.documentReviewStatusEnumId],
      foreignColumns: [DocumentReviewStatusEnum.id],
      name: "pro_pro_doc_rev_document_review_status_enum_id_fk",
    }),
  }),
);

// BudgetProposalIncomeDocumentReview 테이블
export const BudgetProposalIncomeDocumentReview = mysqlTable(
  "budget_proposal_income_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    userId: int("user_id").notNull(),
    documentReviewStatusEnumId: int("document_review_status_enum_id").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    documentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [BudgetProposalIncome.id],
      name: "bud_pro_inc_doc_rev_document_id_fk",
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "bud_pro_inc_doc_rev_user_id_fk",
    }),
    documentReviewStatusEnumIdFk: foreignKey({
      columns: [table.documentReviewStatusEnumId],
      foreignColumns: [DocumentReviewStatusEnum.id],
      name: "bud_pro_inc_doc_rev_document_review_status_enum_id_fk",
    }),
  }),
);

// BudgetProposalExpenseDocumentReview 테이블
export const BudgetProposalExpenseDocumentReview = mysqlTable(
  "budget_proposal_expense_document_review",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id").notNull(),
    userId: int("user_id").notNull(),
    documentReviewStatusEnumId: int("document_review_status_enum_id").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    documentIdFk: foreignKey({
      columns: [table.documentId],
      foreignColumns: [BudgetProposalExpense.id],
      name: "bud_pro_exp_doc_rev_document_id_fk",
    }),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "bud_pro_exp_doc_rev_user_id_fk",
    }),
    documentReviewStatusEnumIdFk: foreignKey({
      columns: [table.documentReviewStatusEnumId],
      foreignColumns: [DocumentReviewStatusEnum.id],
      name: "bud_pro_exp_doc_rev_document_review_status_enum_id_fk",
    }),
  }),
);

// 타입 추론
export type ProjectProposalT = InferSelectModel<typeof ProjectProposal>;
export type ProjectProposalRevisionT = InferSelectModel<
  typeof ProjectProposalRevision
>;
export type ProjectProposalTimelineT = InferSelectModel<
  typeof ProjectProposalTimeline
>;
export type OperationProposalT = InferSelectModel<typeof OperationProposal>;
export type OperatingCommitteeProposalT = InferSelectModel<
  typeof OperatingCommitteeProposal
>;
export type BudgetProposalIncomeT = InferSelectModel<
  typeof BudgetProposalIncome
>;
export type BudgetProposalIncomeRevisionT = InferSelectModel<
  typeof BudgetProposalIncomeRevision
>;
export type BudgetProposalExpenseT = InferSelectModel<
  typeof BudgetProposalExpense
>;
export type BudgetProposalExpenseRevisionT = InferSelectModel<
  typeof BudgetProposalExpenseRevision
>;
export type ProjectProposalDocumentReviewT = InferSelectModel<
  typeof ProjectProposalDocumentReview
>;
export type BudgetProposalIncomeDocumentReviewT = InferSelectModel<
  typeof BudgetProposalIncomeDocumentReview
>;
export type BudgetProposalExpenseDocumentReviewT = InferSelectModel<
  typeof BudgetProposalExpenseDocumentReview
>;
