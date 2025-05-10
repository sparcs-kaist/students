import {
  int,
  varchar,
  mysqlTable,
  timestamp,
  date,
} from "drizzle-orm/mysql-core";

// Semester 테이블
export const Semester = mysqlTable("semester", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  year: int("year").notNull(),
  semesterEnum: int("semester_enum").notNull(),
  startTerm: date("start_term").notNull(),
  endTerm: date("end_term").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
