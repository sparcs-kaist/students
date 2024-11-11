import {
  int,
  varchar,
  datetime,
  timestamp,
  mysqlTable,
} from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user.schema";

function createUuid(): string {
  return uuidv4();
}

export const File = mysqlTable("file", {
  id: int("id").autoincrement().primaryKey().notNull(),
  uuid: varchar("uuid", { length: 128 })
    .$defaultFn(() => createUuid())
    .unique(),
  name: varchar("name", { length: 255 }).notNull(),
  extension: varchar("extension", { length: 255 }).notNull(),
  size: int("size").notNull(),
  userId: int("user_id")
    .references(() => User.id)
    .notNull(),
  signedAt: datetime("signed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});
