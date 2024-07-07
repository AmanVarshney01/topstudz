import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema/auth";

export default async function Home() {
  const session =await auth()
  return (
    <main>
      {session?.user?.name}
    </main>
  );
}
