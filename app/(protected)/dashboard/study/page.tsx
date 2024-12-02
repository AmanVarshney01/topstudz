"use client"
import PageTitle from "@/components/page-title"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useQueryState } from "nuqs"
import { useEffect } from "react"
import { toast } from "sonner"
import RecentSessions from "./_components/recent-sessions"
import StudySettings from "./_components/study-settings"
import StudyStats from "./_components/study-stats"
import StudyTimer from "./_components/study-timer"
import NotificationPermission from "./_components/notification-permission"
import { formatTimeTimer } from "@/lib/utils"

export default function StudyPage() {
  const [studyTime, setStudyTime] = useQueryState("studyTime", {
    defaultValue: 0,
    parse: (value) => Number(value),
  })
  const [isStudying, setIsStudying] = useQueryState("isStudying", {
    defaultValue: false,
    parse: (value) => value === "true",
  })
  const [studyDuration, setStudyDuration] = useQueryState("studyDuration", {
    defaultValue: 25 * 60,
    parse: (value) => Number(value),
  })
  const [dailyGoal, setDailyGoal] = useQueryState("dailyGoal", {
    defaultValue: 120 * 60,
    parse: (value) => Number(value),
  })
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "stats",
    parse: (value) => value as "stats" | "settings" | "history",
  })

  const updateSettings = useMutation(api.study.updateSettings)
  const completeSession = useMutation(api.study.completeSession)
  const stats = useQuery(api.study.getStats)

  const showNotification = (title: string, body: string) => {
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "study-notification",
      })
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime((prevTime) => {
          const nextTime = prevTime + 1
          if (nextTime >= studyDuration) {
            handleSessionComplete(nextTime)
            return 0
          }
          return nextTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isStudying, studyDuration])

  const handleSessionComplete = (time: number) => {
    setIsStudying(false)
    completeSession({
      duration: time,
      type: "study",
      completed: true,
    })

    showNotification(
      "Study Session Complete! 🎉",
      `Great job! You studied for ${formatTimeTimer(time)}`,
    )

    toast.success("Great job! Take a break if you need one.")
  }

  const handleDailyGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = Math.max(1, Number(e.target.value)) * 60
    setDailyGoal(newGoal)
    toast.success(`Daily goal set to ${e.target.value} minutes.`)
  }

  const handleStartStop = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: "study",
        completed: false,
      })
      toast.success(`Study session paused at ${formatTimeTimer(studyTime)}.`)
    } else {
      toast.success("Study session started.")
    }
    setIsStudying(!isStudying)
  }

  const handleReset = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: "study",
        completed: false,
      })
    }
    setStudyTime(0)
    setIsStudying(false)
    toast.success("Timer has been reset to 0.")
  }

  const handleSaveSettings = async () => {
    try {
      await updateSettings({
        studyDuration,
        dailyGoal,
      })
      toast.success("Your study settings have been saved to your account.")
    } catch (error) {
      toast.error("Failed to save settings.")
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = Math.max(1, Number(e.target.value)) * 60
    setStudyDuration(newDuration)
    toast.success(`Study duration set to ${e.target.value} minutes.`)
  }

  const progress = (studyTime / studyDuration) * 100

  return (
    <div className="">
      <PageTitle title="Study Dashboard" />
      <NotificationPermission />
      <div className="grid gap-6">
        <StudyTimer
          studyTime={studyTime}
          studyDuration={studyDuration}
          isStudying={isStudying}
          onStartStop={handleStartStop}
          onReset={handleReset}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6">
            <StudyStats
              studyTime={studyTime}
              progress={progress}
              totalStudyTime={stats?.totalStudyTime ?? 0}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <StudySettings
              studyDuration={studyDuration}
              dailyGoal={dailyGoal}
              onDurationChange={handleDurationChange}
              onDailyGoalChange={handleDailyGoalChange}
              onSave={handleSaveSettings}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {stats?.recentSessions && stats.recentSessions.length > 0 ? (
              <RecentSessions sessions={stats.recentSessions} />
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No study sessions recorded yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
