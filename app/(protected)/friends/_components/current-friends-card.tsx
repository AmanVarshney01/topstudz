import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CurrentFriendsCard() {
  // const friends = await getUserFriends()

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">My Friends</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
