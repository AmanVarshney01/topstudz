import { SignIn } from "@/components/sign-in";
import { db } from "@/db";
import { users } from "@/db/schema/auth";

export default async function Home() {
  const result = await db.select().from(users).all();
  return (
    <main>
      <SignIn />
      <h1>Users</h1>
      <ul>
        {result.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </main>
  );
}
