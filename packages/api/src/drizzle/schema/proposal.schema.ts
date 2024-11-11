import {
  int,
  varchar,
  text,
  datetime,
  timestamp,
  mysqlTable,
} from "drizzle-orm/mysql-core";
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
} from "./enum.schema";

// ProjectProposal 테이블
export const ProjectProposal = mysqlTable("project_proposal", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .references(() => Organization.id)
    .notNull(),
  semesterId: int("semester_id")
    .references(() => Semester.id)
    .notNull(),
  revisionId: int("revision_id"), // 실제 foreign key는 아님
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// ProjectProposalRevision 테이블
export const ProjectProposalRevision = mysqlTable("project_proposal_revision", {
  id: int("id").autoincrement().primaryKey().notNull(),
  documentId: int("document_id")
    .references(() => ProjectProposal.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  method: text("method").notNull(),
  prepareStartTerm: datetime("prepare_start_term").notNull(),
  prepareEndTerm: datetime("prepare_end_term").notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term").notNull(),
  teamId: int("team_id")
    .references(() => Team.id)
    .notNull(),
  managerId: int("manager_id")
    .references(() => User.id)
    .notNull(),
  purpose: text("purpose").notNull(),
  target: text("target").notNull(),
  detail: text("detail").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// ProjectProposalTimeline 테이블
export const ProjectProposalTimeline = mysqlTable("project_proposal_timeline", {
  id: int("id").autoincrement().primaryKey().notNull(),
  projectId: int("project_id")
    .references(() => ProjectProposal.id)
    .notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term").notNull(),
  detail: text("detail").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// OperationProposal 테이블
export const OperationProposal = mysqlTable("operation_proposal", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .references(() => Organization.id)
    .notNull(),
  semesterId: int("semester_id")
    .references(() => Semester.id)
    .notNull(),
  organizationDiagramId: int("organization_diagram_id")
    .references(() => File.id)
    .notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// OperatingCommitteeProposal 테이블
export const OperatingCommitteeProposal = mysqlTable(
  "operating_committee_proposal",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    organizationId: int("organization_id")
      .references(() => Organization.id)
      .notNull(),
    semesterId: int("semester_id")
      .references(() => Semester.id)
      .notNull(),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
);

// BudgetProposalIncome 테이블
export const BudgetProposalIncome = mysqlTable("budget_proposal_income", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .references(() => Organization.id)
    .notNull(),
  semesterId: int("semester_id")
    .references(() => Semester.id)
    .notNull(),
  revisionId: int("revision_id"), // 실제 foreign key는 아님
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// BudgetProposalIncomeRevision 테이블
export const BudgetProposalIncomeRevision = mysqlTable(
  "budget_proposal_income_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id")
      .references(() => BudgetProposalIncome.id)
      .notNull(),
    budgetDomainEnumId: int("budget_domain_enum_id").references(
      () => BudgetDomainEnum.id,
    ),
    budgetDivisionIncomeEnumId: int(
      "budget_division_income_enum_id",
    ).references(() => BudgetDivisionIncomeEnum.id),
    name: varchar("name", { length: 30 }),
    amount: int("amount"),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
    agendaId: int("agenda_id").references(() => Agenda.id),
  },
);

// BudgetProposalExpense 테이블
export const BudgetProposalExpense = mysqlTable("budget_proposal_expense", {
  id: int("id").autoincrement().primaryKey().notNull(),
  organizationId: int("organization_id")
    .references(() => Organization.id)
    .notNull(),
  semesterId: int("semester_id")
    .references(() => Semester.id)
    .notNull(),
  revisionId: int("revision_id"), // 실제 foreign key는 아님
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// BudgetProposalExpenseRevision 테이블
export const BudgetProposalExpenseRevision = mysqlTable(
  "budget_proposal_expense_revision",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    documentId: int("document_id")
      .references(() => BudgetProposalExpense.id)
      .notNull(),
    budgetDomainEnumId: int("budget_domain_enum_id").references(
      () => BudgetDomainEnum.id,
    ),
    budgetDivisionExpenseEnumId: int(
      "budget_division_expense_enum_id",
    ).references(() => BudgetDivisionExpenseEnum.id),
    projectId: int("project_id").references(() => ProjectProposal.id),
    budgetClassExpenseEnumId: int("budget_class_expense_enum_id").references(
      () => BudgetClassExpenseEnum.id,
    ),
    amount: int("amount"),
    detail: text("detail"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
    agendaId: int("agenda_id").references(() => Agenda.id),
  },
);
