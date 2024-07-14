import PageTitle from "@/components/page-title";
import AddFriendDialog from "./_components/add-friend-dialog";
import CurrentFriends from "./_components/current-friends-card";
import FriendRequestsCard from "./_components/friend-requests-card";

export default function FriendsPage() {
  return (
    <section>
      <PageTitle title="Friends" button={<AddFriendDialog />} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CurrentFriends />
        <FriendRequestsCard />
      </div>
    </section>
  );
}
