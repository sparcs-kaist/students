import {
  int,
  varchar,
  mysqlTable,
  foreignKey,
  timestamp,
} from "drizzle-orm/mysql-core";

// User 테이블
export const User = mysqlTable("user", {
  id: int("id").autoincrement().primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

// Student 테이블
export const Student = mysqlTable(
  "student",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    studentNumber: varchar("student_number", { length: 20 }).notNull(),
    userId: int("user_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "student_user_id_fk",
    }),
  }),
);
