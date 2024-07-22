import { auth } from "@/auth";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient().use(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new Error("No session found");
  }

  return next({
    ctx: {
      userId: session.user?.id,
    },
  });
});
