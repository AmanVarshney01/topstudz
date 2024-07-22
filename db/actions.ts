"use server";

import { actionClient } from "@/lib/safe-action";
import { createFriendRequestSchema } from "@/lib/types";

export const createFriendRequest = actionClient
  .schema(createFriendRequestSchema)
  .action(async ({ parsedInput: { email }, ctx: { userId } }) => {
    return email;
  });
