import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
} from "drizzle-orm/mysql-core";

// Semester 테이블
export const Semester = mysqlTable("semester", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  year: int("year").notNull(),
  semesterEnum: int("semester_enum").notNull(),
  startTerm: varchar("start_term", { length: 20 }).notNull(),
  endTerm: varchar("end_term", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// HalfYear 테이블
export const HalfYear = mysqlTable(
  "half_year",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    year: int("year").notNull(),
    halfYearEnum: int("half_year_enum").notNull(),
    regularSemesterId: int("regular_semester_id").notNull(),
    seasonalSemesterId: int("seasonal_semester_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    regularSemesterFk: foreignKey({
      columns: [table.regularSemesterId],
      foreignColumns: [Semester.id],
      name: "half_year_regular_semester_id_fk",
    }),
    seasonalSemesterFk: foreignKey({
      columns: [table.seasonalSemesterId],
      foreignColumns: [Semester.id],
      name: "half_year_seasonal_semester_id_fk",
    }),
  }),
);
