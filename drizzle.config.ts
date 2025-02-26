import { defineConfig } from "drizzle-kit";
import "dotenv";

export default defineConfig({
  out: "./server/migrations",
  schema: "./server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
