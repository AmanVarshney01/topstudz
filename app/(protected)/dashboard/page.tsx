"use client"
import PageTitle from "@/components/page-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { formatTime } from "@/lib/utils"
import { useQuery } from "convex/react"
import { ArrowUp, BookOpen, Calendar, Clock } from "lucide-react"
import { StudentProgressChart } from "./_components/student-progress-chart"
import { StudySessionsChart } from "./_components/study-sessions-chart"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: string
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
            <span className="flex items-center text-xs text-green-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              {trend}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const stats = useQuery(api.study.getStats)
  const settings = useQuery(api.study.getSettings)
  const userRank = useQuery(api.leaderboards.getUserRanking)

  if (!stats || !settings || !userRank) {
    return <LoadingSkeleton />
  }

  const completedSessions = stats.recentSessions.filter(
    (session) => session.completed,
  ).length

  const statsCards = [
    {
      title: "Total Study Hours",
      value: formatTime(stats.totalStudyTime),
      description: `Rank #${userRank.rank || "N/A"} on the leaderboard`,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completed Sessions",
      value: completedSessions.toString(),
      description: "Recent study sessions completed",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      trend: "+12% this week",
    },
    {
      title: "Session Duration",
      value: formatTime(settings.studyDuration),
      description: "Current timer setting",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div>
      <PageTitle title="Dashboard" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <StudySessionsChart sessions={stats.recentSessions} />
        <StudentProgressChart />
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-8 w-[200px]" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[150px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="mt-2 h-4 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px]" />
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
    </div>
  )
}
