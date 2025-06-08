import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schemas/*",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schemaFilter: ["user_auth", "app"],
  introspect: {
    casing: "preserve",
  },
  casing: "snake_case",
  strict: true,
  verbose: true,
} satisfies Config;
