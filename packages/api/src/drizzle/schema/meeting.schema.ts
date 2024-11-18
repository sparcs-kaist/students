import {
  int,
  varchar,
  text,
  date,
  timestamp,
  boolean,
  mysqlTable,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const Meeting = mysqlTable("meeting", {
  id: int("id").autoincrement().primaryKey().notNull(),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
  name: varchar("name", { length: 30 }).notNull(),
  detail: text("detail"),
});

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
    meetingIdFk: foreignKey({
      columns: [table.meetingId],
      foreignColumns: [Meeting.id],
    }),
  }),
);
