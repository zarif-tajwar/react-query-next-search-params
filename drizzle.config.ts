import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./src/db/sqlite.db",
  },
} satisfies Config;
