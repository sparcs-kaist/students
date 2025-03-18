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
  startTerm: varchar("start_term", { length: 20 }).notNull(),
  endTerm: varchar("end_term", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
  name: varchar("name", { length: 30 }).notNull(),
  detail: text("detail"),
});

// Agenda 테이블
export const Agenda = mysqlTable(
  "agenda",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    meetingId: int("meeting_id").notNull(),
    accepted: boolean("accepted"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    submittedAt: timestamp("submitted_at"),
    postedAt: timestamp("posted_at"),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    meetingFk: foreignKey({
      columns: [table.meetingId],
      foreignColumns: [Meeting.id],
      name: "agenda_meeting_id_fk",
    }),
  }),
);
