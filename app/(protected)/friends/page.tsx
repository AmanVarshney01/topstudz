import PageTitle from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FriendsPage() {
  return (
    <section>
      <PageTitle title="Friends" buttonText="Add Friend" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
    </section>
  );
}

function CurrentFriends() {
  return (
    <Card className=" lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Friends</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

function FriendRequestCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Friend Requests</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}


