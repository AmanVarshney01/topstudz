"use client"

import { Button } from "@/components/ui/button"
import { useAuthActions } from "@convex-dev/auth/react"
import Logo from "@/components/logo"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Image from "next/image"
import githubLogo from "@/public/github-mark.svg"

export default function SignInPage() {
  const { signIn } = useAuthActions()

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card>
        <CardHeader>
          <Logo />
          <CardDescription className="max-w-80">
            Compete with friends, join study groups, and track your progress to
            become a top student.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            variant="outline"
            type="button"
            onClick={() => void signIn("github", { redirectTo: "/dashboard" })}
          >
            <Image
              className="mr-2 dark:invert"
              src={githubLogo}
              alt="Github Logo"
              width={20}
              height={20}
            />
            Sign in with Github
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
