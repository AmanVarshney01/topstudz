import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function GoToActionButton() {
  const session = await auth();
  return session ? (
    <Link href="/dashboard">
      <Button size={"sm"}>Dashboard</Button>
    </Link>
  ) : (
    <Link href={"/login"}>
      <Button size={"sm"}>Get Started</Button>
    </Link>
  );
}
