"use client"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { Chat } from "../_components/chat"
import { Skeleton } from "@/components/ui/skeleton"

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const router = useRouter()
  const { toast } = useToast()

  const groupId = params.groupId as Id<"groups">
  const group = useQuery(api.groups.get, { groupId })
  const members = useQuery(api.groups.getMembers, { groupId })
  const leaveGroup = useMutation(api.groups.leave)

  if (!group) {
    return (
      <section>
        <Skeleton className="mb-6 h-8 w-48" /> {/* PageTitle skeleton */}
        <div className="grid gap-4 md:grid-cols-2">
          <GroupDetailsSkeleton />
          <MembersSkeleton />
          <div className="md:col-span-2">
            <Skeleton className="h-[400px] w-full" /> {/* Chat skeleton */}
          </div>
        </div>
      </section>
    )
  }

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup({ groupId })
      toast({
        title: "Success",
        description: "Left group successfully",
      })
      router.push("/dashboard/groups")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to leave group",
        variant: "destructive",
      })
    }
  }

  return (
    <section>
      <PageTitle title={group.name} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Group Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              {group.description || "No description"}
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Created by: {group.creator?.name || "Unknown"}
            </p>
            <Button
              variant="destructive"
              className="mt-4"
              onClick={handleLeaveGroup}
            >
              Leave Group
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {members?.map((member) => (
                <div key={member._id} className="rounded-lg border p-2">
                  <p>{member.user?.name || "Unknown User"}</p>
                  <p className="text-sm text-gray-500">
                    Joined: {new Date(member.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Chat groupId={groupId} />
      </div>
    </section>
  )
}

const GroupDetailsSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Group Details</CardTitle>
    </CardHeader>
    <CardContent>
      <Skeleton className="mb-4 h-4 w-3/4" />
      <Skeleton className="mb-4 h-4 w-1/2" />
      <Skeleton className="h-9 w-28" />
    </CardContent>
  </Card>
)

const MembersSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Members</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-2">
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
