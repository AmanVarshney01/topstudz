import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";

export default async function CurrentFriendsCard() {
  const users = await db.query.users.findFirst({});

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">My Friends</CardTitle>
      </CardHeader>
      <CardContent>{users?.email}</CardContent>
    </Card>
  );
}
