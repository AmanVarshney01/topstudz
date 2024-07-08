import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const session = await auth();
  return session ? (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button>Sign Out</Button>
    </form>
  ) : null;
}
