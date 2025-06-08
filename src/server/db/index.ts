import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

// Disable prefetch as it is not supported for "Transaction" pool mode
const connection =
  globalForDb.conn ??
  postgres(env.DATABASE_URL, {
    prepare: false,
  });
if (env.NODE_ENV !== "production") globalForDb.conn = connection;

export const db = drizzle(connection);
