import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, getUserFriendRequests } from "@/db/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default async function FriendRequestsCard() {
  const user = await getCurrentUser();

  const friendRequests = await getUserFriendRequests(user.id!);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Friend Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {friendRequests.length === 0 ? (
          <div className="text-center text-gray-500">No friend requests</div>
        ) : (
          <ul>
            {friendRequests.map((request) => (
              <li
                key={request.id}
                className="flex items-center justify-between"
              >
                x
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={request.requester.image!} />
                    <AvatarFallback>
                      {request.requester.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{request.requester.name}</span>
                </div>
                <div>
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                  <Button size="sm">Accept</Button>
                </div>
              </li>
            ))}
            {friendRequests.map((request) => (
              <li
                key={request.id}
                className="flex items-center justify-between"
              >
                x
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={request.requester.image!} />
                    <AvatarFallback>
                      {request.requester.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{request.requester.name}</span>
                </div>
                <div>
                  <Button size="sm" variant="destructive">
                    Reject
                  </Button>
                  <Button size="sm">Accept</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
