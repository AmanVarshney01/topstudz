"use client"

import PageTitle from "@/components/page-title"
import { StudentProgressChart } from "./_components/student-progress-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, Clock } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { formatTime } from "@/lib/utils" // You'll need to create this utility
import { Skeleton } from "@/components/ui/skeleton"
import { StudySessionsChart } from "./_components/study-sessions-chart"

export default function DashboardPage() {
  const stats = useQuery(api.study.getStats)
  const settings = useQuery(api.study.getSettings)
  const userRank = useQuery(api.leaderboards.getUserRanking)

  if (!stats || !settings || !userRank) {
    return <LoadingSkeleton />
  }

  const totalHours = Math.floor(stats.totalStudyTime / 3600)
  const completedSessions = stats.recentSessions.filter(
    (session) => session.completed,
  ).length

  return (
    <section>
      <PageTitle title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Study Hours
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(stats.totalStudyTime)}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Rank #{userRank.rank || "N/A"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Sessions
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSessions}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Recent study sessions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Session Duration
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(settings.studyDuration)}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current timer setting
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StudySessionsChart sessions={stats.recentSessions} />
        <StudentProgressChart />
      </div>
    </section>
  )
}

function LoadingSkeleton() {
  return (
    <section>
      <PageTitle title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </section>
  )
}
