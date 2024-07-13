import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FriendsPage() {
  return (
    <section>
      <PageTitle title="Friends" button={<AddFriendDialog />} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestCard />
      </div>
    </section>
  );
}

function CurrentFriends() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">My Friends</CardTitle>
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

function AddFriendDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Friend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
        </DialogHeader>
        <p>Search for a friend to add</p>
      </DialogContent>
    </Dialog>
  );
}
