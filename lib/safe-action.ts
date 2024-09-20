import { auth } from "@/auth"
import { createSafeActionClient } from "next-safe-action"

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    if (e instanceof ActionError) {
      return e.message
    }
  },
}).use(async ({ next }) => {
  const session = await auth()

  if (!session) {
    throw new Error("No session found")
  }

  if (!session.user?.id) {
    throw new Error("No user found in session")
  }

  return next({
    ctx: {
      userId: session.user?.id,
    },
  })
})
