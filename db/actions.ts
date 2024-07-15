"use server";

import { actionClient } from "@/lib/safe-action";
import { friendshipSchema } from "@/lib/types";

export const createFriendRequest = actionClient
  .schema(friendshipSchema)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
  });
