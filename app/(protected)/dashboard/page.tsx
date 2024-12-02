"use client"
import PageTitle from "@/components/page-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { formatTime } from "@/lib/utils"
import { useQuery } from "convex/react"
import { BookOpen, Calendar, Clock, Target } from "lucide-react"
import { StudentProgressChart } from "./_components/student-progress-chart"
import StudyDurationChart from "./_components/study-duration-progress-chart"
import StudySessionDistribution from "./_components/study-session-distribution-chart"
import { StudySessionsChart } from "./_components/study-sessions-chart"
import OnboardingDialogTrigger from "@/components/onboarding-dialog-trigger"
import { Progress } from "@/components/ui/progress"

function StatsCard({
  title,
  value,
  description,
  icon,
  progress,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  progress?: number
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <Progress
            value={progress}
            className="mt-2"
            style={{
              background:
                progress < 30
                  ? "var(--red-100)"
                  : progress < 70
                    ? "var(--yellow-100)"
                    : "var(--green-100)",
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const stats = useQuery(api.study.getFullStats)
  const settings = useQuery(api.study.getSettings)
  const userRank = useQuery(api.leaderboards.getUserRanking)

  if (!stats || !settings || !userRank) {
    return <LoadingSkeleton />
  }

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const todaysSessions = stats.recentSessions.filter(
    (session) => new Date(session.startTime) >= startOfDay && session.completed,
  )

  const todaysStudyTime = todaysSessions.reduce(
    (acc, session) => acc + session.duration,
    0,
  )

  const dailyProgressPercentage = Math.min(
    100,
    (todaysStudyTime / stats.dailyGoal) * 100,
  )

  const statsCards = [
    {
      title: "Total Study Hours",
      value: formatTime(stats.totalStudyTime),
      description: `Rank #${userRank.rank || "N/A"} on the leaderboard`,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Daily Goal Progress",
      value: `${Math.round(dailyProgressPercentage)}%`,
      description: `${formatTime(todaysStudyTime)} / ${formatTime(stats.dailyGoal)}`,
      icon: <Target className="h-4 w-4 text-muted-foreground" />,
      progress: dailyProgressPercentage,
    },
    {
      title: "Completed Sessions",
      value: stats.stats.completedSessions.toString(),
      description: "Recent study sessions completed",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Session Duration",
      value: formatTime(settings.studyDuration),
      description: "Current timer setting",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <>
      <div>
        <PageTitle title="Dashboard" />
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <StudySessionDistribution recentSessions={stats.recentSessions} />
          <StudyDurationChart recentSessions={stats.recentSessions} />
          {/* <StudySessionsChart recentSessions={stats.recentSessions} /> */}
          {/* <CompletionRateChart /> */}
          {/* <StudentProgressChart recentSessions={stats.recentSessions} /> */}
        </div>
      </div>
      <OnboardingDialogTrigger />
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-4 h-8 w-[200px]" />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
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

      <div className="grid gap-4 lg:grid-cols-2">
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
