"use client"
import PageTitle from "@/components/page-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Crown, Medal, MessageSquare, Trophy } from "lucide-react"
import { Chat } from "../_components/chat"
import { GroupActionsSheet } from "../_components/group-actions-sheet"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  TableHeader,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Id } from "@/convex/_generated/dataModel"
import { formatDuration } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const groupId = params.groupId as Id<"groups">
  const group = useQuery(api.groups.get, { groupId })
  const members = useQuery(api.groups.getMembers, { groupId })
  const user = useQuery(api.users.viewer)

  if (!group || !user) {
    return <LoadingState />
  }

  const isCreator = group.createdBy === user._id

  return (
    <div className="grid grid-rows-[auto_1fr]">
      <div className="flex items-center justify-between">
        <PageTitle title={group.name} />
        <GroupActionsSheet
          group={{
            _id: group._id,
            name: group.name,
            description: group.description,
            creator: group.creator
              ? {
                  name: group.creator.name,
                }
              : undefined,
          }}
          members={
            members?.map((member) => ({
              _id: member._id,
              user: member.user
                ? {
                    _id: member.user._id,
                    name: member.user.name,
                    image: member.user.image,
                  }
                : null,
              joinedAt: member.joinedAt,
              role: member.role,
            })) || []
          }
          isCreator={isCreator}
        />
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="space-y-4">
          <Chat groupId={groupId} />
        </TabsContent>
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Group Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GroupLeaderboard groupId={groupId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GroupLeaderboard({ groupId }: { groupId: Id<"groups"> }) {
  const leaderboard = useQuery(api.leaderboards.getGroupLeaderboard, {
    groupId,
  })

  const getRankBadge = (rank: number) => {
    const badges = {
      1: { icon: <Crown className="h-4 w-4" />, color: "bg-yellow-500" },
      2: { icon: <Medal className="h-4 w-4" />, color: "bg-gray-400" },
      3: { icon: <Medal className="h-4 w-4" />, color: "bg-amber-600" },
    }
    return badges[rank as keyof typeof badges]
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="flex flex-col items-center p-6 text-center">
        <Trophy className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No Data Available</h3>
        <p className="text-muted-foreground">
          Complete some study sessions to see the leaderboard!
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="text-right">Study Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((leader) => (
            <TableRow key={leader.userId}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getRankBadge(leader.rank) ? (
                    <div
                      className={`rounded-full p-1 ${
                        getRankBadge(leader.rank)?.color
                      }`}
                    >
                      {getRankBadge(leader.rank)?.icon}
                    </div>
                  ) : (
                    <span className="font-medium">#{leader.rank}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={leader.avatar} alt={leader.name} />
                    <AvatarFallback>{leader.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{leader.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatDuration(leader.totalStudyTime)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-4 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <div className="flex max-w-80 flex-row overflow-x-scroll md:max-w-full md:overflow-auto">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="ml-1 h-10 w-24 rounded-md" />
          </div>
        </TabsList>
        <TabsContent value="chat" className="space-y-4">
          <Card className="flex h-[calc(100svh-170px)] flex-col">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-[200px] rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
