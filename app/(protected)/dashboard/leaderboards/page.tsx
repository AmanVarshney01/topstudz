"use client"
import PageTitle from "@/components/page-title"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { formatDuration } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useQuery } from "convex/react"
import { User, Trophy, Users } from "lucide-react"
import { ReactNode } from "react"

interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  email?: string
  avatar?: string
  totalStudyTime: number
}

interface LeaderboardCardProps {
  title: string
  description: string
  icon: ReactNode
  data: LeaderboardEntry[]
}

export default function LeaderboardsPage() {
  const globalLeaderboard = useQuery(api.leaderboards.getStudyTimeLeaderboard)
  const userRanking = useQuery(api.leaderboards.getUserRanking)
  const myGroups = useQuery(api.groups.listMyGroups)

  const activeGroupId = myGroups?.[0]?._id
  const groupLeaderboard = useQuery(
    api.leaderboards.getGroupLeaderboard,
    activeGroupId ? { groupId: activeGroupId } : "skip",
  )

  if (!globalLeaderboard || !userRanking || !myGroups) {
    return <div>Loading...</div>
  }

  if (globalLeaderboard.length === 0) {
    return (
      <section className="space-y-6">
        <PageTitle title="Leaderboards" />
        <Card>
          <CardContent className="p-6">
            <p>
              No study data available yet. Complete some study sessions to see
              the leaderboard!
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageTitle title="Leaderboards" />

      {/* Personal Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Your Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Global Rank</p>
              <p className="text-2xl font-bold">
                {userRanking.rank ? `#${userRanking.rank}` : "Not Ranked"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Study Time</p>
              <p className="text-2xl font-bold">
                {formatDuration(userRanking.totalStudyTime || 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Leaderboard */}
      <LeaderboardCard
        title="Global Top Students"
        description="Students with the most study time"
        icon={<Trophy className="mr-2 h-5 w-5" />}
        data={globalLeaderboard}
      />

      {/* Group Leaderboard */}
      {activeGroupId && groupLeaderboard && groupLeaderboard.length > 0 && (
        <LeaderboardCard
          title={`${myGroups[0].name} Leaderboard`}
          description="Top performers in your study group"
          icon={<Users className="mr-2 h-5 w-5" />}
          data={groupLeaderboard}
        />
      )}
    </section>
  )
}

// Helper component for rendering leaderboard tables
function LeaderboardCard({
  title,
  description,
  icon,
  data,
}: LeaderboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Student</TableHead>
              <TableHead className="text-right">Study Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((leader) => (
              <TableRow key={leader.userId}>
                <TableCell className="font-medium">#{leader.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={leader.avatar} alt={leader.name} />
                      <AvatarFallback>{leader.name[0]}</AvatarFallback>
                    </Avatar>
                    {leader.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {formatDuration(leader.totalStudyTime)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
