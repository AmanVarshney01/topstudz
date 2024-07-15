import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserFriends } from "@/db/queries";

export default async function CurrentFriendsCard() {
  const users = await getUserFriends(1);
  console.log(users);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">My Friends</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
