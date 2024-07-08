import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function DashboardButton() {
  const session = await auth();
  return session ? (
    <Link href="/dashboard">
      <Button>Dashboard</Button>
    </Link>
  ) : (
    <Link href={"/login"}>
      <Button>Sign In</Button>
    </Link>
  );
}
