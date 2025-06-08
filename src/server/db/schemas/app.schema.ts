import {
  index,
  pgSchema,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const appSchema = pgSchema("app");

export const users = appSchema.table(
  "users",
  {
    id: text("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    fullName: varchar("full_name", { length: 255 }),
    avatarUrl: text("avatar_url"),
    status: varchar("status", { length: 50 }).notNull().default("active"),
    lastLoginAt: timestamp("last_login_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("email_idx").on(t.email)],
);

export const posts = appSchema.table(
  "posts",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("name_idx").on(t.name)],
);
