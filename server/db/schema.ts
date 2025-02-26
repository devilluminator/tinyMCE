import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  uuid: text().notNull(),
  content: text().notNull(),
  datetime: text().notNull().unique(),
});
