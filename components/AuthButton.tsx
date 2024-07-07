import { auth, signIn, signOut } from "@/auth";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const session = await auth();
  return session ? (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>Sign Out</Button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button>Sign In</Button>
    </form>
  );
}
