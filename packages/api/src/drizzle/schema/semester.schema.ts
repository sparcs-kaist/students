import {
  int,
  varchar,
  datetime,
  timestamp,
  mysqlTable,
} from "drizzle-orm/mysql-core";

export const Semester = mysqlTable("semester", {
  id: int("id").autoincrement().primaryKey().notNull(),
  startTerm: datetime("start_term").notNull(),
  endTerm: datetime("end_term").notNull(),
  name: varchar("name", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
