"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Save } from "lucide-react"
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
  const [studyDuration, setStudyDuration] = useQueryState("studyDuration", {
    defaultValue: 25 * 60,
    parse: (value) => Number(value),
  })

  const settings = useQuery(api.study.getSettings)
  const updateSettings = useMutation(api.study.updateSettings)
  const completeSession = useMutation(api.study.completeSession)
  const stats = useQuery(api.study.getStats)

  useEffect(() => {
    if (settings) {
      setStudyDuration(settings.studyDuration)
    }
  }, [settings, setStudyDuration])

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
          if (nextTime >= studyDuration) {
            setIsStudying(false)
            completeSession({
              duration: nextTime,
              type: "study",
              completed: true,
            })
            toast({
              title: "Study Session Complete!",
              description: "Great job! Take a break if you need one.",
            })
            if (Notification.permission === "granted") {
              new Notification("Study Session Complete!", {
                body: "Great job! Take a break if you need one.",
                icon: "/favicon.ico",
              })
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
    studyDuration,
    completeSession,
    setStudyTime,
    setIsStudying,
    toast,
  ])

  const startStopStudy = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: "study",
        completed: false,
      })
      toast({
        title: "Session Paused",
        description: `Study session paused at ${formatTime(studyTime)}.`,
      })
    } else {
      toast({
        title: "Session Started",
        description: "Study session started.",
      })
    }
    setIsStudying(!isStudying)
  }

  const resetTimer = () => {
    if (isStudying) {
      completeSession({
        duration: studyTime,
        type: "study",
        completed: false,
      })
    }
    setStudyTime(0)
    setIsStudying(false)
    toast({
      title: "Timer Reset",
      description: "Timer has been reset to 0.",
    })
  }

  const saveSettings = async () => {
    try {
      await updateSettings({
        studyDuration,
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

  const handleStudyDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDuration = Math.max(1, Number(e.target.value)) * 60
    setStudyDuration(newDuration)
    toast({
      title: "Study Duration Updated",
      description: `Study duration set to ${e.target.value} minutes.`,
    })
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const formatHours = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const progress = (studyTime / studyDuration) * 100

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Study" />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl">
              <Clock className="mr-3 h-8 w-8" />
              Study Time
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
                  onChange={handleStudyDurationChange}
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
                      <p className="font-medium">Study Session</p>
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
