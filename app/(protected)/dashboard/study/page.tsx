"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Coffee, Save } from "lucide-react"
import { useQueryState } from "nuqs"
import PageTitle from "@/components/page-title"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useToast } from "@/hooks/use-toast"

export default function StudyPage() {
  const { toast } = useToast()

  const [studyTime, setStudyTime] = useQueryState("studyTime", {
    defaultValue: 0,
    parse: (value) => Number(value),
  })
  const [isStudying, setIsStudying] = useQueryState("isStudying", {
    defaultValue: false,
    parse: (value) => value === "true",
  })
  const [isBreak, setIsBreak] = useQueryState("isBreak", {
    defaultValue: false,
    parse: (value) => value === "true",
  })

  // Settings states
  const [studyDuration, setStudyDuration] = useQueryState("studyDuration", {
    defaultValue: 25 * 60,
    parse: (value) => Number(value),
  })
  const [breakDuration, setBreakDuration] = useQueryState("breakDuration", {
    defaultValue: 5 * 60,
    parse: (value) => Number(value),
  })

  const settings = useQuery(api.study.getSettings)
  const updateSettings = useMutation(api.study.updateSettings)
  const completeSession = useMutation(api.study.completeSession)
  const stats = useQuery(api.study.getStats)

  useEffect(() => {
    if (settings) {
      setStudyDuration(settings.studyDuration)
      setBreakDuration(settings.breakDuration)
    }
  }, [settings, setStudyDuration, setBreakDuration])

  useEffect(() => {
    if (typeof window !== "undefined") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime((prevTime) => {
          const nextTime = prevTime + 1
          const currentGoal = isBreak ? breakDuration : studyDuration

          if (nextTime >= currentGoal) {
            setIsStudying(false)
            completeSession({
              duration: nextTime,
              type: isBreak ? "break" : "study",
              completed: true,
            })

            if (isBreak) {
              setIsBreak(false)
              if (Notification.permission === "granted") {
                new Notification("Study Time!", {
                  body: "Break is over. Let's get back to studying!",
                  icon: "/favicon.ico",
                })
              }
            } else {
              setIsBreak(true)
              if (Notification.permission === "granted") {
                new Notification("Break Time!", {
                  body: "Time for a break! Take some rest.",
                  icon: "/favicon.ico",
                })
              }
            }
            return 0
          }
          return nextTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [
    isStudying,
    isBreak,
    studyDuration,
    breakDuration,
    completeSession,
    setStudyTime,
    setIsBreak,
    setIsStudying,
  ])

  const startStopStudy = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: isBreak ? "break" : "study",
        completed: false,
      })
    }
    setIsStudying(!isStudying)
  }

  const resetTimer = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: isBreak ? "break" : "study",
        completed: false,
      })
    }
    setStudyTime(0)
    setIsStudying(false)
    setIsBreak(false)
  }

  const saveSettings = async () => {
    try {
      await updateSettings({
        studyDuration,
        breakDuration,
      })
      toast({
        title: "Settings Saved",
        description: "Your study settings have been saved to your account.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      })
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  const formatHours = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const progress = isBreak
    ? (studyTime / breakDuration) * 100
    : (studyTime / studyDuration) * 100

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Study" />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl">
              {isBreak ? (
                <Coffee className="mr-3 h-8 w-8" />
              ) : (
                <Clock className="mr-3 h-8 w-8" />
              )}
              {isBreak ? "Break Time" : "Study Time"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-7xl font-bold tracking-tighter">
              {formatTime(studyTime)}
            </div>
            <Progress value={Math.min(progress, 100)} className="h-3" />
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={startStopStudy}>
                {isStudying ? "Pause" : "Start"}
              </Button>
              <Button size="lg" onClick={resetTimer} variant="outline">
                Reset Timer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Study Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="study-goal">Study Duration (minutes)</Label>
                <Input
                  id="study-goal"
                  type="number"
                  value={studyDuration / 60}
                  onChange={(e) =>
                    setStudyDuration(Math.max(1, Number(e.target.value)) * 60)
                  }
                  min={1}
                  className="text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="break-time">Break Duration (minutes)</Label>
                <Input
                  id="break-time"
                  type="number"
                  value={breakDuration / 60}
                  onChange={(e) =>
                    setBreakDuration(Math.max(1, Number(e.target.value)) * 60)
                  }
                  min={1}
                  className="text-lg"
                />
              </div>
              <Button
                className="w-full"
                onClick={saveSettings}
                variant="outline"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <p className="text-lg">
                Current Session: {formatTime(studyTime)}
              </p>
              <p className="text-lg">
                Progress: {Math.min(Math.round(progress), 100)}%
              </p>
              <p className="text-lg">Mode: {isBreak ? "Break" : "Study"}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-xl font-semibold">
                Total Study Time: {formatHours(stats?.totalStudyTime ?? 0)}
              </p>
            </div>
          </CardContent>
        </Card>

        {stats?.recentSessions && stats.recentSessions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentSessions.map((session) => (
                  <div
                    key={session._id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">
                        {session.type.charAt(0).toUpperCase() +
                          session.type.slice(1)}{" "}
                        Session
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(session.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatTime(session.duration)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.completed ? "Completed" : "Incomplete"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
