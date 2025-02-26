"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { db } from "../db";
import { usersTable } from "@/server/db/schema";

// This schema is used to validate input from client.
const schema = z.object({
  uuid: z.string().min(6),
  content: z.string().min(1),
  datetime: z.string().min(8).max(100),
});

export const writeToDB = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { content, datetime, uuid } }) => {
    if (content && datetime && uuid) {
      console.log(content, datetime, uuid);
      db.insert(usersTable)
        .values({
          uuid,
          content,
          datetime,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
      return {
        success: true,
      };
    }

    return { success: false };
  });

// Get all content data
export const getAllData = actionClient.action(async () => {
  const data = await db.select().from(usersTable);
  return data;
});
