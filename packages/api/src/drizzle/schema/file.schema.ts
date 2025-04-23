import {
  mysqlTable,
  int,
  varchar,
  datetime,
  timestamp,
  serial,
  foreignKey,
} from "drizzle-orm/mysql-core";

import { User } from "./user.schema";

export const File = mysqlTable(
  "file",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    extension: varchar("extension", { length: 30 }).notNull(),
    size: int("size").notNull(),
    userId: int("user_id").notNull(),
    signedAt: datetime("signed_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    fileUserIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [User.id],
      name: "file_user_id_fk",
    }),
  }),
);
