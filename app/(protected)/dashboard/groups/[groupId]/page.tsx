"use client"
import PageTitle from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQuery } from "convex/react"
import { Info, LogOut, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Chat } from "../_components/chat"

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const groupId = params.groupId as Id<"groups">

  const group = useQuery(api.groups.get, { groupId })
  const members = useQuery(api.groups.getMembers, { groupId })
  const leaveGroup = useMutation(api.groups.leave)

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

  if (!group) {
    return <LoadingState />
  }

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <PageTitle title={group.name} />
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLeaveGroup}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Leave Group
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Group Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Description
                </h3>
                <p className="mt-1">
                  {group.description || "No description provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Created by
                </h3>
                <p className="mt-1">{group.creator?.name || "Unknown"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Members ({members?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {members?.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                  >
                    <div>
                      <p className="font-medium">
                        {member.user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Chat groupId={groupId} />
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-8 w-48" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <GroupDetailsSkeleton />
          <MembersSkeleton />
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

const GroupDetailsSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Group Details</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div>
        <Skeleton className="mb-2 h-4 w-24" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardContent>
  </Card>
)

const MembersSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Members</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-3">
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)
