import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default async function ErrorPage(props: {
  searchParams: Promise<{ error: string }>
}) {
  const searchParams = await props.searchParams
  const error = searchParams.error

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>😓 Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>{error}</CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full">Go Back</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
