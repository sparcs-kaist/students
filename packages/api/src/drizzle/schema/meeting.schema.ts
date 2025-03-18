import {
  int,
  varchar,
  mysqlTable,
  timestamp,
  text,
  boolean,
  foreignKey,
} from "drizzle-orm/mysql-core";

// Meeting 테이블
export const Meeting = mysqlTable("meeting", {
  id: int("id").autoincrement().primaryKey().notNull(),
  start_term: varchar("start_term", { length: 20 }).notNull(),
  end_term: varchar("end_term", { length: 20 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deleted_at: timestamp("deleted_at"),
  name: varchar("name", { length: 30 }).notNull(),
  detail: text("detail"),
});

// Agenda 테이블
export const Agenda = mysqlTable(
  "agenda",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    meeting_id: int("meeting_id").notNull(),
    accepted: boolean("accepted"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    submitted_at: timestamp("submitted_at"),
    posted_at: timestamp("posted_at"),
    updated_at: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deleted_at: timestamp("deleted_at"),
  },
  table => ({
    meetingFk: foreignKey({
      columns: [table.meeting_id],
      foreignColumns: [Meeting.id],
      name: "agenda_meeting_id_fk",
    }),
  }),
);
