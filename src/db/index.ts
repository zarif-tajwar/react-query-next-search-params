import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
// import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database("src/db/sqlite.db");
export const db = drizzle(sqlite);
