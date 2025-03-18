import {
  int,
  varchar,
  mysqlTable,
  timestamp,
  text,
  boolean,
} from "drizzle-orm/mysql-core";

// Petition 테이블
export const Petition = mysqlTable("Petition", {
  id: int("id").autoincrement().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  user_id: int("user_id").notNull(),
  detail: text("detail").notNull(),
  startTerm: varchar("start_term", { length: 20 }).notNull(),
  endTerm: varchar("end_term", { length: 20 }),
  petitionStatusEnumId: int("petition_status_enum_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// PetitionAgree 테이블
export const PetitionAgree = mysqlTable("PetitionAgree", {
  id: int("id").autoincrement().primaryKey().notNull(),
  petition_id: int("petition_id").notNull(),
  user_id: int("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// PetitionAnswer 테이블
export const PetitionAnswer = mysqlTable("PetitionAnswer", {
  id: int("id").autoincrement().primaryKey().notNull(),
  petition_id: int("petition_id").notNull(),
  user_id: int("user_id").notNull(),
  team_id: int("team_id").notNull(),
  posted: boolean("posted").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
