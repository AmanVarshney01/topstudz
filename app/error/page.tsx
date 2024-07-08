import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const error = searchParams.error;

  return (
    <div className="flex min-h-svh items-center justify-center">
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
  );
}
