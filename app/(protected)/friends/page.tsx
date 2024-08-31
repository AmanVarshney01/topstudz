import PageTitle from "@/components/page-title";
import AddFriendDialog from "./_components/add-friend-dialog";
import CurrentFriends from "./_components/current-friends-card";
import FriendRequestsCard from "./_components/friend-requests-card";


const friends = [
  { name: 'Alex Johnson', avatar: '/placeholder.svg?height=40&width=40', status: 'Studying Math' },
  { name: 'Sam Lee', avatar: '/placeholder.svg?height=40&width=40', status: 'Online' },
  { name: 'Taylor Swift', avatar: '/placeholder.svg?height=40&width=40', status: 'Offline' },
  { name: 'Jordan Peterson', avatar: '/placeholder.svg?height=40&width=40', status: 'In a study group' },
]
export default function FriendsPage() {
  return (
    <section>
      <PageTitle title="Friends" button={<AddFriendDialog />} />
      <div className="grid gap-4 md:grid-cols-2">
        <CurrentFriends />
        <FriendRequestsCard />
      </div>
    </section>
  );
}
