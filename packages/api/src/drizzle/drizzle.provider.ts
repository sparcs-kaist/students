import { ExtractTablesWithRelations } from "drizzle-orm";
import { MySqlTransaction } from "drizzle-orm/mysql-core";
import {
  drizzle,
  MySql2PreparedQueryHKT,
  MySql2QueryResultHKT,
} from "drizzle-orm/mysql2";

import mysql from "mysql2/promise";

import * as userSchema from "./schema/user.schema";
import { env } from "../env";

export const DrizzleAsyncProvider = "drizzleProvider";

let dbInstance = null;
let connectionInstance = null;

export const getConnection = async () => {
  if (!connectionInstance) {
    connectionInstance = await mysql.createConnection({
      uri: env.DATABASE_URL,
    });
  }
  return connectionInstance;
};

export const getDbInstance = async () => {
  if (!dbInstance) {
    const connection = await getConnection();
    dbInstance = drizzle(connection, {
      schema: {
        userSchema,
      },
      mode: "default",
    });
  }
  return dbInstance;
};

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: getDbInstance,
    exports: [DrizzleAsyncProvider],
  },
];

// transaction의 type
export type DrizzleTransaction = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;
