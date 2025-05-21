import {
  int,
  varchar,
  mysqlTable,
  timestamp,
  text,
  boolean,
  datetime,
} from "drizzle-orm/mysql-core";

// Petition 테이블
export const Petition = mysqlTable("Petition", {
  id: int("id").autoincrement().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  userId: int("user_id").notNull(),
  detail: text("detail").notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term"),
  petitionStatusEnumId: int("petition_status_enum_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// PetitionAgree 테이블
export const PetitionAgree = mysqlTable("PetitionAgree", {
  id: int("id").autoincrement().primaryKey().notNull(),
  petitionId: int("petition_id").notNull(),
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// PetitionAnswer 테이블
export const PetitionAnswer = mysqlTable("PetitionAnswer", {
  id: int("id").autoincrement().primaryKey().notNull(),
  petitionId: int("petition_id").notNull(),
  userId: int("user_id").notNull(),
  teamId: int("team_id").notNull(),
  posted: boolean("posted").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
