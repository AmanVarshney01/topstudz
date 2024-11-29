"use client"
import PageTitle from "@/components/page-title"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { formatDuration } from "@/lib/utils"
import { useQuery } from "convex/react"
import { Clock, Crown, Medal, Trophy, User, Users } from "lucide-react"
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

function PersonalStatsCard({ userRanking }: { userRanking: any }) {
  const stats = [
    {
      label: "Global Rank",
      value: userRanking.rank ? `#${userRanking.rank}` : "Not Ranked",
      icon: <Trophy className="h-4 w-4 text-yellow-500" />,
    },
    {
      label: "Total Study Time",
      value: formatDuration(userRanking.totalStudyTime || 0),
      icon: <Clock className="h-4 w-4 text-blue-500" />,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Your Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <div className="rounded-full bg-background p-2">{stat.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LeaderboardCard({
  title,
  description,
  icon,
  data,
}: LeaderboardCardProps) {
  const getRankBadge = (rank: number) => {
    const badges = {
      1: { icon: <Crown className="h-4 w-4" />, color: "bg-yellow-500" },
      2: { icon: <Medal className="h-4 w-4" />, color: "bg-gray-400" },
      3: { icon: <Medal className="h-4 w-4" />, color: "bg-amber-600" },
    }
    return badges[rank as keyof typeof badges]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
              {data.map((leader) => (
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
      </CardContent>
    </Card>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6 py-6">
      <Skeleton className="h-8 w-[200px]" />
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-[100px]" />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function LeaderboardsPage() {
  const globalLeaderboard = useQuery(api.leaderboards.getStudyTimeLeaderboard)
  const userRanking = useQuery(api.leaderboards.getUserRanking)
  const myGroups = useQuery(api.groups.listMyGroups)

  if (!globalLeaderboard || !userRanking || !myGroups) {
    return <LoadingState />
  }

  if (globalLeaderboard.length === 0) {
    return (
      <div>
        <PageTitle title="Leaderboards" />
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Trophy className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Data Available</h3>
            <p className="text-muted-foreground">
              Complete some study sessions to see the leaderboard!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <PageTitle title="Leaderboards" />
        <p className="text-muted-foreground">
          Track your ranking and compete with other students
        </p>
      </div>
      <div className="space-y-8">
        <PersonalStatsCard userRanking={userRanking} />
        <LeaderboardCard
          title="Global Rankings"
          description="Top students across all groups"
          icon={<Trophy className="h-5 w-5 text-yellow-500" />}
          data={globalLeaderboard}
        />
      </div>
    </div>
  )
}
