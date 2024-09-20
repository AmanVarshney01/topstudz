import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card>
        <CardHeader>
          <Logo />
        </CardHeader>
        <CardContent>The page you are looking for does not exist.</CardContent>
        <CardFooter>
          <Link href={"/"} className="w-full">
            <Button className="w-full">Go Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
