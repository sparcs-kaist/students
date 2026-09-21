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
  uid: varchar("uid", { length: 30 }).unique(),
  sid: varchar("sid", { length: 30 }).unique(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const Department = mysqlTable("department", {
  id: int("id").primaryKey().notNull(),
  name: varchar("name", { length: 60 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
});

// Student 테이블
export const Student = mysqlTable(
  "student",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    studentNumber: int("student_number").unique(),
    userId: int("user_id").notNull(),
    // 학과 정보가 없는 가입 신청자나 mock 사용자를 허용하기 위해 departmentId를 nullable로 변경
    departmentId: int("department_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "student_user_id_fk",
    }),
    departmentFk: foreignKey({
      columns: [table.departmentId],
      foreignColumns: [Department.id],
      name: "student_department_id_fk",
    }),
  }),
);
