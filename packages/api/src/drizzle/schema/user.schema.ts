import {
  int,
  varchar,
  timestamp,
  mysqlTable,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { InferSelectModel } from "drizzle-orm";

export const User = mysqlTable("user", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export type UserT = InferSelectModel<typeof User>;

export const UserStudent = mysqlTable(
  "user_student",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    userId: int("user_id").notNull(),
    studentNumber: varchar("student_number", { length: 20 }),
  },
  table => ({
    userForeignKey: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
    }),
  }),
);

export type UserStudentT = InferSelectModel<typeof UserStudent>;
