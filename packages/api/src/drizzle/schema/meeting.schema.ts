import {
  int,
  varchar,
  mysqlTable,
  timestamp,
  text,
  foreignKey,
  datetime,
} from "drizzle-orm/mysql-core";

// Meeting 테이블
export const Meeting = mysqlTable("meeting", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 30 }).notNull(),
  detail: text("detail"),
  startTerm: datetime("start_term"),
  endTerm: datetime("end_term"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// Agenda 테이블
export const Agenda = mysqlTable(
  "agenda",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    meetingId: int("meeting_id").notNull(),
    name: varchar("name", { length: 30 }).notNull(),
    detail: text("detail"),
    agendaStatusEnum: int("agenda_status_enum").notNull(),
    submittedAt: datetime("submitted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
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
