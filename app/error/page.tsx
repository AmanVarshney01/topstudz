"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const search = useSearchParams();
  const error = search.get("error");

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
