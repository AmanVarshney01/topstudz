import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import githubLogo from "@/public/github-mark.svg";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>TopStudz</CardTitle>
          <CardDescription>
            Elevate your study game with TopStudz.
          </CardDescription>
        </CardHeader>
        <CardContent>Sign in to continue.</CardContent>
        <CardFooter>
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <Button className="w-full" type="submit">
              <Image
                className="mr-2 invert dark:invert-0"
                src={githubLogo}
                alt="Github Logo"
                width={20}
                height={20}
              />
              Sign in with Github
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
