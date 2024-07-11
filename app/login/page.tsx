import { auth, signIn } from "@/auth";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
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
          <Logo />
          <CardDescription className="max-w-80">
            Compete with friends, join study groups, and track your progress to
            become a top student.
          </CardDescription>
        </CardHeader>
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
