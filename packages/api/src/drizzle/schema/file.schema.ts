import {
  mysqlTable,
  int,
  varchar,
  datetime,
  timestamp,
  serial,
} from "drizzle-orm/mysql-core";

import { User } from "./user.schema";

export const File = mysqlTable("File", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  extension: varchar("extension", { length: 30 }).notNull(),
  size: int("size").notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => User.id),
  signedAt: datetime("signed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
